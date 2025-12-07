# Wix 集成指南：DeepSeek API Key 存储

## 概述

由于 `index.html` 需要嵌入到 Wix 网站中，我们需要使用 **Wix HTTP Functions** 和 **Wix Secrets Manager** 来安全地存储和调用 DeepSeek API Key。

## 方案架构

```
用户浏览器
  ↓
index.html (嵌入在 Wix 页面中)
  ↓ (调用 Wix HTTP Function)
Wix HTTP Function (后端)
  ↓ (从 Wix Secrets Manager 读取 API Key)
DeepSeek API
```

## 优势

✅ **API Key 安全存储** - 保存在 Wix Secrets Manager 中，前端无法访问  
✅ **无需独立服务器** - 直接使用 Wix 的后端服务  
✅ **简单配置** - 在 Wix 后台设置即可  
✅ **自动 HTTPS** - 使用 Wix 的 HTTPS 配置  
✅ **无需 CORS 配置** - 同域请求，无跨域问题  

## 设置步骤

### 1. 创建后端代码（Web Module 或 HTTP Function）

根据你的 Wix Studio 界面，我看到你已经有了 `deepseek-chat.js` 文件。你可以：

**选项 A：使用现有的 Web Module（推荐）**
如果你已经有了 `deepseek-chat.js` 文件：
1. 点击该文件打开编辑器
2. 将以下代码复制到文件中（替换现有内容）：

**选项 B：创建新的 Web Module**
如果还没有创建文件：
1. 在 "Backend & Public" 面板中，点击 **Backend** 旁边的 **+** 图标
2. 从下拉菜单中选择 **"JS Add web module"**（带 "NEW" 标记的选项）
3. 命名为 `deepseek-chat`
4. 将以下代码复制到文件中：

**代码内容（Web Module 版本）**：

```javascript
import { fetch } from 'wix-fetch';
import { secrets } from 'wix-secrets-backend';

// 注意：如果上面的导入报错，尝试以下备选方案：
// 方案 1: 使用默认导出
// import secrets from 'wix-secrets-backend';
// 
// 方案 2: 使用命名空间导入
// import * as secrets from 'wix-secrets-backend';

export async function deepseekChat(message) {
  try {
    // 从 Wix Secrets Manager 获取 API Key
    const apiKey = await secrets.getSecret('DEEPSEEK_API_KEY');
    
    if (!apiKey) {
      throw new Error('API Key not configured. Please set DEEPSEEK_API_KEY in Wix Secrets Manager.');
    }
    
    if (!message) {
      throw new Error('Message is required.');
    }
    
    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'DeepSeek API error');
    }
    
    // 返回 DeepSeek 的响应
    return {
      content: data.choices[0].message.content
    };
    
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw error;
  }
}
```

**代码内容（HTTP Function 版本）**：

如果你选择创建 HTTP Function 而不是 Web Module，使用以下代码：

```javascript
import { fetch } from 'wix-fetch';
import { secrets } from 'wix-secrets-backend';

// 注意：如果上面的导入报错，尝试以下备选方案：
// 方案 1: 使用默认导出
// import secrets from 'wix-secrets-backend';
// 
// 方案 2: 使用命名空间导入
// import * as secrets from 'wix-secrets-backend';

export async function post_deepseekChat(request) {
  try {
    // 从 Wix Secrets Manager 获取 API Key
    const apiKey = await secrets.getSecret('DEEPSEEK_API_KEY');
    
    if (!apiKey) {
      return {
        status: 500,
        body: {
          error: {
            message: 'API Key not configured. Please set DEEPSEEK_API_KEY in Wix Secrets Manager.'
          }
        }
      };
    }
    
    const { message } = await request.body.json();
    
    if (!message) {
      return {
        status: 400,
        body: {
          error: {
            message: 'Message is required.'
          }
        }
      };
    }
    
    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        status: response.status,
        body: {
          error: data.error || { message: 'DeepSeek API error' }
        }
      };
    }
    
    // 返回 DeepSeek 的响应
    return {
      status: 200,
      body: {
        content: data.choices[0].message.content
      }
    };
    
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    return {
      status: 500,
      body: {
        error: {
          message: error.message || 'Internal server error'
        }
      }
    };
  }
}
```
```

5. 点击 **Save**（保存）保存文件

**注意**：如果你使用的是 Web Module（不是 HTTP Function），你还需要在页面前端代码中调用这个模块。详见步骤 4。

### 2. 配置 Wix Secrets Manager（存储 API Key）

**重要**：API Key 必须存储在 **Secrets Manager** 中，不要直接写在代码文件里！

在 Wix Studio 中添加 API Key 的步骤：

**方法 1：通过左侧导航栏**
1. 在 Wix Studio 左侧导航栏，找到并点击 **Settings**（设置）图标（齿轮图标 ⚙️）
2. 在设置菜单中，找到 **Secrets Manager**（密钥管理器）
3. 点击 **+ New Secret** 或 **添加密钥**
4. 输入以下信息：
   - **Secret Name（密钥名称）**: `DEEPSEEK_API_KEY`
   - **Secret Value（密钥值）**: 你的 DeepSeek API Key（从 https://platform.deepseek.com/ 获取）
5. 点击 **Save**（保存）

**方法 2：通过开发者工具**
1. 在 Wix Studio 左侧导航栏，点击 **开发者工具**（Developer Tools）图标
2. 在开发者工具中，选择 **Secrets Manager**
3. 按照上述步骤 3-5 添加密钥

**验证**：添加成功后，你应该能在 Secrets Manager 列表中看到 `DEEPSEEK_API_KEY`，但不会显示密钥的实际值（出于安全考虑）。

### 3. 获取后端代码的调用 URL

**如果你使用的是 HTTP Function：**
1. 在 Wix Studio 中，进入 **Backend** → **Functions**
2. 找到 `deepseek-chat` 函数
3. 点击函数名称，查看详细信息
4. 复制 **Function URL**，格式类似：
   ```
   https://your-wix-site.com/_functions/deepseek-chat
   ```

**如果你使用的是 Web Module：**
1. Web Module 需要通过页面前端代码调用
2. 在页面代码中导入模块：`import { deepseekChat } from 'backend/deepseek-chat';`
3. 调用方式：`const result = await deepseekChat(message);`
4. 但这种方式需要修改 `index.html` 的调用方式，或者创建一个 HTTP Function 来包装 Web Module

**推荐方案**：如果你已经有了 `deepseek-chat.js` 文件，建议：
- 如果它是 Web Module，可以继续使用，但需要在前端页面代码中调用
- 或者创建一个 HTTP Function 来调用这个 Web Module，这样 `index.html` 就可以直接通过 HTTP 请求调用

### 4. 更新前端代码

**情况 A：如果你使用的是 HTTP Function**

在 `script.js` 中找到这一行（约第 600 行）：

```javascript
const DEEPSEEK_API_PROXY = 'https://your-wix-site.com/_functions/deepseek-chat';
```

替换为你的实际 Wix HTTP Function URL：

```javascript
const DEEPSEEK_API_PROXY = 'https://your-wix-site.com/_functions/deepseek-chat';
```

**注意**：如果你的 `index.html` 和 Wix 网站在同一域名下，可以使用相对路径：

```javascript
const DEEPSEEK_API_PROXY = '/_functions/deepseek-chat';
```

**情况 B：如果你使用的是 Web Module**

如果你使用的是 Web Module，需要创建一个 HTTP Function 来包装它，或者修改调用方式。推荐创建一个 HTTP Function：

1. 在 "Backend & Public" 中，点击 **Backend** 旁边的 **+** 图标
2. 选择 **"JS Expose site API"** 或创建新的 HTTP Function
3. 在 HTTP Function 中导入并调用 Web Module：

```javascript
import { deepseekChat } from 'backend/deepseek-chat';

export async function post_deepseekChat(request) {
  try {
    const { message } = await request.body.json();
    const result = await deepseekChat(message);
    return {
      status: 200,
      body: result
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: { message: error.message } }
    };
  }
}
```

然后使用 HTTP Function 的 URL 更新 `script.js`。

### 5. 部署和测试

1. 在 Wix 后台，点击 **Publish** 发布网站
2. 确保 HTTP Function 已部署
3. 在 Wix 页面中嵌入 `index.html`（使用 iframe 或 HTML 元素）
4. 测试 DeepSeek 聊天功能

## 安全检查清单

- [ ] API Key 已保存在 Wix Secrets Manager 中
- [ ] HTTP Function 已创建并部署
- [ ] `script.js` 中的 `DEEPSEEK_API_PROXY` 已更新为正确的 URL
- [ ] Wix 网站使用 HTTPS（生产环境）
- [ ] 已测试 API 调用是否正常工作
- [ ] 只有管理员可以访问 Secrets Manager

## 常见问题

### Q: 为什么不能直接在前端调用 DeepSeek API？

A: 如果在前端直接调用，API Key 会暴露在浏览器中，任何人都可以查看和使用你的 API Key，导致：
- 安全风险：API Key 泄露
- 费用风险：他人可能滥用你的 API Key，产生高额费用
- 违反服务条款：大多数 API 服务禁止在前端暴露 API Key

### Q: Wix HTTP Functions 有费用吗？

A: Wix 的 HTTP Functions 在免费计划中有一定的调用限制，但通常足够个人或小型项目使用。请查看 Wix 的定价页面了解详细信息。

### Q: 如何调试 HTTP Function？

A: 在 Wix 后台的 **Backend** → **Functions** 中，点击函数名称可以查看：
- 函数日志
- 调用历史
- 错误信息

### Q: 如果 API Key 需要更新怎么办？

A: 在 Wix 后台的 **Settings** → **Secrets Manager** 中，找到 `DEEPSEEK_API_KEY`，点击 **Edit**，更新 Secret Value，然后保存。无需重新部署 HTTP Function。

### Q: 导入 `wix-secrets-backend` 时出现错误怎么办？

A: 如果遇到导入错误（如 `'Secret' is a type` 或 `has no exported member named 'secrets'`），请尝试以下方法：

1. **确认 Wix Studio 版本**：确保你使用的是最新版本的 Wix Studio
2. **尝试不同的导入方式**：
   ```javascript
   // 方式 1: 命名导入（推荐）
   import { secrets } from 'wix-secrets-backend';
   
   // 方式 2: 默认导入
   import secrets from 'wix-secrets-backend';
   
   // 方式 3: 命名空间导入
   import * as secrets from 'wix-secrets-backend';
   ```
3. **检查模块是否已安装**：在 Wix Studio 中，确保 `wix-secrets-backend` 模块可用
4. **查看 Wix 官方文档**：访问 [Wix Secrets Manager 文档](https://dev.wix.com/docs/rest/api-reference/wix-secrets-backend) 获取最新 API 信息

如果以上方法都不行，可以尝试直接在代码中使用环境变量（如果 Wix 支持），或者联系 Wix 技术支持。

## 替代方案

如果你不想使用 Wix HTTP Functions，也可以：

1. **使用外部后端服务**（如 WordPress、Node.js 服务器等）
2. **使用 Wix 数据库存储 API Key**（不推荐，安全性较低）

但推荐使用 Wix HTTP Functions + Secrets Manager，这是最安全和便捷的方案。

## 参考文档

- [Wix HTTP Functions 文档](https://dev.wix.com/docs/rest/api-reference/wix-http-functions)
- [Wix Secrets Manager 文档](https://dev.wix.com/docs/rest/api-reference/wix-secrets-backend)
- [DeepSeek API 文档](https://platform.deepseek.com/api-docs/)

