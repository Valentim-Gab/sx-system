import { environment } from '@/environments/environment'
import { getTokens, storageTokens, storageUser } from '@/helpers/StorageHelper'
import { AuthService } from '../AuthService'
import axios, { HttpStatusCode } from 'axios'

const axiosInterceptor = axios.create({
  baseURL: environment.apiUrl,
})

axiosInterceptor.interceptors.request.use(
  (config) => {
    const tokens = getTokens()

    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axiosInterceptor.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const tokens = getTokens()

      if (tokens) {
        try {
          const res = await fetch(`${environment.apiUrl}/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokens.accessToken}`,
            },
            body: JSON.stringify({
              refreshToken: tokens.refreshToken,
            }),
          })

          if (!res || res.status == HttpStatusCode.Unauthorized) {
            const authService = new AuthService()
            const isSuccess = authService.signOut()

            if (isSuccess) {
              window.location.href = '/?expired=true'
              return
            }
          }

          const data = await res.json()

          if (data.tokens && data.user) {
            storageTokens(data.tokens)
            storageUser(data.user)
            error.config.headers.Authorization = `Bearer ${data.accessToken}`

            return axiosInterceptor.request(error.config)
          }
        } catch (err) {
          console.log('Erro ao atualizar token', err)
          return Promise.reject(err)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInterceptor
