import { twMerge } from 'tailwind-merge'
import { getSiteConfig } from '@/services/siteConfigService'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import FormMessage from '@/components/forms/form-message'

export default async function Contato() {
  const siteConfig = await getSiteConfig()

  if (!siteConfig) {
    redirect('/')
  }

  const contacts = [
    {
      name: 'Instagram',
      icon: 'icon-[mdi--instagram]',
      href: siteConfig.instagramUrl,
      classes: 'btn-instagram',
    },
    {
      name: 'Facebook',
      icon: 'icon-[mdi--facebook]',
      href: siteConfig.facebookUrl,
      classes: 'btn-facebook',
    },
    {
      name: 'Google email',
      icon: 'icon-[logos--google-gmail]',
      href: siteConfig.gmailUrl,
      classes: 'btn-gmail',
    },
    {
      name: 'WhatsApp',
      icon: 'icon-[mdi--whatsapp]',
      href: siteConfig.whatsappUrl,
      classes: 'btn-whatsapp',
    },
  ]

  return (
    <main className="flex-auto bg-background-secondary bg-[url(/imgs/contact-banner.jpg)] bg-no-repeat bg-cover bg-center flex flex-col items-center py-8">
      <section className="main-section">
        <h1 className="font-secondary text-white font-bold text-3xl lg:text-4xl">
          Contato
        </h1>
      </section>

      <section className="main-section min-h-[350px] flex-auto flex flex-col gap-4">
        <h2 className="text-white text-lg">Enviar mensagem</h2>
        <FormMessage />
      </section>

      <section className="main-section grid grid-cols-1 gap-y-4 gap-x-8 mt-4 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        <h2 className=" text-white text-lg col-span-full">Redes-sociais</h2>
        {contacts
          .filter((contact) => contact.href)
          .map((contact, index) => (
            <Link
              key={index}
              href={contact.href || '#'}
              target="_blank"
              className={twMerge(
                'flex items-center justify-center gap-2 px-4 py-2 w-full h-[50px] rounded-2xl shadow sm:h-[60px]',
                contact.classes
              )}
            >
              <i
                className={`${contact.icon} w-6 h-6 text-white fill-white sm:w-8 sm:h-8`}
              ></i>
              <span className="font-medium sm:text-xl">{contact.name}</span>
            </Link>
          ))}
      </section>
    </main>
  )
}
