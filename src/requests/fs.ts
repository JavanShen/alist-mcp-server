import { z } from "zod";
import { request } from "../utils/request.js";
import { AlistFilesSchema } from "../types/fs.js";

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
