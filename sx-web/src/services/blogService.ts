import { environment } from '@/environments/environment'
import { Post } from '@/interfaces/blog'

export async function getAllPosts(): Promise<Post[] | null> {
  const url = `${environment.API_URL}/blog`
  const res = await fetch(url)

  if (!res || !res.ok) {
    return null
  }

  const data = await res.json()

  return data
}
