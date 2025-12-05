# 在 Hostinger 上安装 DeepSeek API Proxy 插件

## 方法 1: 通过 WordPress 后台上传（推荐）⭐

这是最简单的方法，不需要使用 FTP。

### 步骤：

1. **登录 WordPress 后台**
   - 访问 `https://yourdomain.com/wp-admin`
   - 使用管理员账号登录

2. **进入插件页面**
   - 在左侧菜单找到 **插件 (Plugins)**
   - 点击 **添加新插件 (Add New)**

3. **上传插件文件**
   - 点击页面顶部的 **上传插件 (Upload Plugin)** 按钮
   - 点击 **选择文件 (Choose File)** 按钮
   - 选择 `deepseek-api-proxy.php` 文件
   - 点击 **立即安装 (Install Now)**

4. **激活插件**
   - 安装完成后，点击 **激活插件 (Activate Plugin)**

5. **配置 API Key**
   - 在左侧菜单找到 **设置 (Settings)**
   - 点击 **DeepSeek API**
   - 输入你的 DeepSeek API Key
   - 点击 **Save API Key**

完成！

---

## 方法 2: 通过 Hostinger 文件管理器

如果方法 1 不工作，可以使用 Hostinger 的文件管理器。

### 步骤：

1. **登录 Hostinger 控制面板 (hPanel)**
   - 访问 https://www.hostinger.com
   - 登录你的账户
   - 进入 **网站 (Websites)** 或 **托管 (Hosting)**

2. **打开文件管理器**
   - 找到你的 WordPress 网站
   - 点击 **文件管理器 (File Manager)** 或 **管理 (Manage)**
   - 或者点击 **FTP 文件管理器 (FTP File Manager)**

3. **导航到插件目录**
   - 在文件管理器中，进入以下路径：
     ```
     public_html/wp-content/plugins/
     ```
   - 如果 WordPress 安装在子目录，路径可能是：
     ```
     public_html/your-wordpress-folder/wp-content/plugins/
     ```

4. **创建插件文件夹**
   - 在 `plugins` 目录中，点击 **新建文件夹 (New Folder)** 或 **创建文件夹 (Create Folder)**
   - 命名为：`deepseek-api-proxy`
   - 点击创建

5. **上传插件文件**
   - 进入刚创建的 `deepseek-api-proxy` 文件夹
   - 点击 **上传 (Upload)** 或 **上传文件 (Upload Files)**
   - 选择 `deepseek-api-proxy.php` 文件
   - 等待上传完成

6. **在 WordPress 后台激活**
   - 登录 WordPress 后台
   - 进入 **插件 (Plugins)** 页面
   - 找到 **DeepSeek API Proxy** 插件
   - 点击 **激活 (Activate)**

7. **配置 API Key**
   - 在左侧菜单找到 **设置 (Settings)**
   - 点击 **DeepSeek API**
   - 输入你的 DeepSeek API Key
   - 点击 **Save API Key**

完成！

---

## 方法 3: 通过 FTP 客户端（高级用户）

如果你熟悉 FTP，可以使用 FileZilla 等 FTP 客户端。

### 步骤：

1. **获取 FTP 信息**
   - 在 Hostinger hPanel 中，找到 **FTP 账户 (FTP Accounts)**
   - 记录 FTP 主机、用户名和密码
   - 或者创建新的 FTP 账户

2. **连接 FTP**
   - 使用 FileZilla 或其他 FTP 客户端
   - 输入 FTP 信息连接

3. **上传文件**
   - 导航到：`public_html/wp-content/plugins/`
   - 创建文件夹：`deepseek-api-proxy`
   - 上传 `deepseek-api-proxy.php` 到该文件夹

4. **激活插件**
   - 在 WordPress 后台激活插件
   - 配置 API Key

---

## 验证安装

安装完成后，可以通过以下方式验证：

1. **检查插件列表**
   - WordPress 后台 → **插件 (Plugins)**
   - 应该能看到 **DeepSeek API Proxy** 插件

2. **检查设置页面**
   - WordPress 后台 → **设置 (Settings) → DeepSeek API**
   - 应该能看到 API Key 配置页面

3. **测试 API 端点**
   - 在浏览器访问：
     ```
     https://yourdomain.com/wp-json/deepseek/v1/chat
     ```
   - 应该看到错误信息（因为需要 POST 请求），但可以确认端点存在

---

## 常见问题

### Q: 上传文件时提示"文件太大"？

**A:** 检查文件大小。`deepseek-api-proxy.php` 应该很小（< 10KB）。如果还是有问题，使用方法 2 或 3。

### Q: 找不到插件目录？

**A:** 在 Hostinger 文件管理器中：
- 默认路径：`public_html/wp-content/plugins/`
- 如果 WordPress 在子目录：`public_html/wordpress/wp-content/plugins/`
- 如果使用子域名：`public_html/subdomain/wp-content/plugins/`

### Q: 插件上传后看不到？

**A:** 检查：
1. 文件是否在正确的目录：`wp-content/plugins/deepseek-api-proxy/`
2. 文件名是否正确：`deepseek-api-proxy.php`
3. 刷新 WordPress 后台的插件页面

### Q: 无法激活插件？

**A:** 检查：
1. PHP 版本是否兼容（需要 PHP 7.0+）
2. 查看 WordPress 错误日志
3. 检查文件权限（应该是 644）

### Q: 设置页面找不到？

**A:** 确保：
1. 插件已激活
2. 你有管理员权限
3. 刷新浏览器缓存

---

## 文件结构

安装后，文件结构应该是：

```
public_html/
└── wp-content/
    └── plugins/
        └── deepseek-api-proxy/
            └── deepseek-api-proxy.php
```

---

## 下一步

安装并配置完成后：

1. 更新 `index1.html` 中的 `DEEPSEEK_API_PROXY`
2. 将 `index1.html` 嵌入到 WordPress 页面
3. 测试 DeepSeek 聊天功能

详细说明请查看 `README.md` 和 `WORDPRESS_SETUP.md`。

