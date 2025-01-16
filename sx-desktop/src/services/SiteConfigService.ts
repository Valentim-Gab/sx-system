import { HttpStatusCode } from 'axios'
import axiosInterceptor from './interceptors/Axios'
import { SiteConfig } from '@/interfaces/SiteConfig'

export class SiteConfigService {
  async get(): Promise<SiteConfig | null> {
    const res = await axiosInterceptor.get('/site')

    if (!res || res.status !== HttpStatusCode.Ok) {
      return null
    }

    return res.data
  }

  async update(siteConfig: SiteConfig): Promise<boolean> {
    const res = await axiosInterceptor.put('/site', siteConfig)

    if (!res || res.status !== HttpStatusCode.Ok) {
      throw new Error()
    }

    return true
  }

  async uploadMainAvatar(file: File) {
    try {
      const formData = new FormData()
      formData.append('main-avatar', file)

      const res = await axiosInterceptor.patch(`/site/main-avatar`, formData, {
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
