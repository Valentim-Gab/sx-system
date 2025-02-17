import { useSidebar } from '../providers/SidebarProvider'

export default function Header({ showSidebar }: { showSidebar?: boolean }) {
  if (!showSidebar) {
    return (
      <header className="w-full flex flex-row justify-end items-center bg-card shadow px-2 py-3 h-14 lg:h-20">
        <img src="/logos/logo.svg" alt="Logo" className="h-full" />
      </header>
    )
  }

  const sidebarContext = useSidebar()

  if (!sidebarContext) {
    return null
  }

  const { dispatch } = sidebarContext

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  return (
    <header className="w-full flex flex-row justify-between items-center bg-card shadow px-2 py-3 h-14 dark:border-b">
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center"
      >
        <i className="icon-[solar--hamburger-menu-linear] h-12 w-12"></i>
      </button>
      <img src="/logos/logo.svg" alt="Logo" className="h-full" />
    </header>
  )
}
