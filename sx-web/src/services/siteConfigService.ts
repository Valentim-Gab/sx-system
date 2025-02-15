import { environment } from '@/environments/environment'
import { SiteConfig } from '@/interfaces/SiteConfig'

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const res = await fetch(`${environment.API_URL}/site`, { cache: 'no-cache' })

  if (!res || !res.ok) {
    return null
  }

  const data = await res.json()

  return data
}
