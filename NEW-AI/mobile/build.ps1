# Builds the Play Store bundle for NEW AI.
#
# Run:  powershell -ExecutionPolicy Bypass -File mobile\build.ps1
#
# First run downloads JDK 17, the Android SDK (build-tools + platform 34) and
# Gradle into %LOCALAPPDATA%\newai\android. Later runs reuse them and only the
# APK/AAB is rebuilt.

param(
  [switch]$SkipToolchain
)

$ErrorActionPreference = 'Stop'
# Native tools (java, keytool, sdkmanager, gradle) write progress to stderr.
# With Stop, PowerShell turns that into a terminating error, so critical steps
# below are verified explicitly instead of relying on the preference.
$PSNativeCommandUseErrorActionPreference = $false
$here   = Split-Path -Parent $MyInvocation.MyCommand.Path
$base   = Join-Path $env:LOCALAPPDATA 'newai\android'
$jdkDir = Join-Path $base 'jdk-17'
$sdkDir = Join-Path $base 'android-sdk'
$gradleDir = Join-Path $base 'gradle-8.13'
$keystore  = Join-Path $here 'signing.keystore'
$passFile  = Join-Path $here 'keystore-password.txt'

New-Item -ItemType Directory -Force -Path $base | Out-Null

# Runs a native tool with error handling relaxed, so its stderr chatter does not
# terminate the script. Success is checked explicitly after each step.
function Run-Native {
  param([scriptblock]$Body)
  $old = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    & $Body 2>&1
  } finally {
    $ErrorActionPreference = $old
  }
}

function Get-RemoteFile {
  param([string]$Url, [string]$Out)
  if (Test-Path $Out) {
    # A half-written zip looks fine by size but fails to open, so test it.
    try {
      Add-Type -AssemblyName System.IO.Compression.FileSystem -ErrorAction SilentlyContinue
      $probe = [System.IO.Compression.ZipFile]::OpenRead($Out)
      $probe.Dispose()
      return
    } catch {
      Write-Host "discarding incomplete download: $Out"
      Remove-Item $Out -Force -ErrorAction SilentlyContinue
    }
  }
  Write-Host "downloading $Url"
  $ProgressPreference = 'SilentlyContinue'
  $part = "$Out.part"
  Remove-Item $part -Force -ErrorAction SilentlyContinue
  Invoke-WebRequest -UseBasicParsing $Url -OutFile $part -TimeoutSec 3600
  Move-Item $part $Out -Force
}

# ---------------------------------------------------------------- JDK 17 ----
if (-not (Test-Path (Join-Path $jdkDir 'bin\java.exe'))) {
  $zip = Join-Path $base 'jdk17.zip'
  Get-RemoteFile 'https://api.adoptium.net/v3/binary/latest/17/ga/windows/x64/jdk/hotspot/normal/eclipse' $zip

  Write-Host 'extracting JDK'
  $tmp = Join-Path $base 'jdk-tmp'
  if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
  Expand-Archive -Path $zip -DestinationPath $tmp -Force
  $inner = Get-ChildItem $tmp -Directory | Select-Object -First 1
  if (Test-Path $jdkDir) { Remove-Item $jdkDir -Recurse -Force }
  Move-Item $inner.FullName $jdkDir
  Remove-Item $tmp -Recurse -Force
}
$env:JAVA_HOME = $jdkDir
$java  = Join-Path $jdkDir 'bin\java.exe'
$keytool = Join-Path $jdkDir 'bin\keytool.exe'
if (-not (Test-Path $java)) { throw 'the JDK did not extract correctly - delete jdk17.zip and rerun' }
Write-Host ('JDK: ' + ((Run-Native { & $java -version } | Select-Object -First 1) -join ' '))

# ------------------------------------------------------------ Android SDK ----
if (-not $SkipToolchain) {
  $sdkManager = Join-Path $sdkDir 'cmdline-tools\latest\bin\sdkmanager.bat'
  if (-not (Test-Path $sdkManager)) {
    $zip = Join-Path $base 'cmdline-tools.zip'
    Get-RemoteFile 'https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip' $zip

    Write-Host 'extracting command-line tools'
    $tmp = Join-Path $base 'cmdline-tmp'
    if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
    Expand-Archive -Path $zip -DestinationPath $tmp -Force
    New-Item -ItemType Directory -Force -Path (Join-Path $sdkDir 'cmdline-tools') | Out-Null
    $latest = Join-Path $sdkDir 'cmdline-tools\latest'
    if (Test-Path $latest) { Remove-Item $latest -Recurse -Force }
    Move-Item (Join-Path $tmp 'cmdline-tools') $latest
    Remove-Item $tmp -Recurse -Force
  }

  $env:ANDROID_HOME = $sdkDir
  $env:ANDROID_SDK_ROOT = $sdkDir
  if (-not (Test-Path $sdkManager)) { throw 'the Android command-line tools did not extract correctly' }

  Write-Host 'accepting SDK licences'
  # sdkmanager reads answers from stdin; piping through a .bat file directly
  # from PowerShell does not reach the JVM, so go through cmd and a real file.
  $yesFile = Join-Path $base 'yes.txt'
  Set-Content -Path $yesFile -Value (1..80 | ForEach-Object { 'y' }) -Encoding ASCII
  Run-Native { cmd /c "type `"$yesFile`" | `"$sdkManager`" --sdk_root=$sdkDir --licenses" } | Out-Null
  if (-not (Test-Path (Join-Path $sdkDir 'licenses'))) { throw 'SDK licences were not accepted' }

  Write-Host 'installing platform-tools, build-tools 36, platform 36'
  Run-Native { & $sdkManager --sdk_root=$sdkDir "platform-tools" "platforms;android-36" "build-tools;36.0.0" } |
    Select-String -Pattern 'done|Install|Error|Warning' | Select-Object -Last 5
  if (-not (Test-Path (Join-Path $sdkDir 'platforms\android-36'))) {
    throw 'Android platform 36 is missing - the sdkmanager install failed'
  }

  # local.properties keeps the SDK path out of the committed gradle files.
  "sdk.dir=$($sdkDir -replace '\\','\\')" | Set-Content -Path (Join-Path $here 'local.properties') -Encoding ASCII
}

# ---------------------------------------------------------------- signing ----
if (-not (Test-Path $keystore)) {
  $chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'.ToCharArray()
  $password = -join (1..24 | ForEach-Object { $chars[(Get-Random -Maximum $chars.Length)] })
  Write-Host 'creating upload keystore'
  Run-Native { & $keytool -genkeypair -v `
    -keystore $keystore -alias newai -keyalg RSA -keysize 2048 -validity 10000 `
    -storepass $password -keypass $password `
    -dname 'CN=Nabeel Ameen, O=NEW AI, L=Karachi, C=PK' } | Out-Null
  if (-not (Test-Path $keystore)) { throw 'keytool could not create the signing keystore' }
  Set-Content -Path $passFile -Value $password -Encoding ASCII
  Write-Host 'keystore password saved to mobile\keystore-password.txt - back it up!'
}
if (-not (Test-Path $passFile)) {
  throw 'signing.keystore exists but keystore-password.txt is missing. Restore the password, or delete the keystore to start over.'
}
$password = (Get-Content $passFile -Raw).Trim()
if (-not $password) { throw 'mobile\keystore-password.txt is empty - delete the keystore and rebuild' }

# SHA-256 fingerprint, needed by the Digital Asset Links file.
$listing = Run-Native { & $keytool -list -v -keystore $keystore -alias newai -storepass $password }
$shaLine = ($listing | Select-String -Pattern 'SHA256:' | Select-Object -First 1).Line
$sha = (($shaLine -replace '.*SHA256:\s*', '') -replace '\s', '').ToUpper()
if (-not $sha) { throw 'could not read the sha256 fingerprint from the keystore' }
Write-Host "SHA-256: $sha"

# ------------------------------------------------------- asset statements ----
# The site has to list this fingerprint before Chrome hides the URL bar.
$stringsPath = Join-Path $here 'app\src\main\res\values\strings.xml'
$strings = @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="launch_url">https://aminbaloch984-design.github.io/nabeel-ameen/new-ai/</string>
    <string name="asset_statements">[{&quot;relation&quot;:[&quot;delegate_permission/common.handle_all_urls&quot;],&quot;target&quot;:{&quot;namespace&quot;:&quot;android_app&quot;,&quot;package_name&quot;:&quot;com.nabeelameen.newai&quot;,&quot;sha256_cert_fingerprints&quot;:[&quot;$sha&quot;]}}]</string>
</resources>
"@
Set-Content -Path $stringsPath -Value $strings -Encoding UTF8

$assetlinks = @"
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.nabeelameen.newai",
      "sha256_cert_fingerprints": ["$sha"]
    }
  }
]
"@
Set-Content -Path (Join-Path $here 'assetlinks.json') -Value $assetlinks -Encoding UTF8
Write-Host 'wrote mobile\assetlinks.json (publish it at the domain root)'

# ---------------------------------------------------------------- icons -----
Add-Type -AssemblyName System.Drawing
$master = Join-Path (Split-Path -Parent $here) 'icon-512.png'
if (-not (Test-Path $master)) { throw "missing icon: $master" }

$densities = @{ 'mdpi' = 48; 'hdpi' = 72; 'xhdpi' = 96; 'xxhdpi' = 144; 'xxxhdpi' = 192 }
foreach ($name in $densities.Keys) {
  $dir = Join-Path $here "app\src\main\res\mipmap-$name"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $size = $densities[$name]

  $srcBitmap = [System.Drawing.Image]::FromFile($master)
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.SmoothingMode = 'AntiAlias'
  $g.DrawImage($srcBitmap, 0, 0, $size, $size)
  $bmp.Save((Join-Path $dir 'ic_launcher.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $srcBitmap.Dispose()
}
Write-Host 'generated launcher icons'

# ---------------------------------------------------------------- gradle ----
if (-not (Test-Path (Join-Path $gradleDir 'bin\gradle.bat'))) {
  $zip = Join-Path $base 'gradle-8.13-bin.zip'
  Get-RemoteFile 'https://services.gradle.org/distributions/gradle-8.13-bin.zip' $zip
  Write-Host 'extracting Gradle'
  $tmp = Join-Path $base 'gradle-tmp'
  if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
  Expand-Archive -Path $zip -DestinationPath $tmp -Force
  $inner = Get-ChildItem $tmp -Directory | Select-Object -First 1
  if (Test-Path $gradleDir) { Remove-Item $gradleDir -Recurse -Force }
  Move-Item $inner.FullName $gradleDir
  Remove-Item $tmp -Recurse -Force
}

$env:ANDROID_HOME = $sdkDir
$env:ANDROID_SDK_ROOT = $sdkDir
if (-not (Test-Path (Join-Path $gradleDir 'bin\gradle.bat'))) { throw 'Gradle did not extract correctly' }
$gradle = Join-Path $gradleDir 'bin\gradle.bat'

Write-Host ''
Write-Host 'building release bundle'
$gradleOutput = Run-Native { & $gradle --no-daemon -p $here `
  "-PNEWAI_STORE_FILE=$keystore" `
  "-PNEWAI_STORE_PASSWORD=$password" `
  "-PNEWAI_KEY_ALIAS=newai" `
  "-PNEWAI_KEY_PASSWORD=$password" `
  assembleRelease bundleRelease }
$gradleOutput | Select-Object -Last 40 | ForEach-Object { Write-Host $_ }
if ($LASTEXITCODE -ne 0) { throw "Gradle failed with exit code $LASTEXITCODE" }

$aab = Join-Path $here 'app\build\outputs\bundle\release\app-release.aab'
$apk = Join-Path $here 'app\build\outputs\apk\release\app-release.apk'
if (Test-Path $aab) { Copy-Item $aab (Join-Path $here 'app-release-bundle.aab') -Force }
if (Test-Path $apk) { Copy-Item $apk (Join-Path $here 'app-release-signed.apk') -Force }

Write-Host ''
if (Test-Path (Join-Path $here 'app-release-bundle.aab')) {
  Write-Host ('AAB ready: ' + (Join-Path $here 'app-release-bundle.aab'))
} else {
  Write-Host 'build did not produce an AAB - read the Gradle output above'
}

