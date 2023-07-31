import api from '~/apis'
import type { TResponseSingle } from '~/types/response.interface'
import { TPembayaran, TPembayaranForm, TPembayaranResult } from '../types/pembayaran.interface'

export const getPembayaranRequest = async () => {

    const response = await api.get<TResponseSingle<null, TPembayaran[]>>(`transaction/list`)

    return response
}

export const createPembayaranRequest = async (params: TPembayaranForm) => {

    const response = await api.post<TResponseSingle<{}, TPembayaranResult>>(`transaction/pay`, params)

    return response
}