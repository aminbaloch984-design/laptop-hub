# Draws the 1024x500 Play Store feature graphic for NEW AI.
# Run: powershell -ExecutionPolicy Bypass -File mobile\make-store-art.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$out  = Join-Path $here 'feature-graphic.png'

$w = 1024
$h = 500
$bg = [System.Drawing.ColorTranslator]::FromHtml('#05070d')
$cyan = [System.Drawing.ColorTranslator]::FromHtml('#22d3ee')
$violet = [System.Drawing.ColorTranslator]::FromHtml('#8b5cf6')
$grey = [System.Drawing.ColorTranslator]::FromHtml('#93a0c4')

$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'
$g.Clear($bg)

# Soft radial glow behind the mark.
$glow = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow.AddEllipse(60, 40, 420, 420)
$brush = New-Object System.Drawing.Drawing2D.PathGradientBrush $glow
$brush.CenterColor = [System.Drawing.Color]::FromArgb(70, $violet)
$brush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $bg))
$g.FillPath($brush, $glow)

# Ring mark.
$ringRect = New-Object System.Drawing.RectangleF 120, 100, 300, 300
$ringBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $ringRect, $cyan, $violet, 45
$pen = New-Object System.Drawing.Pen $ringBrush, 26
$g.DrawEllipse($pen, $ringRect)

$dot = New-Object System.Drawing.RectangleF 232, 212, 76, 76
$g.FillEllipse($ringBrush, $dot)

# Wordmark.
$titleFont = New-Object System.Drawing.Font 'Segoe UI', 76, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$tagFont   = New-Object System.Drawing.Font 'Segoe UI', 26, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)

$titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$tagBrush   = New-Object System.Drawing.SolidBrush $grey

$g.DrawString('NEW AI', $titleFont, $titleBrush, 470, 150)
$g.DrawString('Your personal AI agent', $tagFont, $tagBrush, 476, 260)
$g.DrawString('voice  -  memory  -  tools', $tagFont, $tagBrush, 476, 305)

$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

$pen.Dispose(); $ringBrush.Dispose(); $brush.Dispose(); $glow.Dispose()
$titleFont.Dispose(); $tagFont.Dispose(); $titleBrush.Dispose(); $tagBrush.Dispose()
$g.Dispose(); $bmp.Dispose()

"wrote $out ($w x $h)"
