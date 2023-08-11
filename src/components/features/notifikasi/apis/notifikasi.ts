import api from '~/apis'
import type { TResponseSingle } from '~/types/response.interface'
import { TNotifikasi, TNotifikasiCount } from '../types/notifikasi.interface'

export const getNotifikasiRequest = async () => {

    const response = await api.get<TResponseSingle<null, TNotifikasi[]>>(`notifikasi/list`)

    return response
}

export const getNotifikasiCountRequest = async () => {

    const response = await api.get<TResponseSingle<null, TNotifikasiCount>>(`notifikasi/count`)

    return response
}

export const updateNotifikasiRequest = async (id: number) => {

    const response = await api.post<TResponseSingle<{}, {}>>(`notifikasi/read`, {
        id
    })

    return response
}