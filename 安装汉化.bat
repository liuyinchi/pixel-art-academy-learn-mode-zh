@echo off
chcp 65001 > nul
title Pixel Art Academy - 安装简体中文汉化补丁

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║  Pixel Art Academy Learn Mode            ║
echo  ║  简体中文汉化补丁 - 安装程序             ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Check if we're in the right directory
if not exist "%~dp0..\resources\app" (
    echo [错误] 请将"汉化补丁"文件夹放到游戏根目录下！
    echo.
    echo 正确的目录结构：
    echo   Pixel Art Academy Learn Mode\
    echo     ├── 汉化补丁\        ^<-- 本文件夹
    echo     ├── resources\
    echo     └── Pixel Art Academy Learn Mode.exe
    echo.
    pause
    exit /b 1
)

echo 正在安装汉化补丁，请稍候...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0apply_patch.ps1" -Action install

echo.
pause
