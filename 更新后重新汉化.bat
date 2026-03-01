@echo off
chcp 65001 > nul
title Pixel Art Academy - 游戏更新后重新汉化

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║  Pixel Art Academy Learn Mode            ║
echo  ║  游戏更新后 - 重新应用汉化补丁           ║
echo  ╚══════════════════════════════════════════╝
echo.
echo  当 Steam 更新游戏后，汉化可能会失效。
echo  本脚本将自动重新解包并应用汉化补丁。
echo.

:: Remove old backups so new ones get created
if exist "%~dp0backup" (
    echo 正在清除旧的备份文件...
    del /q "%~dp0backup\package.json.bak" 2>nul
    del /q "%~dp0backup\cache.json.bak" 2>nul
    del /q "%~dp0backup\app.js.bak" 2>nul
    del /q "%~dp0backup\merged-stylesheets.css.bak" 2>nul
    if exist "%~dp0backup\packages_bak" rmdir /s /q "%~dp0backup\packages_bak" 2>nul
    echo.
)

:: Remove old extracted dirs so they get re-extracted from updated asar
set APPDIR=%~dp0..\resources\app
if exist "%APPDIR%\app_extracted" (
    echo 正在删除旧的解包目录...
    rmdir /s /q "%APPDIR%\app_extracted" 2>nul
    rmdir /s /q "%APPDIR%\meteor_extracted" 2>nul
    echo.
)

echo 正在重新安装汉化补丁...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0apply_patch.ps1" -Action install

echo.
pause
