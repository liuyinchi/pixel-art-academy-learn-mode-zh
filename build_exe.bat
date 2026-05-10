@echo off
chcp 65001 > nul
title Build Pixel Art Academy Chinese patch

echo.
echo ========================================
echo  Build Pixel Art Academy Chinese patch
echo ========================================
echo.

set "BUNDLED_PY=C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
set "PYTHON_CMD="

if exist "%BUNDLED_PY%" (
    set "PYTHON_CMD="%BUNDLED_PY%""
) else (
    where python > nul 2>&1
    if not errorlevel 1 set "PYTHON_CMD=python"
)

if not defined PYTHON_CMD (
    where py > nul 2>&1
    if not errorlevel 1 set "PYTHON_CMD=py -3"
)

if not defined PYTHON_CMD (
    echo [ERROR] Python was not found. Please install Python 3, or run this from Codex again.
    pause
    exit /b 1
)

echo [*] Python:
%PYTHON_CMD% --version
if errorlevel 1 (
    echo [ERROR] Python failed to start.
    pause
    exit /b 1
)

echo.
echo [*] Checking PyInstaller ...
%PYTHON_CMD% -m pip show pyinstaller > nul 2>&1
if errorlevel 1 (
    echo [*] Installing PyInstaller ...
    %PYTHON_CMD% -m pip install pyinstaller
    if errorlevel 1 (
        echo [ERROR] Failed to install PyInstaller.
        pause
        exit /b 1
    )
)
echo [OK] PyInstaller is ready.
echo.

echo [*] Building exe, please wait ...
echo.

if exist "paa_zh_installer.exe" del /f /q "paa_zh_installer.exe"

%PYTHON_CMD% -m PyInstaller --onefile --windowed ^
    --name "paa_zh_installer" ^
    --add-data "translations_zh.json;." ^
    --add-data "hardcoded_zh.json;." ^
    --add-data "hardcoded_skipped.json;." ^
    --add-data "manual_patches.json;." ^
    --add-data "fonts;fonts" ^
    --distpath "." ^
    --clean ^
    installer_gui.py

if errorlevel 1 (
    echo.
    echo [ERROR] Build failed. See the messages above.
    pause
    exit /b 1
)

%PYTHON_CMD% -c "import os; target='Pixel Art Academy \u6c49\u5316\u8865\u4e01.exe'; os.remove(target) if os.path.exists(target) else None; os.replace('paa_zh_installer.exe', target)"
if errorlevel 1 (
    echo.
    echo [ERROR] Failed to rename output. Close any running patch exe and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Build succeeded!
echo  Output: Pixel Art Academy Chinese patch exe
echo ========================================
echo.

if exist build rmdir /s /q build
if exist "paa_zh_installer.spec" del /f /q "paa_zh_installer.spec"
if exist "paa_zh_installer.exe" del /f /q "paa_zh_installer.exe"

pause
