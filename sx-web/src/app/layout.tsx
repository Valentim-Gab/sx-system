import { ThemeProvider } from '@/components/providers/theme-provider'
import { Raleway } from 'next/font/google'
import './globals.scss'
import '@/assets/fonts/fonts.css'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/header/header'
import HeaderMobile from '@/components/header/header-mobile'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata = {
  title: 'Susi Xavier',
  description: 'Site de apresentação de Susana Xavier',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={raleway.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col w-full min-h-screen">
            <Header />
            <HeaderMobile />
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
