@echo off
chcp 65001 > nul
title 构建汉化补丁 .exe

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║  构建 Pixel Art Academy 汉化补丁 .exe    ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Check Python
python --version > nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Python，请先安装 Python 3
    pause
    exit /b 1
)

:: Install PyInstaller if not present
echo [*] 检查 PyInstaller ...
pip show pyinstaller > nul 2>&1
if errorlevel 1 (
    echo [*] 正在安装 PyInstaller ...
    pip install pyinstaller
    if errorlevel 1 (
        echo [错误] 安装 PyInstaller 失败
        pause
        exit /b 1
    )
)
echo [OK] PyInstaller 已就绪
echo.

:: Build
echo [*] 正在构建 .exe 文件，请稍候...
echo.

python -m PyInstaller --onefile --windowed ^
    --name "Pixel Art Academy 汉化补丁" ^
    --add-data "translations_zh.json;." ^
    --add-data "hardcoded_zh.json;." ^
    --add-data "fonts;fonts" ^
    --distpath "." ^
    --clean ^
    installer_gui.py

if errorlevel 1 (
    echo.
    echo [错误] 构建失败，请查看上方错误信息
    pause
    exit /b 1
)

echo.
echo ========================================
echo  构建成功！
echo  输出文件: Pixel Art Academy 汉化补丁.exe
echo.
echo  使用方法:
echo    将 .exe 文件放到游戏根目录，双击运行即可。
echo ========================================
echo.

:: Clean up build artifacts
if exist build rmdir /s /q build
if exist "Pixel Art Academy 汉化补丁.spec" del "Pixel Art Academy 汉化补丁.spec"

pause
