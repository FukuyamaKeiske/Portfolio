"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Gitlab, Mail, MessageSquare, ExternalLink, MessageCircle } from "lucide-react"

export default function ContactSection() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormStatus("success")
      setFormState({ name: "", email: "", message: "" })

      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    } catch (error) {
      setFormStatus("error")
    }
  }

  const socialLinks = [
    { icon: <Github size={24} />, url: "https://github.com/FukuyamaKeiske", label: "GitHub" },
    { icon: <Gitlab size={24} />, url: "https://gitlab.com/fukuyama_keiske", label: "GitLab" },
    { icon: <ExternalLink size={24} />, url: "https://gitflic.ru/user/fukuyamakeiske", label: "GitFlic" },
    { icon: <MessageSquare size={24} />, url: "https://t.me/Fukuyama_Keiske", label: "Telegram" },
    { icon: <Mail size={24} />, url: "mailto:verve@is-god.ru", label: "Email" },
    { icon: <MessageCircle size={24} />, url: "https://discord.com/users/keiske_fukuyama", label: "Discord" },
  ]

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">{t("contact.title")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6 bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
                >
                  {formStatus === "submitting" ? "..." : t("contact.send")}
                </button>

                {formStatus === "success" && <p className="text-pink-300 mt-2">{t("contact.success")}</p>}

                {formStatus === "error" && <p className="text-purple-600 mt-2">{t("contact.error")}</p>}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col justify-center"
            >
              <div className="grid grid-cols-3 gap-4 mb-8 bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-secondary/80 transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                    <span className="text-xs mt-2">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
