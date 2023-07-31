import { acceptHMRUpdate, defineStore } from 'pinia'
import { getNasabahRequest } from '../apis/nasabah'
import { Item } from 'vue3-easy-data-table'
import { TSelectValue } from '~/types/common.interface'

export const useNasabahStore = defineStore('nasabah', {
    state: () => ({
        data: [] as Item[],
        dataSelect: [] as TSelectValue<{}>[],
        page: 1,
        per_page: 5,
        total_page: 12,
    }),
    actions: {
        async getNasabah() {
            const { data } = await getNasabahRequest({
                page: this.page,
                per_page: this.per_page
            })

            if(data.status){
                this.data = data.result.data
                this.total_page = data.result.total
            }
        },
        async getNasabahFormat() {
            const { data } = await getNasabahRequest({
                page: this.page,
                per_page: this.per_page
            })

            if(data.status){
                this.dataSelect = data.result.data.map(item => ({
                    name: item.name,
                    value: item.id
                }))
            }
        },
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useNasabahStore, import.meta.hot))
