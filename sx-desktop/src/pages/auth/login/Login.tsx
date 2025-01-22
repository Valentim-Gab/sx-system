import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import './Login.scss'
import FormLogin from '@/components/forms/FormLogin'

export default function Login() {
  const { toast } = useToast()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const expired = searchParams.get('expired')

    if (expired) {
      setTimeout(() => {
        toast({
          title: 'Sessão expirada',
          description: 'Sua sessão expirou, faça login novamente.',
          variant: 'destructive',
        })

        navigate('/', { replace: true })
      }, 100)
    }
  }, [toast, searchParams])

  return (
    <main className="min-h-dvh grid grid-cols-1 bg-card md:grid-cols-[6fr_6fr] lg:grid-cols-[7fr_5fr] xl:grid-cols-[8fr_4fr]  ">
      <section className="hidden md:block">
        <video className="background-video" autoPlay loop muted>
          <source type="video/mp4" src="videos/tarot.mp4" />
        </video>
      </section>
      <section className="place-self-center flex flex-col gap-8 items-center justify-center p-8 max-w-[400px]">
        <img src="/logos/logo.png" alt="Logo" />
        <FormLogin />
      </section>
    </main>
  )
}
