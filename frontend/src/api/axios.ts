import axios, { AxiosError } from 'axios'
import { Service } from 'axios-middleware'

const service = new Service(axios)

service.register({
  onRequest(config: any) {
    return {
      ...config, 
      headers: {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
  },
  onResponseError(error: AxiosError) {
    const err = error as AxiosError
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/'
    } 
    throw error
  }
})

const instance = axios.create({
  baseURL: process.env.REAC_APP_API_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }
})

export default instance