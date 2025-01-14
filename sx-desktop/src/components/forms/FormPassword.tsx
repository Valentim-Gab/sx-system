import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { InputMain } from '@/components/inputs/InputMain/Index'
import { useState } from 'react'
import ButtonMain from '../buttons/ButtonMain'

export const formSchema = z
  .object({
    oldPassword: z.string().min(1, { message: 'Senha antiga é obrigatória' }),
    password: z.string().min(1, { message: 'Senha é obrigatória' }),
    passwordConfirmation: z
      .string()
      .min(1, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation'],
  })

export default function FormPassword({
  onSubmit,
}: {
  onSubmit: (values: {
    oldPassword: string
    password: string
    passwordConfirmation: string
  }) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const [rules, setRules] = useState<RulesPassword>({
    minLength: false,
    maxLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  })

  const [inputsType, setInputsType] = useState({
    oldPassword: 'password',
    password: 'password',
    passwordConfirmation: 'password',
  })

  async function submit(values: z.infer<typeof formSchema>) {
    if (!checkRules()) {
      return
    }

    onSubmit(values)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      { oldPassword: string; password: string; passwordConfirmation: string },
      'password'
    >
  ) => {
    const value = e.target.value
    field.onChange(value)
    const minLength = value.length >= 6
    const maxLength = value.length <= 32
    const lowercase = /[a-z]/.test(value)
    const uppercase = /[A-Z]/.test(value)
    const number = /[0-9]/.test(value)
    const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)

    setRules({
      minLength,
      maxLength,
      lowercase,
      uppercase,
      number,
      specialChar,
    })
  }

  const checkRules = () => {
    return Object.values(rules).every((rule: boolean) => rule)
  }

  const showPassword = (
    field: 'OLD_PASSWORD' | 'PASSWORD' | 'CONFIRMATION'
  ) => {
    if (field === 'OLD_PASSWORD') {
      setInputsType((prev) => ({
        ...prev,
        oldPassword: prev.oldPassword === 'password' ? 'text' : 'password',
      }))
    } else if (field === 'PASSWORD') {
      setInputsType((prev) => ({
        ...prev,
        password: prev.password === 'password' ? 'text' : 'password',
      }))
    } else {
      setInputsType((prev) => ({
        ...prev,
        passwordConfirmation:
          prev.passwordConfirmation === 'password' ? 'text' : 'password',
      }))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col gap-4 bg-card w-full mt-8"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.Input
                    {...field}
                    type={inputsType.oldPassword}
                    autoComplete="current-password"
                    styleLabel="primary"
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Antiga senha
                  </InputMain.Label>
                  <button
                    type="button"
                    className="flex items-center justify-center p-2"
                    onClick={() => showPassword('OLD_PASSWORD')}
                  >
                    <i
                      data-show={inputsType.oldPassword == 'text'}
                      className="icon-[solar--eye-line-duotone] text-3xl text-secondary data-[show=true]:icon-[solar--eye-closed-bold-duotone]"
                    ></i>
                  </button>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.Input
                    {...field}
                    type={inputsType.password}
                    autoComplete="new-password"
                    styleLabel="primary"
                    onChange={(e) => handleChange(e, field)}
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Nova senha
                  </InputMain.Label>
                  <button
                    type="button"
                    className="flex items-center justify-center p-2"
                    onClick={() => showPassword('PASSWORD')}
                  >
                    <i
                      data-show={inputsType.password == 'text'}
                      className="icon-[solar--eye-line-duotone] text-3xl text-secondary data-[show=true]:icon-[solar--eye-closed-bold-duotone]"
                    ></i>
                  </button>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMain.Root>
                  <InputMain.Input
                    {...field}
                    type={inputsType.passwordConfirmation}
                    autoComplete="new-password"
                    styleLabel="primary"
                  />
                  <InputMain.Label value={field.value} styleLabel="primary">
                    Confirmar nova senha
                  </InputMain.Label>
                  <button
                    type="button"
                    className="flex items-center justify-center p-2"
                    onClick={() => showPassword('CONFIRMATION')}
                  >
                    <i
                      data-show={inputsType.passwordConfirmation == 'text'}
                      className="icon-[solar--eye-line-duotone] text-3xl text-secondary data-[show=true]:icon-[solar--eye-closed-bold-duotone]"
                    ></i>
                  </button>
                </InputMain.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4">
          <ul className="grid grid-cols-2 gap-y-1 gap-x-4">
            <li className="flex items-center gap-1">
              <i
                data-check={rules.minLength}
                className="text-lg icon-[solar--close-circle-bold] data-[check=true]:icon-[solar--check-circle-bold] text-destructive data-[check=true]:text-positive"
              />
              <p className="text-sm">Mínimo de 6 caracteres</p>
            </li>
            <li className="flex items-center gap-1">
              <i
                data-check={rules.maxLength}
                className="text-lg icon-[solar--close-circle-bold] data-[check=true]:icon-[solar--check-circle-bold] text-destructive data-[check=true]:text-positive"
              />
              <p className="text-sm">Máximo de 32 caracteres</p>
            </li>
            <li className="flex items-center gap-1">
              <i
                data-check={rules.lowercase}
                className="text-lg icon-[solar--close-circle-bold] data-[check=true]:icon-[solar--check-circle-bold] text-destructive data-[check=true]:text-positive"
              />
              <p className="text-sm">Letra Minúscula</p>
            </li>
            <li className="flex items-center gap-1">
              <i
                data-check={rules.uppercase}
                className="text-lg icon-[solar--close-circle-bold] data-[check=true]:icon-[solar--check-circle-bold] text-destructive data-[check=true]:text-positive"
              />
              <p className="text-sm">Letra Maiúscula</p>
            </li>
            <li className="flex items-center gap-1">
              <i
                data-check={rules.number}
                className="text-lg icon-[solar--close-circle-bold] data-[check=true]:icon-[solar--check-circle-bold] text-destructive data-[check=true]:text-positive"
              />
              <p className="text-sm">Mínimo de um número</p>
            </li>
            <li className="flex items-center gap-1">
              <i
                data-check={rules.specialChar}
                className="text-lg icon-[solar--close-circle-bold] data-[check=true]:icon-[solar--check-circle-bold] text-destructive data-[check=true]:text-positive"
              />
              <p className="text-sm">Caractere especial</p>
            </li>
          </ul>
        </div>
        <div className="flex items-center flex-col gap-4 mt-4">
          <ButtonMain disabled={!checkRules()} type="submit" className="w-full">
            Enviar
            <i className="icon-[solar--send-square-outline] w-[24px] h-[24px]"></i>
          </ButtonMain>
        </div>
      </form>
    </Form>
  )
}
