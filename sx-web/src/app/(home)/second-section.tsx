import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SecondSection() {
  return (
    <section className="w-full flex justify-center bg-background-secondary px-4 py-12 lg:px-8 lg:py-32">
      <div className="main-container items-center gap-8 gap-x-2 sm:flex-row sm:justify-between lg:gap-x-8 2xl:gap-x-32">
        <div className="relative w-fit px-6 flex justify-center">
          <i className="icon-[streamline--cards-solid] text-4xl text-primary absolute left-0 -top-4 sm:text-5xl sm:-top-6 lg:text-7xl lg:-top-10 lg:-left-4 2xl:text-8xl 2xl:-top-14 2xl:-left-8"></i>
          <i className="icon-[solar--book-minimalistic-bold-duotone] text-4xl text-primary absolute right-2 -bottom-4 z-20 sm:text-5xl sm:-bottom-6 lg:text-7xl lg:-bottom-8 lg:-right-2 2xl:text-8xl 2xl:-bottom-12 2xl:-right-6"></i>
          <Image
            src={'/imgs/tips.png'}
            alt="Serviço"
            width={1000}
            height={1000}
            quality={100}
            className="w-full h-fit z-10 max-w-[640px] sm:min-w-[320px] lg:min-w-[440px] 2xl:min-w-[620px] rounded"
          />
        </div>
        <div className="flex flex-col gap-4 px-4 lg:gap-8 sm:px-0">
          <h2 className="text-secondary dark:text-white font-secondary font-bold text-2xl lg:text-5xl">
            Dicas
          </h2>
          <p className="text-justify leading-7 lg:leading-9 lg:max-w-[500px] lg:text-xl">
            Aqui, compartilharei dicas de filmes, músicas e séries, além de
            recomendações especiais e muito mais. Fique à vontade para explorar
            e se inspirar!
          </p>
          <Link
            href={'#'}
            className="flex items-center justify-center text-white font-medium rounded-full bg-primary opacity-50 px-8 h-10 sm:w-fit lg:px-12 lg:h-12 lg:text-xl"
          >
            Ver dicas
          </Link>
        </div>
      </div>
    </section>
  )
}
