import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export default function BackLinkBtn({
  to,
  className,
}: {
  to: string
  className?: string
}) {
  return (
    <Link
      to={to}
      className={twMerge(
        'flex items-center justify-center text-foreground gap-1 w-fit hover:text-primary transition-all duration-200',
        className
      )}
    >
      <i className="icon-[solar--alt-arrow-left-bold-duotone] text-xl" />
      <span className="font-normal">Voltar</span>
    </Link>
  )
}
