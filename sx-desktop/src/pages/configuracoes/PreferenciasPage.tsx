import { useTheme } from '@/components/providers/ThemeProvider'
import BackLinkBtn from '@/components/buttons/BackLinkBtn'
import ThemeButton from '@/components/buttons/ThemeButton/ThemeButton'

export default function PreferenciasPage() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="main-container flex flex-col">
      <section className="">
        <BackLinkBtn to="/dashboard/configuracoes" />
      </section>
      <section className="flex-auto flex items-center justify-center">
        <div className="section w-fit p-2 sm:p-6">
          <h3>Tema do sistema</h3>
          <ThemeButton theme={theme} onChange={setTheme} />
        </div>
      </section>
    </main>
  )
}
