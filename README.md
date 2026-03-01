# Pixel Art Academy Learn Mode 简体中文汉化补丁

为 Steam 游戏 [Pixel Art Academy Learn Mode](https://store.steampowered.com/app/2672610/Pixel_Art_Academy_Learn_Mode/) 提供简体中文本地化支持。

## 安装要求

- **Python 3**：[下载地址](https://www.python.org/downloads/)（安装时勾选 "Add to PATH"）
- **Windows 系统**

## 快速开始

### 安装

1. 将 `汉化补丁` 文件夹放到游戏根目录下：
   ```
   Pixel Art Academy Learn Mode\
   ├── 汉化补丁\        ← 放在这里
   ├── resources\
   └── Pixel Art Academy Learn Mode.exe
   ```
2. 双击 **`安装汉化.bat`**，等待完成即可

### 卸载

双击 **`卸载汉化.bat`**，恢复英文原版

### 游戏更新后

双击 **`更新后重新汉化.bat`**，会自动重新解包并应用汉化

### 游戏更新后有新增英文？

如果更新后发现部分界面变回了英文，双击 **`补充翻译.bat`**，按提示操作即可：

1. 脚本会自动提取新增的未翻译内容
2. 自动打开待翻译文件 → 复制到 AI（ChatGPT / Claude / DeepSeek）翻译
3. 粘贴回来保存 → 脚本自动合并并重新应用汉化

## 翻译进度

| 类型 | 说明 | 状态 |
|---|---|---|
| 翻译系统 (cache.json) | 游戏内置 Babel 翻译框架的条目 | `translations_zh.json` |
| 硬编码字符串 (JS源码) | 直接写在模板/类方法里的文本 | `hardcoded_zh.json` |

- `to_translate.json` — cache.json 中剩余待翻译的条目
- `hardcoded_to_translate.json` — JS 硬编码中待翻译的条目

## 参与翻译

### 推荐：一次性补全所有未翻译（避免遗漏）

游戏更新或想查漏补缺时，用下面流程可**一次性拿到所有未翻译条目**，翻译完再合并，避免东一处西一处漏翻：

1. **确保已安装过汉化**（至少运行过一次「安装汉化.bat」或「更新后重新汉化.bat」，保证已解包）
2. 在 `汉化补丁` 目录下执行：
   ```
   python extract_all_missing.py
   ```
   会生成 **`待翻译汇总.json`**，其中包含：
   - `cache`：来自 cache 的未翻译条目
   - `hardcoded`：来自 JS 硬编码的未翻译条目
3. 打开 `待翻译汇总.json`，把里面的英文 value 全部翻译成中文，**另存为 `待翻译汇总_zh.json`**（格式不变，key 不动，只改 value）
4. 合并回正式翻译文件：
   ```
   python merge_all_translations.py 待翻译汇总_zh.json
   ```
5. 双击 **`安装汉化.bat`** 重新应用汉化

这样 cache 和硬编码的未翻译会集中在一个文件里，翻译一次即可同步到 `translations_zh.json` 和 `hardcoded_zh.json`，不易遗漏。

---

### 翻译 cache.json 条目

1. 打开 `to_translate.json`，格式为：
   ```json
   {
     "Namespace|||key": "English text",
     ...
   }
   ```
2. 将英文 value 翻译为中文，保持 key 不变，另存为新文件（如 `my_trans.json`）
3. 运行合并：
   ```
   python merge_translations.py my_trans.json
   ```
4. 双击 `安装汉化.bat` 应用

### 翻译硬编码字符串

1. 打开 `hardcoded_to_translate.json`，格式同上
2. 翻译后保存为 **`hardcoded_zh.json`**（key 不变，value 改中文）
3. 双击 `安装汉化.bat` 应用

### 注意事项

- JSON value 中不能出现未转义的 `"` 双引号，用 `「」` 替代
- 多行文本用 `\n` 表示换行
- `merge_translations.py` 可多次运行，只会追加/更新，不会覆盖已有翻译

## 游戏更新后补充翻译

```bash
# 1. 重新应用汉化（双击 更新后重新汉化.bat 或手动运行）

# 2. 检查是否有新增字符串
python extract_strings.py          # cache.json 新增
python extract_hardcoded.py        # JS 硬编码新增

# 3. 翻译 to_translate.json / hardcoded_to_translate.json 中的新内容

# 4. 合并并重新安装
python merge_translations.py my_new_trans.json
# 安装汉化.bat
```

## 技术原理

本补丁采用零重编译方案，不修改游戏可执行文件：

1. **解包 asar**：用 Python 解包 Electron 的 `app.asar` 和 `meteor.asar`
2. **重定向加载**：修改 `package.json` 和 `app.js`，让 Electron 加载解包后的文件
3. **注入翻译**：将中文翻译写入 Meteor 的 Babel 翻译缓存 (`cache.json`)
4. **替换硬编码**：在 JS 源码中直接替换写死的英文字符串
5. **替换字体**：将 CSS 中的西文像素字体替换为 [Fusion Pixel](https://github.com/TakWolf/fusion-pixel-font) 中文像素字体

所有修改均可通过 `卸载汉化.bat` 一键还原。

## 文件说明

```
汉化补丁/
├── 安装汉化.bat              # 一键安装
├── 卸载汉化.bat              # 一键卸载
├── 更新后重新汉化.bat        # 游戏更新后重新应用
├── apply_patch.ps1           # 核心安装脚本
├── translations_zh.json      # 已翻译条目（cache.json 类型）
├── hardcoded_zh.json         # 已翻译条目（硬编码类型，需手动创建）
├── to_translate.json         # 待翻译（cache.json 类型）
├── hardcoded_to_translate.json # 待翻译（硬编码类型）
├── 待翻译汇总.json           # 一键提取生成，含 cache+硬编码全部未翻译
├── 待翻译汇总_zh.json        # 翻译后合并用（可选）
├── extract_asar.py           # asar 解包工具
├── extract_strings.py        # 提取 cache.json 待翻译字符串
├── extract_hardcoded.py      # 提取 JS 硬编码待翻译字符串
├── extract_all_missing.py    # 一键提取所有未翻译 → 待翻译汇总.json
├── merge_all_translations.py # 将 待翻译汇总_zh.json 合并回两个 zh 文件
├── inject_translations.py    # 注入翻译到 cache.json
├── patch_hardcoded.py        # 替换 JS 硬编码字符串
├── merge_translations.py     # 合并单文件到 translations_zh.json
└── fonts/
    ├── fp8.ttf               # Fusion Pixel 8px
    ├── fp10.ttf              # Fusion Pixel 10px
    └── fp12.ttf              # Fusion Pixel 12px
```

## 致谢

- [Pixel Art Academy](https://pixelart.academy/) by Retronator
- [Fusion Pixel Font](https://github.com/TakWolf/fusion-pixel-font) by TakWolf
- [Pixel-Art-Academy-CN](https://github.com/Arch-AIk/Pixel-Art-Academy-CN) 参考了其中文字体方案
