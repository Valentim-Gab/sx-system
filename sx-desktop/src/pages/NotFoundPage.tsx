import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-4 sm:p-8">
      <section className="section flex flex-col items-center justify-center w-full max-w-[480px] h-[480px] p-4 sm:p-8">
        <div className="flex flex-col items-center justify-center">
          <span>
            <i className="icon-[solar--folder-error-bold-duotone] w-24 h-24 text-primary"></i>
          </span>
          <div className="flex flex-col text-center gap-2 mt-2">
            <h1 className="text-2xl font-bold">Erro 404</h1>
            <p>Página não encontrada.</p>
          </div>
          <Link
            to="/"
            className="bg-primary px-16 py-2 rounded-lg text-white mt-4 hover:brightness-75 transition-all duration-200 flex items-center justify-center gap-1"
          >
            <span className="font-bold">Início</span>
            <i className="icon-[solar--alt-arrow-right-bold-duotone] text-xl"></i>
          </Link>
        </div>
      </section>
    </main>
  )
}
