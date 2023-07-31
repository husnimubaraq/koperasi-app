import api from '~/apis'
import type { TPaginateRequest, TPaginate } from '~/types/paginate.interface'
import type { TResponseSingle } from '~/types/response.interface'
import { TUser } from '~/components/features/auth/types/user.interface';

export const getNasabahRequest = async (params: TPaginateRequest) => {

    const { page, per_page } = params

    const response = await api.get<TResponseSingle<null, TPaginate<TUser>>>(`user/list`, {
        params: {
            page,
            per_page
        }
    })

    return response
}