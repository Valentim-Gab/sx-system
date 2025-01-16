import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { SiteConfigService } from '@/services/SiteConfigService'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import FormContacts from '@/components/forms/FormContacts'
import BackLinkBtn from '@/components/buttons/BackLinkBtn'

export default function ContatosPage() {
  const siteService = new SiteConfigService()

  const { data, isLoading } = useQuery({
    queryKey: ['get_site'],
    queryFn: siteService.get,
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
          <i className="icon-[solar--chat-square-bold-duotone] text-8xl text-primary" />
          <h2 className="text-primary">Não foi possível buscar os contatos</h2>
        </section>
      </main>
    )
  }

  const contacts = [
    {
      name: 'Email',
      icon: 'icon-[logos--google-gmail]',
      href: data.gmailUrl,
      classes: 'btn-gmail gap-3',
    },
    {
      name: 'Instagram',
      icon: 'icon-[mdi--instagram]',
      href: data.instagramUrl,
      classes: 'btn-instagram',
    },
    {
      name: 'Facebook',
      icon: 'icon-[mdi--facebook]',
      href: data.facebookUrl,
      classes: 'btn-facebook',
    },

    {
      name: 'WhatsApp',
      icon: 'icon-[mdi--whatsapp]',
      href: data.whatsappUrl,
      classes: 'btn-whatsapp',
    },
  ]

  return (
    <main className="main-container grid grid-cols-1  auto-rows-min gap-y-4 gap-x-6 sm:grid-cols-[3fr_2fr]">
      <section className="self-start col-span-full">
        <BackLinkBtn to="/dashboard/configuracoes" />
      </section>
      <section className="section p-6">
        <div>
          <h1 className="mb-6">Contatos</h1>
          <FormContacts siteConfig={data} />
        </div>
      </section>
      <section className="flex flex-col gap-6 section p-6">
        <h6 className="text-sm  font-semibold">Redes Sociais do Site</h6>
        {contacts
          .filter((contact) => contact.href)
          .map((button, index) => (
            <Link
              key={index}
              to={button.href || '#'}
              target="_blank"
              className={twMerge(
                'flex items-center justify-center gap-2 px-4 py-2 h-12 min-w-32 w-full rounded-lg font-medium shadow',
                button.classes
              )}
            >
              <i className={`${button.icon} w-6 h-6 text-white fill-white`}></i>
              {button.name}
            </Link>
          ))}
        {!contacts ||
          (contacts.length <= 0 && (
            <span className="p-4 col-span-full flex flex-wrap items-center justify-center text-center shadow rounded-lg gap-2">
              <i className="icon-[solar--notification-lines-remove-linear] bg-secondary text-2xl"></i>
              <p>Nenhum contato cadastrado</p>
            </span>
          ))}
      </section>
    </main>
  )
}
