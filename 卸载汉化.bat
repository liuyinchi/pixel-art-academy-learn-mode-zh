@echo off
chcp 65001 > nul
title Pixel Art Academy - 卸载汉化补丁

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║  Pixel Art Academy Learn Mode            ║
echo  ║  卸载汉化补丁 - 恢复英文原版             ║
echo  ╚══════════════════════════════════════════╝
echo.

if not exist "%~dp0backup" (
    echo [提示] 未找到备份文件，可能尚未安装汉化补丁。
    pause
    exit /b 0
)

echo 正在卸载汉化补丁，恢复原版文件...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0apply_patch.ps1" -Action uninstall

echo.
pause
