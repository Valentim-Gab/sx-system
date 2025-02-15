import { environment } from '@/environments/environment'

export async function sendMessage(message: string): Promise<boolean> {
  const res = await fetch(`${environment.API_URL}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!res || !res.ok) {
    return false
  }

  return true
}
