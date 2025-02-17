import { Message } from '@/interfaces/Message'
import { BlogService } from '@/services/BlogService'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import FormBlog from '@/components/forms/FormBlog'
import InnerHtmlContainer from '@/components/InnerHtmlContainer/InnerHtmlContainer'

export default function Blog() {
  const blogService = new BlogService()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: blogService.getAll,
  })

  if (isLoading) {
    return (
      <main className="main-container flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </main>
    )
  }

  if (error || !data) {
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
      <section className="section flex flex-col gap-8 p-8">
        <h1 className="font-bold">Publicar mensagem</h1>
        <FormBlog onRefresh={refetch} />
      </section>
      <h2 className="font-bold mt-4">Publicações</h2>
      {data && data.length > 0 && (
        <section className="flex-auto flex flex-col gap-4 mt-4">
          {data.map((blogMessage: Message, index: number) => (
            <div
              key={index}
              className="flex flex-col bg-card shadow p-4 rounded-lg dark:border"
            >
              <InnerHtmlContainer html={blogMessage.message} />
              {blogMessage.formatDate && (
                <p className="text-muted-foreground text-sm mt-4 place-self-end">
                  {blogMessage.formatDate.date} - {blogMessage.formatDate.time}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {!data ||
        (data.length === 0 && (
          <section className="section flex flex-col items-center justify-center gap-4 py-16 px-4 mt-4">
            <i className="icon-[solar--chat-square-like-bold] w-[80px] h-[80px] text-primary"></i>
            <h3 className="text-center">Você ainda não publicou nada</h3>
          </section>
        ))}
    </main>
  )
}
