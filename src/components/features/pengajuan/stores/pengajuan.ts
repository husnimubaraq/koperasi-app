import { acceptHMRUpdate, defineStore } from 'pinia'
import { getPengajuanRequest, createPengajuanRequest, updateStatusPengajuanRequest } from '../apis/pengajuan'
import { Item } from 'vue3-easy-data-table'
import { TPengajuanForm, TPengajuanAction, TErrors, TPengajuan } from '../types/pengajuan.interface'
import { TSelectValue } from '~/types/common.interface'

export const usePengajuanStore = defineStore('pengajuan', {
    state: () => ({
        data: [] as Item[],
        dataSelect: [] as TSelectValue<TPengajuan>[],
        page: 1,
        per_page: 100,
        total_page: 12,
        error: "",
        errors: {} as TErrors,
        responseStatus: false
    }),
    actions: {
        async getPengajuan() {
            const { data } = await getPengajuanRequest({
                page: this.page,
                per_page: this.per_page
            })

            if(data.status){
                this.data = data.result.data
                this.total_page = data.result.total
            }
        },
        async getPengajuanFormat() {
            const { data } = await getPengajuanRequest({
                page: this.page,
                per_page: this.per_page
            })

            if(data.status){
                this.dataSelect = data.result.data.filter(
                    x => x.status === 'dikonfirmasi'
                ).map(item => ({
                    name: item.name,
                    value: item.id,
                    item: item
                }))
            }
        },
        async updateStatusPengajuan(params: TPengajuanAction) {
            const { data } = await updateStatusPengajuanRequest(params)

            this.responseStatus = data.status

            setTimeout(() => {
                this.responseStatus = false
            }, 2000)
        },
        async createPengajuan(params: TPengajuanForm) {
            try {
                const { data } = await createPengajuanRequest(params)

                this.responseStatus = data.status

                setTimeout(() => {
                    this.responseStatus = false
                }, 2000)

            } catch (err: any) {
                const { response } = err

                this.error = response.data.message

                setTimeout(() => {
                    this.error = ''
                }, 2000)

                if (response.data.errors) {
                    this.errors = response.data.errors
                }
            }
        }
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePengajuanStore, import.meta.hot))
