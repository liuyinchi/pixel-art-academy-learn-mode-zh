# Pixel Art Academy Learn Mode - Chinese Localization Patch
# PowerShell Script - Zero external dependencies
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("install", "uninstall")]
    [string]$Action
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

# ---- Paths ----
$PatchDir = $PSScriptRoot
$GameDir = Split-Path $PatchDir -Parent
$AppDir = Join-Path $GameDir "resources\app"
$AppExtracted = Join-Path $AppDir "app_extracted"
$MeteorExtracted = Join-Path $AppDir "meteor_extracted"
$AppJs = Join-Path $AppExtracted "app.js"
$PackageJson = Join-Path $AppDir "package.json"
$CacheJson = Join-Path $MeteorExtracted "app\artificial\babel\cache.json"
$CssFile = Join-Path $MeteorExtracted "merged-stylesheets.css"
$TransFile = Join-Path $PatchDir "translations_zh.json"

# Font files
$Font8 = Join-Path $PatchDir "fonts\fp8.ttf"
$Font10 = Join-Path $PatchDir "fonts\fp10.ttf"
$Font12 = Join-Path $PatchDir "fonts\fp12.ttf"

# Backup dir
$BackupDir = Join-Path $PatchDir "backup"

function Write-Status($msg) {
    Write-Host "[*] $msg" -ForegroundColor Cyan
}
function Write-OK($msg) {
    Write-Host "[OK] $msg" -ForegroundColor Green
}
function Write-Err($msg) {
    Write-Host "[ERROR] $msg" -ForegroundColor Red
}

# ============================================================
# INSTALL
# ============================================================
function Do-Install {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "  Pixel Art Academy Learn Mode" -ForegroundColor Yellow
    Write-Host "  Simplified Chinese Localization Patch" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""

    # Check Python availability early
    $pythonCmd = $null
    try { if (Get-Command python3 -ErrorAction SilentlyContinue) { $pythonCmd = "python3" } } catch {}
    if (-not $pythonCmd) {
        try { if (Get-Command python -ErrorAction SilentlyContinue) { $pythonCmd = "python" } } catch {}
    }
    if (-not $pythonCmd) {
        Write-Err "Python not found. Please install Python 3 from https://www.python.org/downloads/"
        return $false
    }

    # Validate game directory
    $MeteorAsar = Join-Path $AppDir "meteor.asar"
    $AppAsar = Join-Path $AppDir "app.asar"
    if (-not (Test-Path $AppAsar) -and -not (Test-Path $AppJs)) {
        Write-Err "Cannot find game files. Please place this patch folder inside the game root directory."
        return $false
    }
    if (-not (Test-Path $TransFile)) {
        Write-Err "Cannot find translations_zh.json in patch folder."
        return $false
    }

    # ---- Step 0: Extract asar files if needed ----
    $ExtractScript = Join-Path $PatchDir "extract_asar.py"
    if (-not (Test-Path $AppJs)) {
        Write-Status "Step 0: Extracting app.asar (first-time setup) ..."
        & $pythonCmd $ExtractScript $AppAsar $AppExtracted
        if ($LASTEXITCODE -ne 0 -or -not (Test-Path $AppJs)) {
            Write-Err "Failed to extract app.asar"
            return $false
        }
        Write-OK "app.asar extracted"
    }
    if (-not (Test-Path $CacheJson)) {
        Write-Status "Step 0: Extracting meteor.asar (this may take a minute) ..."
        & $pythonCmd $ExtractScript $MeteorAsar $MeteorExtracted
        if ($LASTEXITCODE -ne 0 -or -not (Test-Path $CacheJson)) {
            Write-Err "Failed to extract meteor.asar"
            return $false
        }
        Write-OK "meteor.asar extracted"
    }

    # Create backup directory
    if (-not (Test-Path $BackupDir)) {
        New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    }

    # ---- Step 1: Redirect Electron to load from extracted directories ----
    Write-Status "Step 1/5: Redirecting game to load from extracted files ..."

    # 1a. Backup and modify package.json (main entry point)
    $PkgBackup = Join-Path $BackupDir "package.json.bak"
    if (-not (Test-Path $PkgBackup)) {
        Copy-Item $PackageJson $PkgBackup -Force
        Write-OK "package.json backed up"
    }

    $pkgContent = Get-Content $PackageJson -Raw -Encoding UTF8
    if ($pkgContent -match '"main"\s*:\s*"app\.asar"') {
        $pkgContent = $pkgContent -replace '"main"\s*:\s*"app\.asar"', '"main": "app_extracted/index.js"'
        [System.IO.File]::WriteAllText($PackageJson, $pkgContent, [System.Text.UTF8Encoding]::new($false))
        Write-OK "package.json: main -> app_extracted/index.js"
    } else {
        Write-OK "package.json already patched (skipped)"
    }

    # 1b. Backup and modify app.js (meteor loading path)
    $AppJsBackup = Join-Path $BackupDir "app.js.bak"
    if (-not (Test-Path $AppJsBackup)) {
        Copy-Item $AppJs $AppJsBackup -Force
        Write-OK "app.js backed up"
    }

    $appContent = Get-Content $AppJs -Raw -Encoding UTF8
    if ($appContent -match "meteor\.asar") {
        $appContent = $appContent -replace "meteor\.asar", "meteor_extracted"
        [System.IO.File]::WriteAllText($AppJs, $appContent, [System.Text.UTF8Encoding]::new($false))
        Write-OK "app.js: meteor.asar -> meteor_extracted"
    } else {
        Write-OK "app.js already patched (skipped)"
    }

    # ---- Step 2: Inject translations into cache.json (via Python) ----
    Write-Status "Step 2/5: Injecting Chinese translations into cache.json ..."

    $CacheBackup = Join-Path $BackupDir "cache.json.bak"
    if (-not (Test-Path $CacheBackup)) {
        Copy-Item $CacheJson $CacheBackup -Force
        Write-OK "cache.json backed up"
    }

    $InjectScript = Join-Path $PatchDir "inject_translations.py"
    & $pythonCmd $InjectScript $CacheJson $TransFile
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Translation injection failed."
        return $false
    }
    Write-OK "Translations injected successfully"

    # ---- Step 3: Patch JS files (hardcoded strings + manual patches) ----
    $HardcodedZh = Join-Path $PatchDir "hardcoded_zh.json"
    $ManualPatchesJson = Join-Path $PatchDir "manual_patches.json"
    $PackagesDir = Join-Path $MeteorExtracted "packages"
    $hasHardcoded = Test-Path $HardcodedZh
    $hasManual = Test-Path $ManualPatchesJson

    if ($hasHardcoded -or $hasManual) {
        Write-Status "Step 3/5: Patching JS files ..."

        # Restore JS backups first to ensure we patch clean English files
        # This prevents double-patching when user runs install twice
        $JsBackupDir = Join-Path $BackupDir "packages_bak"
        if (Test-Path $JsBackupDir) {
            Get-ChildItem $JsBackupDir -Filter "*.js" | ForEach-Object {
                Copy-Item $_.FullName (Join-Path $PackagesDir $_.Name) -Force
            }
            Write-OK "JS files restored from backup before patching"
        } else {
            # First time: backup the original JS files
            New-Item -ItemType Directory -Path $JsBackupDir -Force | Out-Null

            # Collect target filenames from hardcoded_zh.json
            $allTargetPkgs = @()
            if ($hasHardcoded) {
                $hcPkgs = & $pythonCmd -c "import json;d=json.load(open('$($HardcodedZh.Replace('\','\\'))','r',encoding='utf-8'));print('\n'.join(set(k.split('|||')[0] for k in d)))" 2>$null
                if ($hcPkgs) { $allTargetPkgs += ($hcPkgs -split "`n") }
            }
            # Collect target filenames from manual_patches.json
            if ($hasManual) {
                $mpPkgs = & $pythonCmd -c "import json;d=json.load(open('$($ManualPatchesJson.Replace('\','\\'))','r',encoding='utf-8'));print('\n'.join(set(p['file'] for p in d)))" 2>$null
                if ($mpPkgs) { $allTargetPkgs += ($mpPkgs -split "`n") }
            }

            # De-duplicate and backup
            $allTargetPkgs = $allTargetPkgs | ForEach-Object { $_.Trim() } | Where-Object { $_ } | Sort-Object -Unique
            foreach ($pkg in $allTargetPkgs) {
                $srcFile = Join-Path $PackagesDir $pkg
                if (Test-Path $srcFile) {
                    Copy-Item $srcFile (Join-Path $JsBackupDir $pkg) -Force
                }
            }
            Write-OK "Original JS files backed up"
        }

        # 3a. Patch hardcoded strings (auto-extracted patterns)
        if ($hasHardcoded) {
            $PatchHardcodedScript = Join-Path $PatchDir "patch_hardcoded.py"
            & $pythonCmd $PatchHardcodedScript $PackagesDir $HardcodedZh
            if ($LASTEXITCODE -ne 0) {
                Write-Err "Hardcoded string patching failed (non-critical, continuing)."
            } else {
                Write-OK "Hardcoded strings patched"
            }
        }

        # 3b. Apply manual patches (strings not caught by auto-extraction)
        if ($hasManual) {
            $PatchManualScript = Join-Path $PatchDir "patch_manual.py"
            & $pythonCmd $PatchManualScript $PackagesDir $ManualPatchesJson
            if ($LASTEXITCODE -ne 0) {
                Write-Err "Manual patching failed (non-critical, continuing)."
            } else {
                Write-OK "Manual patches applied"
            }
        }
    } else {
        Write-Status "Step 3/5: No JS patch files found, skipping"
    }

    # ---- Step 4: Patch fonts in CSS ----
    Write-Status "Step 4/5: Patching fonts for Chinese character support ..."

    $CssBackup = Join-Path $BackupDir "merged-stylesheets.css.bak"
    if (-not (Test-Path $CssBackup)) {
        Copy-Item $CssFile $CssBackup -Force
        Write-OK "CSS backed up"
    }

    # Copy font files to meteor_extracted directory
    $fontDest = $MeteorExtracted
    if (Test-Path $Font8) {
        Copy-Item $Font8 (Join-Path $fontDest "fp8.ttf") -Force
        Copy-Item $Font10 (Join-Path $fontDest "fp10.ttf") -Force
        Copy-Item $Font12 (Join-Path $fontDest "fp12.ttf") -Force
        Write-OK "Font files copied"
    } else {
        Write-Err "Font files not found in patch/fonts/ - skipping font patch"
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  Installation complete (without fonts)" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        return $true
    }

    # Read CSS and patch font-face declarations
    $cssContent = [System.IO.File]::ReadAllText($CssFile, [System.Text.UTF8Encoding]::new($false))

    # Font mapping: font-family-name -> replacement TTF file
    # We replace the base64 src line with a url() to our TTF file
    $fontMap = @{
        "Adventure Retronator"  = "fp8.ttf"
        "Freehand Retronator"   = "fp8.ttf"
        "Checkout Retronator"   = "fp8.ttf"
        "Small Print Retronator"= "fp8.ttf"
        "Daily Retronator"      = "fp10.ttf"
        "Typecast Retronator"   = "fp12.ttf"
        "Study Plan Retronator" = "fp8.ttf"
    }

    $fontPatched = 0
    foreach ($fontName in $fontMap.Keys) {
        $ttfFile = $fontMap[$fontName]
        # Match @font-face src line that follows a font-family declaration
        # Handles both with and without 'Microsoft YaHei' fallback
        $escaped = [regex]::Escape($fontName)
        $pattern = "(?<=font-family:\s*['""]$escaped['""][^;]*;\s*\r?\n\s*)src:\s*url\(data:[^)]+\)\s*format\(['""]woff['""]\);"
        $replacement = "src: url('$ttfFile') format('truetype');"

        $newCss = [regex]::Replace($cssContent, $pattern, $replacement)
        if ($newCss -ne $cssContent) {
            $cssContent = $newCss
            $fontPatched++
        }
    }

    [System.IO.File]::WriteAllText($CssFile, $cssContent, [System.Text.UTF8Encoding]::new($false))
    Write-OK "Patched $fontPatched font declarations"

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Installation Complete!" -ForegroundColor Green
    Write-Host "  Now launch the game from Steam." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    return $true
}

# ============================================================
# UNINSTALL
# ============================================================
function Do-Uninstall {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "  Uninstalling Chinese Patch" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""

    if (-not (Test-Path $BackupDir)) {
        Write-Err "Backup folder not found. Nothing to restore."
        return $false
    }

    $restored = 0

    # Restore package.json
    $PkgBackup = Join-Path $BackupDir "package.json.bak"
    if (Test-Path $PkgBackup) {
        Copy-Item $PkgBackup $PackageJson -Force
        Write-OK "package.json restored"
        $restored++
    }

    # Restore app.js
    $AppJsBackup = Join-Path $BackupDir "app.js.bak"
    if (Test-Path $AppJsBackup) {
        Copy-Item $AppJsBackup $AppJs -Force
        Write-OK "app.js restored"
        $restored++
    }

    # Restore cache.json
    $CacheBackup = Join-Path $BackupDir "cache.json.bak"
    if (Test-Path $CacheBackup) {
        Copy-Item $CacheBackup $CacheJson -Force
        Write-OK "cache.json restored"
        $restored++
    }

    # Restore CSS
    $CssBackup = Join-Path $BackupDir "merged-stylesheets.css.bak"
    if (Test-Path $CssBackup) {
        Copy-Item $CssBackup $CssFile -Force
        Write-OK "merged-stylesheets.css restored"
        $restored++
    }

    # Restore JS file backups
    $JsBackupDir = Join-Path $BackupDir "packages_bak"
    if (Test-Path $JsBackupDir) {
        $PackagesDir = Join-Path $MeteorExtracted "packages"
        Get-ChildItem $JsBackupDir -Filter "*.js" | ForEach-Object {
            Copy-Item $_.FullName (Join-Path $PackagesDir $_.Name) -Force
        }
        Write-OK "JS files restored"
        $restored++
    }

    # Remove copied font files
    foreach ($f in @("fp8.ttf", "fp10.ttf", "fp12.ttf")) {
        $fp = Join-Path $MeteorExtracted $f
        if (Test-Path $fp) { Remove-Item $fp -Force }
    }
    Write-OK "Font files removed"

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Uninstall Complete! ($restored files restored)" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    return $true
}

# ---- Main ----
switch ($Action) {
    "install"   { $result = Do-Install }
    "uninstall" { $result = Do-Uninstall }
}

if (-not $result) {
    Write-Host ""
    Write-Err "Operation failed. Check the error messages above."
    exit 1
}
