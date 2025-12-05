# 安全指南：API Key 管理

## 重要安全原则

⚠️ **永远不要**在前端代码中硬编码 API Key
⚠️ **永远不要**将 API Key 提交到 Git 仓库
⚠️ **永远不要**在客户端 JavaScript 中暴露 API Key

## 当前实现

本项目使用**WordPress 后端代理**来保护 DeepSeek API Key：

### 架构

```
用户浏览器 → 前端 (index1.html) → WordPress REST API → DeepSeek API
```

- ✅ API Key 只保存在 WordPress 数据库的 `wp_options` 表中
- ✅ 前端代码不包含任何 API Key
- ✅ 只有 WordPress 管理员可以访问和修改 API Key
- ✅ 使用 WordPress 的权限系统保护

## 设置步骤

### 1. 安装 WordPress 插件

将 `wordpress/deepseek-api-proxy.php` 上传到：
```
/wp-content/plugins/deepseek-api-proxy/deepseek-api-proxy.php
```

然后在 WordPress 后台启用插件。

### 2. 配置 API Key

1. 在 WordPress 后台，进入 **设置 → DeepSeek API**
2. 输入你的 DeepSeek API Key
3. 点击 "Save API Key"

API Key 将安全地存储在 WordPress 数据库的 `wp_options` 表中。

### 3. 更新前端配置

在 `index1.html` 中找到这一行（约第 984 行）：

```javascript
const DEEPSEEK_API_PROXY = '/wp-json/deepseek/v1/chat';
```

如果 `index1.html` 和 WordPress 在同一域名，使用相对路径：
```javascript
const DEEPSEEK_API_PROXY = '/wp-json/deepseek/v1/chat';
```

如果不在同一域名，使用完整 URL：
```javascript
const DEEPSEEK_API_PROXY = 'https://yourwordpress.com/wp-json/deepseek/v1/chat';
```

## 安全检查清单

- [ ] API Key 已从所有前端代码中移除
- [ ] API Key 已保存在 WordPress 数据库（通过插件设置页面）
- [ ] WordPress 插件已安装并启用
- [ ] `index1.html` 中的 `DEEPSEEK_API_PROXY` 已更新为 WordPress REST API 端点
- [ ] WordPress 网站使用 HTTPS（生产环境）
- [ ] 已测试 API 调用是否正常工作
- [ ] 只有管理员可以访问 API Key 设置页面

## 常见问题

### Q: 为什么不能直接在前端调用 DeepSeek API？

A: 如果在前端直接调用，API Key 会暴露在浏览器中，任何人都可以通过查看源代码或网络请求获取你的 API Key，然后滥用你的账户。

### Q: WordPress 方案安全吗？

A: 是的。API Key 存储在 WordPress 数据库中，只有管理员可以访问。WordPress 使用加密和权限系统保护敏感数据。

### Q: 如何防止 API 被滥用？

A: 可以在 WordPress 插件中添加：
- 速率限制（rate limiting）
- 用户权限检查
- IP 白名单
- 请求频率监控

### Q: 如何备份 API Key？

A: API Key 存储在 WordPress 数据库中，WordPress 的常规备份会自动包含它。你也可以在安全的地方手动记录。

## 额外安全建议

1. **定期备份**：定期备份 WordPress 数据库
2. **启用 HTTPS**：生产环境必须使用 HTTPS
3. **限制管理员权限**：只给信任的用户管理员权限
4. **监控使用情况**：定期检查 DeepSeek API 使用情况
5. **定期轮换 API Key**：如果怀疑泄露，立即更换
6. **使用安全插件**：考虑使用 WordPress 安全插件加强保护

## WordPress 数据库存储

API Key 存储在：
- **表名**：`wp_options`（或你的自定义前缀）
- **选项名**：`deepseek_api_key`
- **访问权限**：只有 WordPress 管理员可以通过后台设置页面访问

## 权限控制

当前插件使用 WordPress 的 `manage_options` 权限，只有管理员可以：
- 查看 API Key 设置页面
- 修改 API Key

如果需要更严格的权限控制，可以修改插件代码中的权限检查。
