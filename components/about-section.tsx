"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin } from "lucide-react"

export default function AboutSection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">{t("about.title")}</h2>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary shadow-lg"
            >
              <img src="/Keiske.jpg?height=200&width=200" alt="Keiske" className="w-full h-full object-cover" />
            </motion.div>

            <div className="flex-1 bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg mb-6"
              >
                {t("about.content")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center text-muted-foreground"
              >
                <MapPin size={18} className="mr-2" />
                <span>{t("about.location")}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
