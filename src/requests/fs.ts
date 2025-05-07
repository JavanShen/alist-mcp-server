import {
  ReqApiFsListSchema,
  ResApiFsListSchema,
  ReqApiFsGetSchema,
  ResApiFsGetSchema,
  ReqApiFsDirsSchema,
  ResApiFsDirsSchema,
  ReqApiFsSearchSchema,
  ResApiFsSearchSchema,
  ReqApiFsMkdirSchema,
  ResApiFsMkdirSchema,
  ReqApiFsRenameSchema,
  ResApiFsRenameSchema,
  ReqApiFsBatch_renameSchema,
  ResApiFsBatch_renameSchema,
  ReqApiFsRegex_renameSchema,
  ResApiFsRegex_renameSchema,
  ReqApiFsMoveSchema,
  ResApiFsMoveSchema,
  ReqApiFsRecursive_moveSchema,
  ResApiFsRecursive_moveSchema,
  ReqApiFsCopySchema,
  ResApiFsCopySchema,
  ReqApiFsRemoveSchema,
  ResApiFsRemoveSchema,
  ReqApiFsRemove_empty_directorySchema,
  ResApiFsRemove_empty_directorySchema,
  ReqApiFsAdd_offline_downloadSchema,
  ResApiFsAdd_offline_downloadSchema,
  ReqApiFsFormSchema,
  ResApiFsFormSchema,
} from "../types/fs.js";
import { request } from "../utils/request.js";
import { z } from "zod";
export type ReqApiFsListSchemaOption = z.infer<typeof ReqApiFsListSchema>;
export const apiFsList = async (opt: ReqApiFsListSchemaOption) => {
  const res = await request({
    url: "/api/fs/list",
    method: "POST",
    data: opt,
  });
  return ResApiFsListSchema.parse(res);
};

export type ReqApiFsGetSchemaOption = z.infer<typeof ReqApiFsGetSchema>;
export const apiFsGet = async (opt: ReqApiFsGetSchemaOption) => {
  const res = await request({
    url: "/api/fs/get",
    method: "POST",
    data: opt,
  });
  return ResApiFsGetSchema.parse(res);
};

export type ReqApiFsDirsSchemaOption = z.infer<typeof ReqApiFsDirsSchema>;
export const apiFsDirs = async (opt: ReqApiFsDirsSchemaOption) => {
  const res = await request({
    url: "/api/fs/dirs",
    method: "POST",
    data: opt,
  });
  return ResApiFsDirsSchema.parse(res);
};

export type ReqApiFsSearchSchemaOption = z.infer<typeof ReqApiFsSearchSchema>;
export const apiFsSearch = async (opt: ReqApiFsSearchSchemaOption) => {
  const res = await request({
    url: "/api/fs/search",
    method: "POST",
    data: opt,
  });
  return ResApiFsSearchSchema.parse(res);
};

export type ReqApiFsMkdirSchemaOption = z.infer<typeof ReqApiFsMkdirSchema>;
export const apiFsMkdir = async (opt: ReqApiFsMkdirSchemaOption) => {
  const res = await request({
    url: "/api/fs/mkdir",
    method: "POST",
    data: opt,
  });
  return ResApiFsMkdirSchema.parse(res);
};

export type ReqApiFsRenameSchemaOption = z.infer<typeof ReqApiFsRenameSchema>;
export const apiFsRename = async (opt: ReqApiFsRenameSchemaOption) => {
  const res = await request({
    url: "/api/fs/rename",
    method: "POST",
    data: opt,
  });
  return ResApiFsRenameSchema.parse(res);
};

export type ReqApiFsBatch_renameSchemaOption = z.infer<
  typeof ReqApiFsBatch_renameSchema
>;
export const apiFsBatch_rename = async (
  opt: ReqApiFsBatch_renameSchemaOption,
) => {
  const res = await request({
    url: "/api/fs/batch_rename",
    method: "POST",
    data: opt,
  });
  return ResApiFsBatch_renameSchema.parse(res);
};

export type ReqApiFsRegex_renameSchemaOption = z.infer<
  typeof ReqApiFsRegex_renameSchema
>;
export const apiFsRegex_rename = async (
  opt: ReqApiFsRegex_renameSchemaOption,
) => {
  const res = await request({
    url: "/api/fs/regex_rename",
    method: "POST",
    data: opt,
  });
  return ResApiFsRegex_renameSchema.parse(res);
};

export type ReqApiFsMoveSchemaOption = z.infer<typeof ReqApiFsMoveSchema>;
export const apiFsMove = async (opt: ReqApiFsMoveSchemaOption) => {
  const res = await request({
    url: "/api/fs/move",
    method: "POST",
    data: opt,
  });
  return ResApiFsMoveSchema.parse(res);
};

export type ReqApiFsRecursive_moveSchemaOption = z.infer<
  typeof ReqApiFsRecursive_moveSchema
>;
export const apiFsRecursive_move = async (
  opt: ReqApiFsRecursive_moveSchemaOption,
) => {
  const res = await request({
    url: "/api/fs/recursive_move",
    method: "POST",
    data: opt,
  });
  return ResApiFsRecursive_moveSchema.parse(res);
};

export type ReqApiFsCopySchemaOption = z.infer<typeof ReqApiFsCopySchema>;
export const apiFsCopy = async (opt: ReqApiFsCopySchemaOption) => {
  const res = await request({
    url: "/api/fs/copy",
    method: "POST",
    data: opt,
  });
  return ResApiFsCopySchema.parse(res);
};

export type ReqApiFsRemoveSchemaOption = z.infer<typeof ReqApiFsRemoveSchema>;
export const apiFsRemove = async (opt: ReqApiFsRemoveSchemaOption) => {
  const res = await request({
    url: "/api/fs/remove",
    method: "POST",
    data: opt,
  });
  return ResApiFsRemoveSchema.parse(res);
};

export type ReqApiFsRemove_empty_directorySchemaOption = z.infer<
  typeof ReqApiFsRemove_empty_directorySchema
>;
export const apiFsRemove_empty_directory = async (
  opt: ReqApiFsRemove_empty_directorySchemaOption,
) => {
  const res = await request({
    url: "/api/fs/remove_empty_directory",
    method: "POST",
    data: opt,
  });
  return ResApiFsRemove_empty_directorySchema.parse(res);
};

export type ReqApiFsAdd_offline_downloadSchemaOption = z.infer<
  typeof ReqApiFsAdd_offline_downloadSchema
>;
export const apiFsAdd_offline_download = async (
  opt: ReqApiFsAdd_offline_downloadSchemaOption,
) => {
  const res = await request({
    url: "/api/fs/add_offline_download",
    method: "POST",
    data: opt,
  });
  return ResApiFsAdd_offline_downloadSchema.parse(res);
};

export type ReqApiFsFormSchemaOption = z.infer<typeof ReqApiFsFormSchema>;
export const apiFsForm = async (opt: ReqApiFsFormSchemaOption) => {
  const res = await request({
    url: "/api/fs/form",
    method: "PUT",
    data: opt,
  });
  return ResApiFsFormSchema.parse(res);
};
