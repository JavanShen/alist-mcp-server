#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
//imports_start
import {
  ReqApiFsListSchema,
  ReqApiFsGetSchema,
  ReqApiFsDirsSchema,
  ReqApiFsSearchSchema,
  ReqApiFsMkdirSchema,
  ReqApiFsRenameSchema,
  ReqApiFsBatch_renameSchema,
  ReqApiFsRegex_renameSchema,
  ReqApiFsMoveSchema,
  ReqApiFsRecursive_moveSchema,
  ReqApiFsCopySchema,
  ReqApiFsRemoveSchema,
  ReqApiFsRemove_empty_directorySchema,
  ReqApiFsAdd_offline_downloadSchema,
  ReqApiFsFormSchema,
} from "./types/fs.js";
import {
  apiFsList,
  apiFsGet,
  apiFsDirs,
  apiFsSearch,
  apiFsMkdir,
  apiFsRename,
  apiFsBatch_rename,
  apiFsRegex_rename,
  apiFsMove,
  apiFsRecursive_move,
  apiFsCopy,
  apiFsRemove,
  apiFsRemove_empty_directory,
  apiFsAdd_offline_download,
  apiFsForm,
} from "./requests/fs.js"; //imports_end

const server = new McpServer({
  name: "alist-mcp-server",
  version: "0.0.1",
  capabilities: {
    resources: {},
    tools: {},
  },
});

//mcp_tools_start
server.tool("fsList", "列出文件目录", ReqApiFsListSchema.shape, async (opt) => {
  const info = await apiFsList(opt);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info?.data || info, null, 2),
      },
    ],
  };
});

server.tool(
  "fsGet",
  "获取某个文件/目录信息",
  ReqApiFsGetSchema.shape,
  async (opt) => {
    const info = await apiFsGet(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool("fsDirs", "获取目录", ReqApiFsDirsSchema.shape, async (opt) => {
  const info = await apiFsDirs(opt);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info?.data || info, null, 2),
      },
    ],
  };
});

server.tool(
  "fsSearch",
  "搜索文件或文件夹",
  ReqApiFsSearchSchema.shape,
  async (opt) => {
    const info = await apiFsSearch(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool("fsMkdir", "新建文件夹", ReqApiFsMkdirSchema.shape, async (opt) => {
  const info = await apiFsMkdir(opt);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info?.data || info, null, 2),
      },
    ],
  };
});

server.tool(
  "fsRename",
  "重命名文件",
  ReqApiFsRenameSchema.shape,
  async (opt) => {
    const info = await apiFsRename(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "fsBatch_rename",
  "批量重命名",
  ReqApiFsBatch_renameSchema.shape,
  async (opt) => {
    const info = await apiFsBatch_rename(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "fsRegex_rename",
  "正则重命名",
  ReqApiFsRegex_renameSchema.shape,
  async (opt) => {
    const info = await apiFsRegex_rename(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool("fsMove", "移动文件", ReqApiFsMoveSchema.shape, async (opt) => {
  const info = await apiFsMove(opt);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info?.data || info, null, 2),
      },
    ],
  };
});

server.tool(
  "fsRecursive_move",
  "聚合移动",
  ReqApiFsRecursive_moveSchema.shape,
  async (opt) => {
    const info = await apiFsRecursive_move(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool("fsCopy", "复制文件", ReqApiFsCopySchema.shape, async (opt) => {
  const info = await apiFsCopy(opt);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info?.data || info, null, 2),
      },
    ],
  };
});

server.tool(
  "fsRemove",
  "删除文件或文件夹",
  ReqApiFsRemoveSchema.shape,
  async (opt) => {
    const info = await apiFsRemove(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "fsRemove_empty_directory",
  "删除空文件夹",
  ReqApiFsRemove_empty_directorySchema.shape,
  async (opt) => {
    const info = await apiFsRemove_empty_directory(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "fsAdd_offline_download",
  "添加离线下载",
  ReqApiFsAdd_offline_downloadSchema.shape,
  async (opt) => {
    const info = await apiFsAdd_offline_download(opt);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(info?.data || info, null, 2),
        },
      ],
    };
  },
);

server.tool("fsForm", "表单上传文件", ReqApiFsFormSchema.shape, async (opt) => {
  const info = await apiFsForm(opt);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(info?.data || info, null, 2),
      },
    ],
  };
}); //mcp_tools_end

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Alist MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error in main():", err);
  process.exit(1);
});
