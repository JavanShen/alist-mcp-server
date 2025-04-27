import { z } from "zod";

const ContentSchema = z.object({
  created: z.union([z.null(), z.string()]).optional(),
  hash_info: z.null().optional(),
  hashinfo: z.union([z.null(), z.string()]).optional(),
  is_dir: z.boolean(),
  modified: z.string(),
  name: z.string(),
  sign: z.string(),
  size: z.number(),
  thumb: z.string(),
  type: z.number(),
});
export const AlistFilesSchema = z.object({
  content: z.array(ContentSchema),
  header: z.string(),
  provider: z.string(),
  readme: z.string(),
  total: z.number(),
  write: z.boolean(),
});

export const PathInfoSchema = z.object({
  created: z.string(),
  hash_info: z.null(),
  hashinfo: z.string(),
  header: z.string(),
  is_dir: z.boolean(),
  modified: z.string(),
  name: z.string(),
  provider: z.string(),
  raw_url: z.string(),
  readme: z.string(),
  related: z.null(),
  sign: z.string(),
  size: z.number(),
  thumb: z.string(),
  type: z.number(),
});
