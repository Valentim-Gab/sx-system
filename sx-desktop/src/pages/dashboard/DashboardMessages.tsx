import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Message } from '@/interfaces/Message'
import { MessageService } from '@/services/MessageService'

export default function DashboardMessages() {
  const messageService = new MessageService()
  const { data, error, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: messageService.getAll,
  })

  if (isLoading) {
    return (
      <section className="section flex flex-col items-center justify-center gap-4 p-4">
        <Loader2 className="h-16 w-16 animate-spin" />
      </section>
    )
  }

  if (error) {
    return (
      <section className="section flex flex-col items-center justify-center gap-4 p-4">
        <i className="icon-[solar--danger-broken] text-7xl text-primary" />
        <h3 className="text-primary">Erro ao buscar os posts do Blog!</h3>
      </section>
    )
  }

  return (
    <section className="section flex flex-col items-center p-8">
      {data && data.length > 0 && (
        <>
          <div className="flex-auto w-full flex flex-col gap-4 mb-8 max-h-[250px] overflow-y-auto">
            {data.slice(0, 5).map((message: Message, index: number) => (
              <article
                key={index}
                className="flex flex-col bg-background-secondary py-2 px-4 rounded-lg w-full"
              >
                <p className="whitespace-pre-wrap break-words">
                  {message.message}
                </p>
              </article>
            ))}
          </div>
          <Link
            to="mensagens"
            className="bg-secondary text-white py-2 px-4 rounded-lg font-bold"
          >
            Acessar mensagens
          </Link>
        </>
      )}

      {!data ||
        (data.length === 0 && (
          <div className="flex-auto flex flex-col items-center justify-center gap-4">
            <i className="icon-[solar--chat-round-dots-bold] w-[80px] h-[80px] text-primary"></i>
            <h3 className="text-center">Nenhuma mensagem recebida</h3>
          </div>
        ))}
    </section>
  )
}
