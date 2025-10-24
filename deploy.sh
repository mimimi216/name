#!/bin/bash

# 日语名字生成器部署脚本
echo "🌸 和风命名 - 日语名字生成器部署脚本 🌸"

# 检查Node.js版本
node_version=$(node -v)
echo "Node.js版本: $node_version"

# 构建应用
echo "📦 构建应用..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败！"
    exit 1
fi

# 启动生产服务器
echo "🚀 启动生产服务器..."
npm start

echo "🎉 部署完成！应用运行在 http://localhost:3000"