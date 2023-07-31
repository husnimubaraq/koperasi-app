import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.API_URL}/api/`,
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
