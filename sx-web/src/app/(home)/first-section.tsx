import { Button } from '@/components/ui/button'
import { environment } from '@/environments/environment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FirstSection() {
  return (
    <section className="main-container py-8 px-4 sm:flex-row sm:justify-between sm:pb-16 lg:gap-4 lg:flex-row-reverse lg:px-8 lg:pb-40">
      <div className="relative flex sm:ml-16 sm:mr-8 lg:-mr-4 lg:ml-36">
        <div className="flex items-center justify-center rounded-full overflow-hidden aspect-square w-[280px] h-fit z-10 sm:min-w-[280px] lg:min-w-[460px] 2xl:min-w-[580px]">
          <Image
            src={`${environment.API_URL}/site/main-avatar`}
            alt="Foto de susana"
            width={1000}
            height={1000}
            priority={true}
            quality={100}
            className="object-top"
          />
        </div>
        <Image
          src={'/imgs/flowers.png'}
          alt="Flores de fundo"
          width={1000}
          height={1000}
          quality={100}
          className="w-[180px] h-auto absolute left-44 top-36 scale-x-[-1] sm:-left-20 sm:top-36 sm:scale-x-100 lg:w-[460px] lg:-left-44 lg:top-56 2xl:-left-64 2xl:top-60 2xl:w-[500px]"
        />
      </div>
      <div className="text-secondary dark:text-white flex flex-col gap-4 py-8 lg:py-16 lg:gap-8 2xl:py-24">
        <div>
          <h1 className="font-secondary font-bold text-4xl lg:text-7xl">
            Professora.
          </h1>
          <h2 className="font-secondary font-bold text-3xl lg:text-5xl xl:text-6xl">
            Terapeuta Olistica.
          </h2>
        </div>
        <p className="text-justify leading-7 lg:leading-9 lg:max-w-[500px] lg:text-xl">
          Bem-vindo ao meu blog pessoal! Aqui, compartilharei minhas vivências,
          ideias e opiniões sobre diversos assuntos. Fique à vontade para entrar
          em contato comigo!
        </p>
        <Link
          href={'/blog'}
          className="flex items-center justify-center text-white font-medium rounded-full bg-primary px-8 h-10 sm:w-fit lg:px-12 lg:h-12 lg:text-xl"
        >
          Visitar Blog
        </Link>
      </div>
    </section>
  )
}
