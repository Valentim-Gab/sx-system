import { blogMessages } from '@prisma/client'

export interface BlogMessageDate extends blogMessages {
  formatDate: {
    date: string
    time: string
  }
}
