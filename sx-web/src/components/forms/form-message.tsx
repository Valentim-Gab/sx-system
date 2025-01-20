'use client'

import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
import { sendMessage } from '@/services/messageService'
import React, { FormEvent, useState } from 'react'
import LoaderMessage from '../loaders/loader-message'

export default function FormMessage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const message = form.message.value

    if (!message) {
      return
    }

    setLoading(true)
    const success = await sendMessage(message)
    setLoading(false)

    if (!success) {
      toast({
        title: 'Erro ao enviar mensagem!',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })

      return
    }

    toast({
      title: 'Mensagem enviada!',
      description: 'Avaliaremos sua mensagem e entraremos em contato.',
      className: 'bg-primary text-white border-none',
    })

    form.reset()
  }

  return (
    <div className="flex-auto flex relative">
      <form
        onSubmit={handleSubmit}
        className="flex-auto flex rounded-lg border p-3 pb-12 outline-none bg-[#0000007c] text-white relative sm:p-4 sm:pb-14"
      >
        <textarea
          name="message"
          className="flex-auto resize-none p-1 outline-none bg-transparent sm:p-4"
        ></textarea>
        <Button
          type="submit"
          className="absolute right-2 bottom-2 h-8 px-6 text-white font-medium rounded-full sm:w-fit sm:right-3 sm:bottom-3 lg:h-9 lg:text-lg"
        >
          Enviar
          <i className="icon-[mdi--send] w-4 h-4 ml-3"></i>
        </Button>
      </form>
      <div
        data-loading={loading}
        className="absolute flex flex-col items-center justify-center gap-8 w-full h-full bg-[#000000c7] rounded-lg scale-0 opacity-0 select-none transition-opacity duration-300 data-[loading=true]:scale-100 data-[loading=true]:opacity-100"
      >
        <LoaderMessage className=" h-fit" />
        <h3 className="text-xl text-white">Enviando sua mensagem...</h3>
      </div>
    </div>
  )
}
