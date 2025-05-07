import { z } from "zod";
export const ReqApiFsListSchema = z.object({
  path: z.string().optional(),
  password: z.string().optional(),
  page: z.number().int().optional(),
  per_page: z.number().int().optional(),
  refresh: z.boolean().optional(),
});
export const ResApiFsListSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.object({
    content: z.array(
      z.object({
        name: z.string(),
        size: z.number().int(),
        is_dir: z.boolean(),
        modified: z.string(),
        sign: z.string(),
        thumb: z.string(),
        type: z.number().int(),
        created: z.string().optional(),
        hashinfo: z.string().optional(),
        hash_info: z.null().optional(),
      }),
    ),
    total: z.number().int(),
    readme: z.string(),
    write: z.boolean(),
    provider: z.string(),
    header: z.string(),
  }),
});

export const ReqApiFsGetSchema = z.object({
  path: z.string(),
  password: z.string(),
  page: z.number().int().optional(),
  per_page: z.number().int().optional(),
  refresh: z.boolean().optional(),
});
export const ResApiFsGetSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.object({
    name: z.string(),
    size: z.number().int(),
    is_dir: z.boolean(),
    modified: z.string(),
    sign: z.string(),
    thumb: z.string(),
    type: z.number().int(),
    raw_url: z.string(),
    readme: z.string(),
    provider: z.string(),
    related: z.null(),
    created: z.string(),
    hashinfo: z.string(),
    hash_info: z.null(),
    header: z.string(),
  }),
});

export const ReqApiFsDirsSchema = z.object({
  path: z.string().optional(),
  password: z.string().optional(),
  force_root: z.boolean().optional(),
});
export const ResApiFsDirsSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.array(z.object({ name: z.string(), modified: z.string() })),
});

export const ReqApiFsSearchSchema = z.object({
  parent: z.string(),
  keywords: z.string(),
  scope: z
    .number()
    .int()
    .gte(0)
    .lte(2)
    .describe("0-全部 1-文件夹 2-文件")
    .default(0),
  page: z.number().int(),
  per_page: z.number().int(),
  password: z.string(),
});
export const ResApiFsSearchSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.object({
    content: z.array(
      z.object({
        parent: z.string(),
        name: z.string(),
        is_dir: z.boolean(),
        size: z.number().int(),
        type: z.number().int(),
      }),
    ),
    total: z.number().int(),
  }),
});

export const ReqApiFsMkdirSchema = z.object({ path: z.string() });
export const ResApiFsMkdirSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.null(),
});

export const ReqApiFsRenameSchema = z.object({
  name: z.string(),
  path: z.string(),
});
export const ResApiFsRenameSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.null(),
});

export const ReqApiFsBatch_renameSchema = z.object({
  src_dir: z.string(),
  rename_objects: z.array(
    z.object({
      src_name: z.string().optional(),
      new_name: z.string().optional(),
    }),
  ),
});
export const ResApiFsBatch_renameSchema = z.object({
  code: z.number().int().describe("状态码"),
  message: z.string().describe("信息"),
  data: z.null(),
});

export const ReqApiFsRegex_renameSchema = z.object({
  src_dir: z.string(),
  src_name_regex: z.string(),
  new_name_regex: z.string(),
});
export const ResApiFsRegex_renameSchema = z.object({
  code: z.number().int().describe("状态码"),
  message: z.string().describe("信息"),
  data: z.null(),
});

export const ReqApiFsMoveSchema = z.object({
  src_dir: z.string(),
  dst_dir: z.string(),
  names: z.array(z.string()),
});
export const ResApiFsMoveSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.null(),
});

export const ReqApiFsRecursive_moveSchema = z.object({
  src_dir: z.string(),
  dst_dir: z.string(),
});
export const ResApiFsRecursive_moveSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.null(),
});

export const ReqApiFsCopySchema = z.object({
  src_dir: z.string(),
  dst_dir: z.string(),
  names: z.array(z.string()),
});
export const ResApiFsCopySchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.null(),
});

export const ReqApiFsRemoveSchema = z.object({
  names: z.array(z.string()),
  dir: z.string(),
});
export const ResApiFsRemoveSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.null(),
});

export const ReqApiFsRemove_empty_directorySchema = z.object({
  src_dir: z.string(),
});
export const ResApiFsRemove_empty_directorySchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.null(),
});

export const ReqApiFsAdd_offline_downloadSchema = z.object({
  urls: z.array(z.string()),
  path: z.string(),
  tool: z.string().describe("可选`aria2`,`SimpleHttp`和`qBittorrent`"),
  delete_policy: z
    .string()
    .describe(
      "可选`delete_on_upload_succeed`,`delete_on_upload_failed`,`delete_never`,`delete_always`",
    ),
});
export const ResApiFsAdd_offline_downloadSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.object({
    tasks: z.array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        state: z.number().int().optional(),
        status: z.string().optional(),
        progress: z.number().int().optional(),
        error: z.string().optional(),
      }),
    ),
  }),
});

export const ReqApiFsFormSchema = z.object({
  file: z.string().base64().describe("文件"),
});
export const ResApiFsFormSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  data: z.object({
    task: z.object({
      id: z.string(),
      name: z.string(),
      state: z.number().int(),
      status: z.string(),
      progress: z.number().int(),
      error: z.string(),
    }),
  }),
});
