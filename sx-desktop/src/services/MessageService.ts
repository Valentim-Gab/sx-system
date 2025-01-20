import { HttpStatusCode } from 'axios'
import axiosInterceptor from './interceptors/Axios'
import { Message } from '@/interfaces/Message'

export class MessageService {
  async getAll(): Promise<Message[]> {
    const res = await axiosInterceptor('/message')

    if (!res || res.status != HttpStatusCode.Ok) {
      throw new Error('Não foi possível buscar as mensagens')
    }

    return res.data
  }
}
