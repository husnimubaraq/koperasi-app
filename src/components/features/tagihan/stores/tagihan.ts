import { acceptHMRUpdate, defineStore } from 'pinia'
import { getTagihanRequest, createTagihanRequest } from '../apis/tagihan'
import { Item } from 'vue3-easy-data-table'
import { TTagihanForm } from '../types/tagihan.interface'


export const useTagihanStore = defineStore('tagihan', {
    state: () => ({
        data: [] as Item[],
        page: 1,
        per_page: 5,
        total_page: 12,
        responseStatus: false,
        error: ''
    }),
    actions: {
        async getTagihan() {
            const { data } = await getTagihanRequest({
                page: this.page,
                per_page: this.per_page
            })

            if(data.status){
                this.data = data.result.data
                this.total_page = data.result.total
            }
        },
        async createTagihan(params: TTagihanForm) {

            try {
                const { data } = await createTagihanRequest(params)

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
            }
        },
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useTagihanStore, import.meta.hot))
