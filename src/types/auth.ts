import { z } from 'zod'

export const AlistUserSchema = z.object({
    "base_path": z.string(),
    "disabled": z.boolean(),
    "id": z.number(),
    "otp": z.boolean(),
    "password": z.string(),
    "permission": z.number(),
    "role": z.number(),
    "sso_id": z.string(),
    "username": z.string(),
});