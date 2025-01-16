import { twMerge } from 'tailwind-merge'
import { Theme } from '@/components/providers/ThemeProvider'
import './ThemeButton.scss'

interface ThemeButtonProps {
  className?: string
  theme: Theme
  onChange: (theme: Theme) => void
}

export default function ThemeButton({
  className,
  theme,
  onChange,
}: ThemeButtonProps) {
  const handleTheme = () => {
    if (theme == 'light') {
      onChange('dark')
    } else {
      onChange('light')
    }
  }

  return (
    <div className={twMerge('theme', className)}>
      <input
        id="switch"
        type="checkbox"
        checked={theme == 'dark'}
        onChange={handleTheme}
      />
      <div className="app-theme dark:border-2 dark:border-secondary">
        <nav>
          <time className="time">4:20 AM</time>
          <div className="icons">
            <span className="network"></span>
            <span className="battery"></span>
          </div>
        </nav>
        <div className="circle"></div>
        <label htmlFor="switch">
          <span className="light">light</span>
          <span>dark</span>
        </label>
      </div>
    </div>
  )
}
