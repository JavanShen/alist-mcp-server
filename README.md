# Alist MCP Server
通过 [Alist API](https://alist-v3.apifox.cn/) 实现的 [MCP server](https://modelcontextprotocol.io/introduction)

## 使用
你需要提供Alist地址和Token
#### 如何获取Token
按F12打开“调试”，选中“网络”，随意在左侧选择请求，找到携带 `Authorization` 参数的就可以
<img src="./image/token.png">
### Using npm
```JSON
{
  "mcpServers": {
    "alistApi": {
      "command": "npx",
      "args": ["-y", "alist-mcp-server"],
      "env": {
        "ALIST_HOST": "https://example.com",
        "ALIST_TOKEN": "your_token_here"
      }
    }
  }
}
```
