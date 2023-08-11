import { acceptHMRUpdate, defineStore } from 'pinia'
import { getNotifikasiRequest, getNotifikasiCountRequest, updateNotifikasiRequest } from '../apis/notifikasi'
import { TNotifikasi } from '../types/notifikasi.interface'


export const useNotifikasiStore = defineStore('notifikasi', {
    state: () => ({
        data: [] as TNotifikasi[],
        count: 0,
        responseStatus: false,
        error: ''
    }),
    actions: {
        async getNotifikasi() {
            const { data } = await getNotifikasiRequest()

            if(data.status){
                this.data = data.result
            }
        },
        async getNotifikasiCount() {
            const { data } = await getNotifikasiCountRequest()

            if(data.status){
                this.count = data.result.count_notif
            }
        },
        async updateNotifikasi(id: number) {

            try {
                const { data } = await updateNotifikasiRequest(id)

                if(data.status){
                    this.getNotifikasi()
                    this.getNotifikasiCount()
                }

            } catch (err: any) {
                const { response } = err

                this.error = response.data.message

                setTimeout(() => {
                    this.error = ''
                }, 2000)
            }
        },
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useNotifikasiStore, import.meta.hot))
