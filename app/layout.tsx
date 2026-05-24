import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/LanguageContext'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'KurushLex — Юридический помощник Таджикистана',
  description: '200+ законов Таджикистана, AI юрист онлайн, калькулятор штрафов. Бесплатно.',
  keywords: 'закон таджикистан, юрист, қонун, ҳуқуқ, AI, КоАП, ТК, СК',
  authors: [{ name: 'KurushLex' }],
  openGraph: {
    title: 'KurushLex — Юридический помощник Таджикистана',
    description: '200+ законов Таджикистана, AI юрист онлайн, калькулятор штрафов. Бесплатно.',
    url: 'https://kurushlex.tj',
    siteName: 'KurushLex',
    locale: 'tg_TJ',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tg" className={inter.variable}>
      <body style={{ background: '#0A1628', color: '#FFFFFF', fontFamily: 'Inter, sans-serif' }}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
