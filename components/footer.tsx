"use client"

import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground">
          &copy; {currentYear} Fukuyama Keiske. {t("footer.rights")}
        </p>
      </div>
    </footer>
  )
}
