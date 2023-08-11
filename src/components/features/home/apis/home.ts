import api from '~/apis'
import type { TResponseSingle } from '~/types/response.interface'
import { TDashboard } from '../types/home.interface'

export const getDashboardRequest = async () => {

    const response = await api.get<TResponseSingle<null, TDashboard>>(`dashboard-count`)

    return response
}