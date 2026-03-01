@echo off
chcp 65001 > nul
title Pixel Art Academy - 补充翻译新增内容

echo.
echo  ==========================================
echo    Pixel Art Academy Learn Mode
echo    补充翻译 - 处理游戏更新后新增的英文内容
echo  ==========================================
echo.

:: Check Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未找到 Python，请先安装 Python 3 并勾选 "Add to PATH"。
    echo        下载地址：https://www.python.org/downloads/
    pause
    exit /b 1
)

:: Check if game files are extracted
set APPDIR=%~dp0..\resources\app
if not exist "%APPDIR%\meteor_extracted\packages" (
    echo [错误] 游戏文件尚未解包，请先运行 安装汉化.bat 或 更新后重新汉化.bat
    pause
    exit /b 1
)

echo ==========================================
echo  第 1 步：提取新增的未翻译内容...
echo ==========================================
echo.

python "%~dp0extract_all_missing.py"

echo.

:: Check if there are strings to translate
python -c "import json,os;d=json.load(open(os.path.join(r'%~dp0','待翻译汇总.json'),'r',encoding='utf-8'));c=len(d.get('cache',{}));h=len(d.get('hardcoded',{}));t=c+h;print(f'TOTAL={t}')" > "%TEMP%\paa_count.txt" 2>nul
set /p COUNTLINE=<"%TEMP%\paa_count.txt"
del "%TEMP%\paa_count.txt" 2>nul

:: Extract the number
for /f "tokens=2 delims==" %%a in ("%COUNTLINE%") do set TOTAL=%%a

if "%TOTAL%"=="0" (
    echo.
    echo  当前没有需要翻译的新增内容，所有文本均已翻译完毕。
    echo.
    pause
    exit /b 0
)

echo.
echo ==========================================
echo  第 2 步：请翻译新增内容
echo ==========================================
echo.
echo  发现 %TOTAL% 条新增未翻译内容。
echo.
echo  接下来会打开 待翻译汇总.json 文件。
echo.
echo  【翻译方法 - 推荐用 AI】
echo    1. 全选文件内容，复制
echo    2. 打开 ChatGPT / Claude / DeepSeek 等 AI
echo    3. 发送：请把以下 JSON 中的英文 value 翻译成简体中文，
echo       key 不要改，只改 value，保持 JSON 格式不变
echo    4. 把 AI 返回的结果粘贴覆盖回文件，保存
echo.
echo  【注意事项】
echo    - 不要修改 key（冒号左边的内容）
echo    - 已经是中文的条目不用管
echo    - 人名、游戏名等专有名词保持英文即可
echo    - 保存时确保文件编码为 UTF-8
echo.
echo  准备好后按任意键打开文件...
pause > nul

:: Open the file for editing
start "" notepad "%~dp0待翻译汇总.json"

echo.
echo  文件已打开。请翻译完成后保存并关闭记事本。
echo.
echo  翻译完成后，按任意键继续第 3 步...
pause > nul

echo.
echo ==========================================
echo  第 3 步：合并翻译并重新应用汉化
echo ==========================================
echo.

echo 正在合并翻译...
python "%~dp0merge_all_translations.py" "%~dp0待翻译汇总.json"

echo.
echo 正在重新应用汉化补丁...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0apply_patch.ps1" -Action install

echo.
echo ==========================================
echo  完成！请启动游戏检查翻译效果。
echo  如果有翻译不满意的地方，可以再次运行本脚本。
echo ==========================================
echo.
pause
