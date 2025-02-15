import { twMerge } from 'tailwind-merge'
import { getSiteConfig } from '@/services/siteConfigService'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import FormMessage from '@/components/forms/form-message'
import SocialNetworks from './social-networks'

export default async function Contato() {
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
        <h2 className="text-white text-lg col-span-full">Redes-sociais</h2>
        <SocialNetworks />
      </section>
    </main>
  )
}
