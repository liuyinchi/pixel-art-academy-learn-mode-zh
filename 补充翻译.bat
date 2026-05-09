@echo off
chcp 65001 > nul
title Pixel Art Academy - 自动补充翻译

echo.
echo  ==========================================
echo    Pixel Art Academy Learn Mode
echo    自动补充翻译 - 提取、翻译、合并、应用
echo  ==========================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未找到 Python，请先安装 Python 3 并勾选 "Add to PATH"。
    echo        下载地址：https://www.python.org/downloads/
    pause
    exit /b 1
)

set APPDIR=%~dp0..\resources\app
if not exist "%APPDIR%\meteor_extracted\packages" (
    echo [错误] 游戏文件尚未解包，请先运行 安装汉化.bat 或 更新后重新汉化.bat
    pause
    exit /b 1
)

echo [1/2] 正在自动提取并翻译新增内容...
echo.
python "%~dp0auto_translate_missing.py"
if %errorlevel% neq 0 (
    echo.
    echo ==========================================
    echo  自动补充翻译未完成。
    echo.
    echo  如果提示未配置 AI 翻译接口，请先设置环境变量：
    echo    setx PAA_TRANSLATE_API_KEY "你的 API key"
    echo    setx PAA_TRANSLATE_BASE_URL "https://api.openai.com/v1"
    echo    setx PAA_TRANSLATE_MODEL "gpt-4o-mini"
    echo.
    echo  也可以使用 DeepSeek、OpenRouter 等 OpenAI 兼容接口，
    echo  只要把 BASE_URL 和 MODEL 改成对应服务即可。
    echo ==========================================
    pause
    exit /b 1
)

echo.
echo [2/2] 正在重新应用汉化补丁...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0apply_patch.ps1" -Action install
if %errorlevel% neq 0 (
    echo.
    echo [错误] 重新应用汉化失败，请查看上方信息。
    pause
    exit /b 1
)

echo.
echo ==========================================
echo  完成！请启动游戏检查翻译效果。
echo ==========================================
echo.
pause
