import { z } from "zod";
import { request } from "../utils/request.js";
import { AlistFilesSchema, PathInfoSchema } from "../types/fs.js";

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
