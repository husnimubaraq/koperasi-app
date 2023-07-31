import api from '~/apis'
import type { TPaginateRequest, TPaginate } from '~/types/paginate.interface'
import type { TResponseSingle } from '~/types/response.interface'
import { TRekap } from '../types/rekap.interface'

export const getRekapRequest = async (params: TPaginateRequest) => {

    const { page, per_page } = params

    const response = await api.get<TResponseSingle<null, TPaginate<TRekap>>>(`rekap/list`, {
        params: {
            page,
            per_page
        }
    })

    return response
}