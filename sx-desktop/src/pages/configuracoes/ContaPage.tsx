import { UserService } from '@/services/UserService'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import BackLinkBtn from '@/components/buttons/BackLinkBtn'
import FormAccount from '@/components/forms/FormAccount'

export default function ContaPage() {
  const userService = new UserService()

  const { data, isLoading } = useQuery({
    queryKey: ['get_me'],
    queryFn: userService.getMe,
    retry: false,
  })

  if (isLoading) {
    return (
      <main className="main-container flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </main>
    )
  }

  if (!data) {
    return (
      <main className="main-container flex">
        <section className="section flex flex-col items-center justify-center gap-4">
          <i className="icon-[solar--user-block-rounded-bold-duotone] text-8xl text-primary" />
          <h2 className="text-primary">Usuário não logado!</h2>
        </section>
      </main>
    )
  }

  return (
    <main className="main-container flex flex-col">
      <BackLinkBtn to="/dashboard/configuracoes" />
      <section className='flex-auto flex justify-center items-center'>
        <div className="section p-6 max-w-[500px] min-h-[320px]">
          <h1 className="mb-6">Conta</h1>
          <FormAccount user={data} />
        </div>
      </section>
    </main>
  )
}
