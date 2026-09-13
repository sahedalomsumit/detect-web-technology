Add-Type -AssemblyName System.Drawing

$iconsDir = Join-Path $PSScriptRoot "icons"
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir -Force | Out-Null
}

$sizes = @(16, 32, 48, 128)

foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = [float]$size / 32.0

    # 1. Outer Hexagon (fill: #ffffff)
    # SVG: M16 2L30 10V22L16 30L2 22V10L16 2Z
    [System.Drawing.PointF[]]$outerPts = @(
        [System.Drawing.PointF]::new(16.0 * $scale, 2.0 * $scale),
        [System.Drawing.PointF]::new(30.0 * $scale, 10.0 * $scale),
        [System.Drawing.PointF]::new(30.0 * $scale, 22.0 * $scale),
        [System.Drawing.PointF]::new(16.0 * $scale, 30.0 * $scale),
        [System.Drawing.PointF]::new(2.0 * $scale, 22.0 * $scale),
        [System.Drawing.PointF]::new(2.0 * $scale, 10.0 * $scale)
    )
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.FillPolygon($whiteBrush, $outerPts)

    # 2. Inner Hexagon (fill: #490899)
    # SVG: M16 5L27 11.5V20.5L16 27L5 20.5V11.5L16 5Z
    [System.Drawing.PointF[]]$innerPts = @(
        [System.Drawing.PointF]::new(16.0 * $scale, 5.0 * $scale),
        [System.Drawing.PointF]::new(27.0 * $scale, 11.5 * $scale),
        [System.Drawing.PointF]::new(27.0 * $scale, 20.5 * $scale),
        [System.Drawing.PointF]::new(16.0 * $scale, 27.0 * $scale),
        [System.Drawing.PointF]::new(5.0 * $scale, 20.5 * $scale),
        [System.Drawing.PointF]::new(5.0 * $scale, 11.5 * $scale)
    )
    $purpleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 73, 8, 153))
    $g.FillPolygon($purpleBrush, $innerPts)

    # 3. Center W Symbol (stroke: #ffffff, stroke-width: 2.2, round cap & join)
    # SVG: M10 12L13 21L16 14L19 21L22 12
    [System.Drawing.PointF[]]$wPts = @(
        [System.Drawing.PointF]::new(10.0 * $scale, 12.0 * $scale),
        [System.Drawing.PointF]::new(13.0 * $scale, 21.0 * $scale),
        [System.Drawing.PointF]::new(16.0 * $scale, 14.0 * $scale),
        [System.Drawing.PointF]::new(19.0 * $scale, 21.0 * $scale),
        [System.Drawing.PointF]::new(22.0 * $scale, 12.0 * $scale)
    )
    $strokeWidth = [float](2.2 * $scale)
    $wPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 255, 255), $strokeWidth)
    $wPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $wPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $wPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $g.DrawLines($wPen, $wPts)

    $outPath = Join-Path $iconsDir ("icon-" + $size + ".png")
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $wPen.Dispose()
    $purpleBrush.Dispose()
    $whiteBrush.Dispose()
    $g.Dispose()
    $bmp.Dispose()

    Write-Host "Successfully generated: $outPath"
}
