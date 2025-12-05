# WordPress 快速设置指南

## 使用 WordPress 后端（推荐）⭐

**优点**：
- ✅ 无需独立服务器
- ✅ API Key 存储在 WordPress 数据库
- ✅ 配置简单，在 WordPress 后台设置
- ✅ 无额外成本
- ✅ 无需 CORS 配置

## 快速开始（3 步）

### 1. 安装插件

将 `wordpress/deepseek-api-proxy.php` 上传到：
```
/wp-content/plugins/deepseek-api-proxy/deepseek-api-proxy.php
```

然后在 WordPress 后台 → **插件** → 启用 "DeepSeek API Proxy"

### 2. 配置 API Key

WordPress 后台 → **设置 → DeepSeek API** → 输入你的 DeepSeek API Key → 保存

### 3. 更新前端代码

在 `index1.html` 中找到 `DEEPSEEK_API_PROXY`（约第 984 行），设置为：

**如果 `index1.html` 和 WordPress 在同一域名：**
```javascript
const DEEPSEEK_API_PROXY = '/wp-json/deepseek/v1/chat';
```

**如果不在同一域名，使用完整 URL：**
```javascript
const DEEPSEEK_API_PROXY = 'https://yourwordpress.com/wp-json/deepseek/v1/chat';
```

完成！现在用户可以直接使用，无需输入 API Key。

## 详细文档

- WordPress 插件详细说明：查看 `wordpress/README.md`
- 安全指南：查看 `SECURITY.md`

## 工作原理

```
用户浏览器
  ↓
index1.html (前端)
  ↓ (调用 WordPress REST API)
WordPress 后端 (PHP)
  ↓ (从数据库读取 API Key)
DeepSeek API
```

## 测试

1. 确保插件已启用
2. 确保 API Key 已配置
3. 在 WordPress 页面中嵌入 `index1.html`
4. 测试 DeepSeek 聊天功能

如果遇到问题，请查看 `wordpress/README.md` 中的故障排除部分。
