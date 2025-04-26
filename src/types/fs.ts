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
