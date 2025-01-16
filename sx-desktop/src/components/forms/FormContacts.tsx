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
import { SiteConfig } from '@/interfaces/SiteConfig'
import { SiteConfigService } from '@/services/SiteConfigService'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import ButtonMain from '../buttons/ButtonMain'

export const formSchema = z.object({
  gmailUrl: z.string(),
  instagramUrl: z.string(),
  facebookUrl: z.string(),
  whatsappUrl: z.string(),
})

interface FormContactsProps {
  siteConfig: SiteConfig
  className?: string
}

export default function FormContacts({
  siteConfig,
  className,
}: FormContactsProps) {
  const { toast } = useToast()
  const siteService = new SiteConfigService()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gmailUrl: siteConfig.gmailUrl || '',
      instagramUrl: siteConfig.instagramUrl || '',
      facebookUrl: siteConfig.facebookUrl || '',
      whatsappUrl: siteConfig.whatsappUrl || '',
    },
  })

  const mutation = useMutation({
    mutationKey: ['update_site'],
    mutationFn: siteService.update,
    onSuccess: () => {
      toast({
        title: 'Sucesso!',
        description: 'Contatos atualizados!',
        variant: 'positive',
      })
    },
    onError: () => {
      toast({
        title: 'Erro!',
        description: 'Não foi possível atualizar os contatos!',
        variant: 'destructive',
      })
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync(values)
  }

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          data-loading={mutation.isPending}
          onSubmit={form.handleSubmit(onSubmit)}
          className={twMerge(
            'grid grid-cols-1 gap-5 bg-card w-full relative data-[loading=true]:opacity-50 transition-all duration-300',
            className
          )}
        >
          <FormField
            control={form.control}
            name="gmailUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputMain.Root>
                    <InputMain.Input {...field} styleLabel="primary" />
                    <InputMain.Label value={field.value} styleLabel="primary">
                      Gmail URL
                    </InputMain.Label>
                  </InputMain.Root>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagramUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputMain.Root>
                    <InputMain.Input {...field} styleLabel="primary" />
                    <InputMain.Label value={field.value} styleLabel="primary">
                      Instagram URL
                    </InputMain.Label>
                  </InputMain.Root>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facebookUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputMain.Root>
                    <InputMain.Input {...field} styleLabel="primary" />
                    <InputMain.Label value={field.value} styleLabel="primary">
                      Facebook URL
                    </InputMain.Label>
                  </InputMain.Root>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsappUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputMain.Root>
                    <InputMain.Input {...field} styleLabel="primary" />
                    <InputMain.Label value={field.value} styleLabel="primary">
                      WhatsApp URL
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
      {mutation.isPending && (
        <Loader2 className="absolute h-20 w-20 animate-spin" />
      )}
    </div>
  )
}
