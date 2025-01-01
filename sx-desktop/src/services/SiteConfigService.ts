import { HttpStatusCode } from 'axios'
import axiosInterceptor from './interceptors/Axios'

export class SiteConfigService {
  async uploadMainAvatar(file: File) {
    try {
      const formData = new FormData()
      formData.append('main-avatar', file)

      const res = await axiosInterceptor.patch('/site/main-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (!res || res.status !== HttpStatusCode.Ok) {
        return false
      }

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
