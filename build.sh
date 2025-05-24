#!/bin/bash

# 进入前端目录
cd frontend

# 安装依赖
npm install

# 构建项目
npm run build

# 回到根目录
cd ..

# 如果根目录已存在 dist，则删除
rm -rf dist

# 将前端构建文件移动到根目录
mv frontend/dist . 