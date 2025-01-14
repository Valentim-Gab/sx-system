import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { twMerge } from 'tailwind-merge'
import { InputMain } from '@/components/inputs/InputMain/Index'
import { useToast } from '@/hooks/use-toast'
import { UserService } from '@/services/UserService'
import ButtonMain from '../buttons/ButtonMain'

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Mínimo de 2 caracteres' }),
  lastName: z.string(),
  email: z
    .string()
    .email({ message: 'Email é inválido' })
    .min(1, { message: 'Email é obrigatório' }),
  dateBirth: z.date().optional(),
  phoneNumber: z.string(),
})

interface FormAccountProps {
  user: User
  className?: string
}

export default function FormAccount({ user, className }: FormAccountProps) {
  const { toast } = useToast()
  const userService = new UserService()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || '',
      lastName: user.lastName || '',
      email: user.email || '',
      dateBirth: user.dateBirth ? new Date(user.dateBirth) : undefined,
      phoneNumber: user.phoneNumber || '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isSuccess = await userService.update(values)

    if (isSuccess) {
      toast({
        title: 'Sucesso!',
        description: 'Informações atualizadas com sucesso!',
        variant: 'positive',
      })
    } else {
      toast({
        title: 'Erro!',
        description: 'Não foi possível atualizar suas informações!',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={twMerge('grid grid-cols-1 gap-5 bg-card w-full', className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.Input
                    {...field}
                    autoComplete="username"
                    styleLabel="primary"
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Nome
                  </InputMain.Label>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.Input
                    {...field}
                    autoComplete="family-name"
                    styleLabel="primary"
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Sobrenome
                  </InputMain.Label>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    styleLabel="primary"
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Email
                  </InputMain.Label>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateBirth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.Date
                    field={field}
                    autoComplete="bday-day"
                    styleLabel="primary"
                    label={
                      <InputMain.Label value={field.value} styleLabel="primary">
                        Data de nascimento
                      </InputMain.Label>
                    }
                  />
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.InputMask
                    {...field}
                    type="text"
                    autoComplete="tel"
                    styleLabel="primary"
                    id={field.name}
                    mask="(__) _ ____-____"
                    replacement={{ _: /\d/ }}
                    showMask={false}
                    inputMode="tel"
                    modify={(input: string) => {
                      console.log('input', input.length)
                      if (input.length == 11) {

                        return {
                          mask: '(__) _ ____-____',
                          replacement: { _: /\d/ },
                        }
                      }

                      return {
                        mask: '(__) ____-_____',
                        replacement: { _: /\d/ },
                      }
                    }}
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Telefone
                  </InputMain.Label>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-2">
          <ButtonMain type="submit" className="w-full">
            <i className="icon-[solar--verified-check-linear] w-[24px] h-[24px]"></i>
            Salvar
          </ButtonMain>
        </div>
      </form>
    </Form>
  )
}
