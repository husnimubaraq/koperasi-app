import api from '~/apis'
import type { TPaginateRequest, TPaginate } from '~/types/paginate.interface'
import type { TResponseSingle } from '~/types/response.interface'
import { TTagihan, TTagihanForm, TTagihanDetail } from '../types/tagihan.interface'

export const getTagihanRequest = async (params: TPaginateRequest) => {

    const { page, per_page } = params

    const response = await api.get<TResponseSingle<null, TPaginate<TTagihan>>>(`tagihan/list`, {
        params: {
            page,
            per_page
        }
    })

    return response
}

export const getTagihanDetailRequest = async (id: number) => {

    const response = await api.get<TResponseSingle<null, TTagihanDetail>>(`tagihan/detail/${id}`)

    return response
}

export const createTagihanRequest = async (params: TTagihanForm) => {

    const response = await api.post<TResponseSingle<{}, {}>>(`tagihan/store`, params)

    return response
}