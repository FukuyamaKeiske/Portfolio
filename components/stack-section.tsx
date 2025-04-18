"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface TechStack {
  category: string
  items: {
    name: string
    icon: string
  }[]
}

export default function StackSection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const techStacks: TechStack[] = [
    {
      category: t("stack.frontend"),
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Vue.js", icon: "🟢" },
        { name: "Next.js", icon: "▲" },
        { name: "TypeScript", icon: "🔷" },
        { name: "Tailwind CSS", icon: "🌊" },
        { name: "GSAP", icon: "🎭" },
        { name: "Framer Motion", icon: "🔄" },
      ],
    },
    {
      category: t("stack.backend"),
      items: [
        { name: "Node.js", icon: "🟩" },
        { name: "Python", icon: "🐍" },
        { name: "FastAPI", icon: "⚡" },
        { name: "MongoDB", icon: "🍃" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Firebase", icon: "🔥" },
      ],
    },
    {
      category: t("stack.mobile"),
      items: [
        { name: "Kotlin", icon: "🟪" },
        { name: "Java", icon: "☕" },
        { name: "Flutter", icon: "💙" },
        { name: "Dart", icon: "🎯" },
        { name: "Android SDK", icon: "🤖" },
        { name: "iOS", icon: "🍎" },
        { name: "React Native", icon: "📱" },
      ],
    },
    {
      category: t("stack.other"),
      items: [
        { name: "Docker", icon: "🐳" },
        { name: "Git", icon: "📝" },
        { name: "GitHub Actions", icon: "🔄" },
        { name: "AWS", icon: "☁️" },
        { name: "Vercel", icon: "▲" },
        { name: "Figma", icon: "🎨" },
      ],
    },
  ]

  return (
    <section id="stack" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-6">{t("stack.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStacks.map((stack, stackIndex) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: stackIndex * 0.2 }}
              className="bg-card/90 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 text-center">{stack.category}</h3>

              <div className="grid grid-cols-3 gap-4">
                {stack.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: stackIndex * 0.2 + itemIndex * 0.1 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-secondary/80 backdrop-blur-sm transition-colors"
                  >
                    <span className="text-2xl mb-2" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="text-sm text-center">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
