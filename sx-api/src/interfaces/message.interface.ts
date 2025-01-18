import { message } from '@prisma/client'

export interface MessageDate extends message {
  formatDate: {
    date: string
    time: string
  }
}
