import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { UserService } from '@/services/UserService'
import BackLinkBtn from '@/components/buttons/BackLinkBtn'
import FormPassword from '@/components/forms/FormPassword'

export default function AlterarSenhaPage() {
  const userService = new UserService()
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  async function onSubmit(values: {
    oldPassword: string
    password: string
    passwordConfirmation: string
  }) {
    const { message, success } = await userService.updatePassword(values)

    if (success) {
      toast({
        title: 'Sucesso!',
        description: message,
        variant: 'positive',
      })

      setSubmitted(true)
    } else {
      toast({
        title: 'Erro ao atualizar senha!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  return (
    <main className="main-container flex flex-col">
      <section>
        <BackLinkBtn to="/dashboard/configuracoes" />
      </section>
      <section className="flex-auto flex justify-center items-center">
        <div
          data-show={!submitted}
          className="section flex flex-col justify-between opacity-0 data-[show=true]:opacity-100 data-[show=true]:p-4 absolute data-[show=true]:relative scale-0 data-[show=true]:scale-100 max-w-[600px] data-[show=true]:min-h-[320px] data-[show=true]:sm:p-8 transition-all duration-1000 ease-in-out"
        >
          {!submitted && (
            <>
              <div className="flex flex-col gap-1">
                <h1>Alteração de senha</h1>
                <p>Cadastre uma nova senha para sua conta</p>
              </div>
              <FormPassword onSubmit={onSubmit} />
            </>
          )}
        </div>

        <div
          data-show={submitted}
          className="section flex flex-col justify-center items-center transition-all duration-300 ease-in-out absolute data-[show=true]:max-w-[400px] data-[show=true]:h-[400px] data-[show=true]:p-4 scale-0 data-[show=true]:scale-100 data-[show=true]:sm:p-8"
        >
          {submitted && (
            <>
              <span>
                <i className="icon-[solar--verified-check-bold-duotone] w-24 h-24 text-primary"></i>
              </span>
              <div className="flex flex-col text-center gap-2 mt-2">
                <h1 className="text-2xl font-bold">Senha redefinida!</h1>
                <p>Sua senha foi alterada com sucesso</p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
