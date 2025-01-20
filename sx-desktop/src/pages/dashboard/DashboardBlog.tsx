import { BlogService } from '@/services/BlogService'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Message } from '@/interfaces/Message'
import InnerHtmlContainer from '@/components/InnerHtmlContainer/InnerHtmlContainer'

export default function DashboardBlog() {
  const blogService = new BlogService()
  const { data, error, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: blogService.getAll,
  })

  if (isLoading) {
    return (
      <section className="section flex flex-col items-center justify-center gap-4 p-4">
        <Loader2 className="h-16 w-16 animate-spin" />
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className="section flex flex-col items-center justify-center gap-4 p-4">
        <i className="icon-[solar--danger-broken] text-7xl text-primary" />
        <h3 className="text-primary">Erro ao buscar os posts do Blog!</h3>
      </section>
    )
  }

  return (
    <section className="section flex flex-col items-center p-8">
      <div className="flex-auto w-full flex flex-col gap-4 mb-8 max-h-[250px] overflow-y-auto">
        {data &&
          data.length > 0 &&
          data.slice(0, 5).map((blogMessage: Message, index: number) => (
            <article
              key={index}
              className="flex flex-col bg-background-secondary py-2 px-4 rounded-lg w-full"
            >
              <InnerHtmlContainer html={blogMessage.message} />
            </article>
          ))}
      </div>
      {!data ||
        (data.length === 0 && (
          <div className="flex-auto flex flex-col items-center justify-center mb-8 gap-4">
            <i className="icon-[solar--chat-square-like-bold] w-[80px] h-[80px] text-primary"></i>
            <h3 className="text-center">Você ainda não publicou nada</h3>
          </div>
        ))}
      <Link
        to="blog"
        className="bg-secondary text-white py-2 px-4 rounded-lg font-bold"
      >
        Acessar blog
      </Link>
    </section>
  )
}
