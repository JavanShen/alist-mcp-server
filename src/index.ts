#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getUserInfo } from "./requests/auth.js";
import {
  listFiles,
  ListFilesSchema,
  getPathInfo,
  GetPathInfoSchema,
  search,
  SearchSchema,
  mkdir,
  MkdirSchema,
} from "./requests/fs.js";

const server = new McpServer({
  name: "alist-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool("getUserInfo", "获取当前用户信息", {}, async () => {
  const info = await getUserInfo();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info, null, 2),
      },
    ],
  };
});

server.tool("listFiles", "列出文件目录", ListFilesSchema.shape, async (opt) => {
  const files = await listFiles(opt);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(files, null, 2),
      },
    ],
  };
});

server.tool(
  "getPathInfo",
  "获取文件或目录信息",
  GetPathInfoSchema.shape,
  async (opt) => {
    const info = await getPathInfo(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "searchFiles",
  "搜索文件或文件夹",
  SearchSchema.shape,
  async (opt) => {
    const res = await search(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(res, null, 2),
        },
      ],
    };
  },
);

server.tool("mkdir", "创建目录", MkdirSchema.shape, async (opt) => {
  await mkdir(opt);

  return {
    content: [
      {
        type: "text",
        text: "创建目录成功",
      },
    ],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Alist MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error in main():", err);
  process.exit(1);
});
