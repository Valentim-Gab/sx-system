import { Message } from '@/interfaces/Message'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { MessageService } from '@/services/MessageService'

export default function Mensagens() {
  const messageService = new MessageService()
  const { data, error, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: messageService.getAll,
  })

  if (isLoading) {
    return (
      <main className="main-container flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="main-container flex">
        <section className="section flex flex-col items-center justify-center gap-4">
          <i className="icon-[solar--danger-broken] text-8xl text-primary" />
          <h2 className="text-primary">Erro ao buscar os posts do Blog!</h2>
        </section>
      </main>
    )
  }

  return (
    <main className="flex-1 flex flex-col p-4">
      <h2 className="font-bold mt-4">Mensagens</h2>
      {data && data.length > 0 && (
        <section className="flex-auto flex flex-col gap-4 mt-4">
          {data.map((message: Message, index: number) => (
            <div
              key={index}
              className="flex flex-col bg-card shadow p-4 rounded-lg dark:border"
            >
              <p className="whitespace-pre-line break-words">
                {message.message}
              </p>
              {message.formatDate && (
                <p className="text-muted-foreground text-sm mt-4 place-self-end">
                  {message.formatDate.date} - {message.formatDate.time}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {!data ||
        (data.length === 0 && (
          <section className="section flex-auto flex flex-col items-center justify-center gap-4 py-16 px-4 mt-4">
            <i className="icon-[solar--chat-round-dots-bold] w-[80px] h-[80px] text-primary"></i>
            <h3 className="text-center">Nenhuma mensagem cadastrada</h3>
          </section>
        ))}
    </main>
  )
}
