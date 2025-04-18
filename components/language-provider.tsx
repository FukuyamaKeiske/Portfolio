"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "@/locales/en.json"
import translationRU from "@/locales/ru.json"
import translationUA from "@/locales/ua.json"

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ru: { translation: translationRU },
    ua: { translation: translationUA },
  },
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
})

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

type LanguageCode = 'en' | 'ru' | 'ua'

const LanguageContext = createContext<LanguageContextType>({
  language: "ru",
  setLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext) as {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("ru")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ru"
    setLanguage(savedLanguage)
    i18n.changeLanguage(savedLanguage)
  }, [])

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}
