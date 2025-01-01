export interface Message {
  idMessage?: string
  message: string
  dateMessage?: Date | string
  formatDate: {
    date: string
    time: string
  }
}