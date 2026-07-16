# Profil fotoğrafı ve CV'yi public/ klasörüne kopyalar.
#
# Örnek:
#   .\scripts\install-assets.ps1 -Profile "C:\Users\cingi\Downloads\foto.jpg"
#   .\scripts\install-assets.ps1 -Resume "C:\Users\cingi\Downloads\CV.pdf"
#   .\scripts\install-assets.ps1 -Profile ".\foto.png" -Resume ".\cv.pdf"

param(
    [string]$Profile,
    [string]$Resume
)

$ErrorActionPreference = "Stop"
$publicDir = Join-Path $PSScriptRoot "..\public"
$publicDir = (Resolve-Path $publicDir).Path

function Install-File {
    param(
        [string]$Source,
        [string]$DestName
    )
    if (-not $Source) { return }
    if (-not (Test-Path $Source)) {
        Write-Error "Dosya bulunamadı: $Source"
    }
    $dest = Join-Path $publicDir $DestName
    Copy-Item -Path $Source -Destination $dest -Force
    Write-Host "OK  $Source -> public/$DestName"
}

if (-not $Profile -and -not $Resume) {
    Write-Host @"

Kullanım:
  .\scripts\install-assets.ps1 -Profile `"C:\yol\foto.jpg`"
  .\scripts\install-assets.ps1 -Resume `"C:\yol\cv.pdf`"

Hedef dosya adları:
  public/profile.jpg
  public/resume.pdf

PNG/WebP profil için önce JPG'ye çevir veya fotoğrafı .jpg olarak kaydet.

"@
    exit 1
}

if ($Profile) {
    $ext = [System.IO.Path]::GetExtension($Profile).ToLower()
    if ($ext -ne ".jpg" -and $ext -ne ".jpeg") {
        Write-Warning "Önerilen format: .jpg (şu an: $ext). site-config profileImage=/profile.jpg"
    }
    Install-File -Source $Profile -DestName "profile.jpg"
}

if ($Resume) {
    Install-File -Source $Resume -DestName "resume.pdf"
}

Write-Host ""
Write-Host "Kontrol: npm run check:assets"
