import api from '~/apis'
import type { TPaginateRequest, TPaginate } from '~/types/paginate.interface'
import type { TResponseSingle } from '~/types/response.interface'
import { TPengajuan, TPengajuanForm, TPengajuanAction, TErrors} from '../types/pengajuan.interface'

export const getPengajuanRequest = async (params: TPaginateRequest) => {

    const { page, per_page } = params

    const response = await api.get<TResponseSingle<null, TPaginate<TPengajuan>>>(`pengajuan/list`, {
        params: {
            page,
            per_page
        }
    })

    return response
}

export const createPengajuanRequest = async (params: TPengajuanForm) => {

    const response = await api.post<TResponseSingle<TErrors, {}>>(`pengajuan/store`, params)

    return response
}

export const updateStatusPengajuanRequest = async (params: TPengajuanAction) => {

    const response = await api.post<TResponseSingle<TErrors, {}>>(`pengajuan/confirmed`, params)

    return response
}