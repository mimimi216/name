@echo off
echo 🌸 和风命名 - 日语名字生成器部署脚本 🌸

REM 检查Node.js版本
for /f "tokens=*" %%i in ('node -v') do set node_version=%%i
echo Node.js版本: %node_version%

REM 构建应用
echo 📦 构建应用...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ 构建成功！
) else (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

REM 启动生产服务器
echo 🚀 启动生产服务器...
call npm start

echo 🎉 部署完成！应用运行在 http://localhost:3000
pause