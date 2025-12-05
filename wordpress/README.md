# WordPress DeepSeek API 集成

这个方案将 API Key 存储在 WordPress 数据库中，通过 WordPress 后端代理 API 调用，无需独立的服务器。

## 优势

✅ **无需独立服务器** - 直接使用 WordPress 后端  
✅ **API Key 安全存储** - 保存在 WordPress 数据库的 `wp_options` 表中  
✅ **简单配置** - 在 WordPress 后台设置即可  
✅ **自动 HTTPS** - 使用 WordPress 的 HTTPS 配置  
✅ **无需 CORS 配置** - 同域请求，无跨域问题  

## 安装步骤

### 1. 安装插件文件

将 `deepseek-api-proxy.php` 文件上传到 WordPress：

**方式 A: 作为插件安装（推荐）**

1. 将 `deepseek-api-proxy.php` 上传到 `/wp-content/plugins/deepseek-api-proxy/` 目录
2. 在 WordPress 后台 → 插件 → 启用 "DeepSeek API Proxy"

**方式 B: 添加到主题的 functions.php**

1. 打开你的主题的 `functions.php` 文件
2. 将 `deepseek-api-proxy.php` 的内容复制到 `functions.php` 末尾

### 2. 配置 API Key

1. 在 WordPress 后台，进入 **设置 → DeepSeek API**
2. 输入你的 DeepSeek API Key
3. 点击 "Save API Key"

### 3. 获取 API 端点 URL

在设置页面可以看到 API 端点 URL，通常是：
```
https://yourwordpress.com/wp-json/deepseek/v1/chat
```

### 4. 更新前端代码

在 `index1.html` 中找到这一行（约第 984 行）：

```javascript
const DEEPSEEK_API_PROXY = 'http://localhost:3000';
```

替换为你的 WordPress API 端点：

```javascript
const DEEPSEEK_API_PROXY = 'https://yourwordpress.com/wp-json/deepseek/v1/chat';
```

或者使用相对路径（如果 `index1.html` 和 WordPress 在同一域名）：

```javascript
const DEEPSEEK_API_PROXY = '/wp-json/deepseek/v1/chat';
```

### 5. 嵌入到 WordPress

将 `index1.html` 嵌入到 WordPress 页面中（使用 iframe 或直接嵌入 HTML）。

## 安全说明

### API Key 存储

- API Key 存储在 WordPress 数据库的 `wp_options` 表中
- 只有 WordPress 管理员可以访问和修改
- 不会暴露在前端代码中

### 权限控制

当前代码使用 `'permission_callback' => '__return_true'`，允许公开访问。

如果需要限制访问，可以修改为：

```php
'permission_callback' => function() {
    // 只允许登录用户访问
    return is_user_logged_in();
    
    // 或者只允许特定用户角色
    // return current_user_can('edit_posts');
},
```

### 速率限制（可选）

可以在 WordPress 中添加速率限制，防止滥用：

```php
// 在 deepseek_chat_handler 函数开头添加
$user_ip = $_SERVER['REMOTE_ADDR'];
$transient_key = 'deepseek_rate_limit_' . md5($user_ip);
$request_count = get_transient($transient_key);

if ($request_count && $request_count > 10) { // 限制每分钟 10 次
    return new WP_Error('rate_limit', 'Too many requests. Please wait a moment.', array('status' => 429));
}

set_transient($transient_key, ($request_count ? $request_count + 1 : 1), 60); // 60 秒过期
```

## 测试

### 1. 测试 API 端点

在浏览器中访问：
```
https://yourwordpress.com/wp-json/deepseek/v1/chat
```

应该看到错误信息（因为需要 POST 请求），但可以确认端点存在。

### 2. 使用 curl 测试

```bash
curl -X POST https://yourwordpress.com/wp-json/deepseek/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

### 3. 在前端测试

1. 确保 `index1.html` 中的 `DEEPSEEK_API_PROXY` 已更新
2. 在 WordPress 页面中嵌入 `index1.html`
3. 测试 DeepSeek 聊天功能

## 故障排除

### 问题：API 返回 500 错误

**可能原因**：
- API Key 未设置
- API Key 无效

**解决方案**：
1. 检查 WordPress 后台 → 设置 → DeepSeek API
2. 确认 API Key 已正确保存
3. 检查 WordPress 错误日志

### 问题：403 Forbidden

**可能原因**：
- REST API 被禁用
- 权限设置问题

**解决方案**：
1. 检查 WordPress REST API 是否启用
2. 访问 `https://yourwordpress.com/wp-json/` 确认 REST API 可用
3. 如果使用安全插件，检查是否阻止了 REST API

### 问题：CORS 错误

**可能原因**：
- 如果 `index1.html` 在不同域名，需要配置 CORS

**解决方案**：
在 `deepseek-api-proxy.php` 的 `deepseek_chat_handler` 函数开头添加：

```php
// Allow CORS (if needed)
header('Access-Control-Allow-Origin: *'); // 或指定域名
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
```

## 与独立后端方案对比

| 特性 | WordPress 方案 | 独立后端方案 |
|------|---------------|-------------|
| 部署复杂度 | ⭐ 简单 | ⭐⭐⭐ 需要单独部署 |
| 服务器成本 | ✅ 无额外成本 | ❌ 需要额外服务器 |
| API Key 安全 | ✅ WordPress 数据库 | ✅ 环境变量 |
| 维护 | ✅ WordPress 统一管理 | ❌ 需要单独维护 |
| 适用场景 | WordPress 网站 | 任何前端应用 |

## 注意事项

1. **备份 API Key**：建议在安全的地方备份 API Key
2. **定期检查余额**：定期检查 DeepSeek 账户余额
3. **监控使用**：可以通过 WordPress 日志监控 API 调用
4. **HTTPS**：确保 WordPress 网站使用 HTTPS

## 进阶功能

### 添加使用统计

可以在每次调用时记录统计信息：

```php
// 在 deepseek_chat_handler 函数中，成功响应后添加
$stats = get_option('deepseek_api_stats', array('calls' => 0, 'last_call' => ''));
$stats['calls']++;
$stats['last_call'] = current_time('mysql');
update_option('deepseek_api_stats', $stats);
```

### 添加日志记录

```php
// 记录每次 API 调用
$log_entry = array(
    'time' => current_time('mysql'),
    'ip' => $_SERVER['REMOTE_ADDR'],
    'message_length' => strlen($message),
    'status' => $status_code
);
// 保存到 WordPress 选项或自定义表
```

