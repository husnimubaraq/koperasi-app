import { acceptHMRUpdate, defineStore } from 'pinia'
import { getRekapRequest } from '../apis/rekap'
import { Item } from 'vue3-easy-data-table'


export const useRekapStore = defineStore('rekap', {
    state: () => ({
        data: [] as Item[],
        page: 1,
        per_page: 5,
        total_page: 12
    }),
    actions: {
        async getRekap() {
            const { data } = await getRekapRequest({
                page: this.page,
                per_page: this.per_page
            })

            if(data.status){
                this.data = data.result.data
                this.total_page = data.result.total
            }
        }
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useRekapStore, import.meta.hot))
