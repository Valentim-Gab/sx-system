import { environment } from '@/environments/environment'
import { SiteConfig } from '@/interfaces/SiteConfig'

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const res = await fetch(`${environment.API_URL}/site`)

  if (!res || !res.ok) {
    return null
  }

  return await res.json()
}
