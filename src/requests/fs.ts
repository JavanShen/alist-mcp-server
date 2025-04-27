import { z } from "zod";
import { request } from "../utils/request.js";
import {
  AlistFilesSchema,
  PathInfoSchema,
  SearchResSchema,
} from "../types/fs.js";

export const ListFilesSchema = z.object({
  page: z.union([z.number(), z.null()]).optional(),
  password: z.union([z.null(), z.string()]).optional(),
  path: z.union([z.null(), z.string()]).optional(),
  per_page: z.union([z.number(), z.null()]).optional(),
  refresh: z.union([z.boolean(), z.null()]).optional(),
});
export type ListFilesOption = z.infer<typeof ListFilesSchema>;
export const listFiles = async (opt: ListFilesOption) => {
  const res = await request({
    method: "POST",
    url: "/api/fs/list",
    data: opt,
  });
  return AlistFilesSchema.parse(res);
};

export const GetPathInfoSchema = z.object({
  page: z.union([z.number(), z.null()]).optional(),
  password: z.string(),
  path: z.string(),
  per_page: z.union([z.number(), z.null()]).optional(),
  refresh: z.union([z.boolean(), z.null()]).optional(),
});
export type GetPathInfoOption = z.infer<typeof GetPathInfoSchema>;
export const getPathInfo = async (opt: GetPathInfoOption) => {
  const res = await request({
    method: "POST",
    url: "/api/fs/get",
    data: opt,
  });
  return PathInfoSchema.parse(res);
};

export const SearchSchema = z.object({
  keywords: z.string(),
  page: z.number(),
  parent: z.string().describe("搜索路径"),
  password: z.string(),
  per_page: z.number(),
  scope: z.number().describe("0-全部 1-文件夹 2-文件 默认值：0"),
});
export type SearchOption = z.infer<typeof SearchSchema>;
export const search = async (opt: SearchOption) => {
  const res = await request({
    method: "POST",
    url: "/api/fs/search",
    data: opt,
  });
  return SearchResSchema.parse(res);
};

export const MkdirSchema = z.object({
  path: z.string(),
});
export type MkdirOption = z.infer<typeof MkdirSchema>;
export const mkdir = async (opt: MkdirOption) => {
  await request({
    method: "POST",
    url: "/api/fs/mkdir",
    data: opt,
  });
};
