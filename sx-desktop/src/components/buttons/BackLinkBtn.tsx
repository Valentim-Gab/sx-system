import { Link } from 'react-router-dom'

export default function BackLinkBtn({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-center text-foreground gap-1 w-fit hover:text-primary transition-all duration-200"
    >
      <i className="icon-[solar--alt-arrow-left-bold-duotone] text-xl" />
      <span className="font-normal">Voltar</span>
    </Link>
  )
}
