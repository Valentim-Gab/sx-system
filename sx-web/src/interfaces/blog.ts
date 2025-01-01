export interface Post {
  id_message: number
  message: string
  id_user: number
  dateMessage?: Date | string
  formatDate: {
    date: string
    time: string
  }
}
