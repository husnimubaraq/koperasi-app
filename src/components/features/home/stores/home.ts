import { acceptHMRUpdate, defineStore } from 'pinia'
import { getDashboardRequest } from '../apis/home'
import { TDashboard } from '../types/home.interface'


export const useHomeStore = defineStore('home', {
    state: () => ({
        data: {} as TDashboard
    }),
    actions: {
        async getDashboard() {
            const { data } = await getDashboardRequest()

            if(data.status){
                this.data = data.result
            }
        }
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useHomeStore, import.meta.hot))
