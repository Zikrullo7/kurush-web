'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from './i18n'

type LangContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextType>({
  lang: 'tj',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default 'tj', load from localStorage after hydration
  const [lang, setLangState] = useState<Lang>('tj')

  useEffect(() => {
    const saved = localStorage.getItem('kurushlex_lang')
    if (saved === 'tj' || saved === 'ru') {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('kurushlex_lang', newLang)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
