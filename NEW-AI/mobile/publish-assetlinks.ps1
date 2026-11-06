# Publishes the Digital Asset Links file that lets the installed app hide the
# browser address bar.
#
# Chrome looks for it at the ORIGIN ROOT, not under /nabeel-ameen/:
#   https://aminbaloch984-design.github.io/.well-known/assetlinks.json
#
# So it lives in the GitHub Pages user site repository.
#
# Run after mobile\build.ps1 has written mobile\assetlinks.json:
#   powershell -ExecutionPolicy Bypass -File mobile\publish-assetlinks.ps1

$ErrorActionPreference = 'Continue'  # git writes progress to stderr
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$file = Join-Path $here 'assetlinks.json'
if (-not (Test-Path $file)) { throw 'run mobile\build.ps1 first - assetlinks.json is missing' }

$gh = 'C:\Program Files\GitHub CLI\gh.exe'
$git = 'C:\Program Files\Git\cmd\git.exe'
$owner = 'aminbaloch984-design'
$repo = "$owner.github.io"
$work = Join-Path $env:TEMP "opencode\$repo"

cmd /c "`"$gh`" api repos/$owner/$repo >nul 2>&1"
if ($LASTEXITCODE -ne 0) {
  Write-Host "creating $repo"
  cmd /c "`"$gh`" repo create $repo --public --description `"GitHub Pages root - app verification files`" >nul 2>&1"
  Start-Sleep -Seconds 4
  cmd /c "`"$gh`" api repos/$owner/$repo >nul 2>&1"
  if ($LASTEXITCODE -ne 0) { throw "could not create $owner/$repo - run: gh auth status" }
}

if (Test-Path $work) { Remove-Item $work -Recurse -Force }
& $git clone "https://github.com/$owner/$repo.git" $work 2>&1 | Out-Null
if (-not (Test-Path (Join-Path $work '.git'))) { throw "git clone failed for $owner/$repo" }

$wellKnown = Join-Path $work '.well-known'
New-Item -ItemType Directory -Force -Path $wellKnown | Out-Null
Copy-Item $file (Join-Path $wellKnown 'assetlinks.json') -Force

# A small landing page so the domain root is not a 404.
$index = @'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NEW AI</title>
  <meta http-equiv="refresh" content="0; url=/nabeel-ameen/new-ai/">
  <style>
    html, body { height: 100%; margin: 0; background: #05070d; color: #e6ecff;
      font: 16px system-ui, sans-serif; display: grid; place-items: center; }
    a { color: #22d3ee; }
  </style>
</head>
<body>
  <p>Opening <a href="/nabeel-ameen/new-ai/">NEW AI</a>...</p>
</body>
</html>
'@
Set-Content -Path (Join-Path $work 'index.html') -Value $index -Encoding UTF8
Set-Content -Path (Join-Path $work '.nojekyll') -Value '' -Encoding ASCII

Push-Location $work
try {
  cmd /c "`"$git`" add . "
  cmd /c "`"$git`" -c user.name=`"Nabeel Ameen`" -c user.email=`"aminbaloch984-design@users.noreply.github.com`" commit -m `"Publish asset links for the NEW AI Android app`" >nul 2>&1"
  cmd /c "`"$git`" push origin HEAD:main 2>&1"
} finally {
  Pop-Location
}

# Make sure Pages is serving the branch.
cmd /c "`"$gh`" api repos/$owner/$repo/pages >nul 2>&1"
if ($LASTEXITCODE -ne 0) {
  Write-Host 'enabling GitHub Pages'
  cmd /c "`"$gh`" api -X POST repos/$owner/$repo/pages -f source[branch]=main -f source[path]=/ >nul 2>&1"
}

Write-Host ''
$url = "https://$owner.github.io/.well-known/assetlinks.json"
$ok = $false
for ($i = 0; $i -lt 12 -and -not $ok; $i++) {
  Start-Sleep -Seconds 15
  try {
    $r = Invoke-WebRequest -UseBasicParsing $url -TimeoutSec 20
    $ok = $r.StatusCode -eq 200
  } catch { $ok = $false }
}

if ($ok) {
  Write-Host "assetlinks live: $url"
} else {
  Write-Host "published, but $url is not live yet - GitHub Pages can take a few minutes"
  Write-Host 'Check again with: mobile\publish-assetlinks.ps1'
}
