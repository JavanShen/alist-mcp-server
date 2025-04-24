import { request } from '../utils/request.js'
import { AlistUserSchema } from '../types/auth.js'

export const getUserInfo = async () => {
    const res = await request({
        url: '/api/me'
    })
    return AlistUserSchema.parse(res)
}
