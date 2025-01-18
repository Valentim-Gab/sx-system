import DashboardBlog from './DashboardBlog'
import DashboardMessages from './DashboardMessages'

export default function Dashboard() {
  return (
    <main className="main-container grid grid-cols-1 gap-4 sm:grid-cols-2">
      <section className="section flex flex-col gap-4 p-8">
        <h1>Dashboard</h1>
        <p className="text-sm">Bem vindo ao painel de controle</p>
      </section>
      <section className="section flex flex-col items-center justify-center gap-4 py-16 px-4">
        <i className="icon-[solar--pie-chart-2-bold-duotone] w-[80px] h-[80px] text-primary"></i>
        <h3 className="text-center">Estatísticas indisponíveis</h3>
      </section>
      <DashboardBlog />
      <DashboardMessages />
    </main>
  )
}
