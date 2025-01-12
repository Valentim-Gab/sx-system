import { UserService } from '@/services/UserService'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import BackLinkBtn from '@/components/buttons/BackLinkBtn'
import FormAccount from '@/components/forms/FormAccount'

export default function AccountPage() {
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
      <section className="section flex-auto mt-4 p-6">
        <h1 className="mb-6">Conta</h1>
        <FormAccount user={data} />
      </section>
    </main>
  )
}
