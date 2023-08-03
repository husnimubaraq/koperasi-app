import axios from 'axios'

export const API_URL = `${import.meta.env.VITE_API_URL}/api/`

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    let userJson = localStorage.getItem('user') ?? null as any

    if(userJson){
      userJson = JSON.parse(userJson)

      if(config.headers){
        config.headers.Authorization = `Bearer ${userJson.access_token}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
