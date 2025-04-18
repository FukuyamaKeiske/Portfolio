"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink, Lock, Code } from "lucide-react"
import projects, { Project } from "@/config/projects"
import { useLanguage } from "./language-provider"

export default function ProjectsSection() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories = [
    { id: "all", label: t("projects.categories.all") },
    { id: "web", label: t("projects.categories.web") },
    { id: "mobile", label: t("projects.categories.mobile") },
    { id: "desktop", label: t("projects.categories.desktop") },
    { id: "ai", label: t("projects.categories.ai") },
    { id: "scripts", label: t("projects.categories.scripts") },
    { id: "bots", label: t("projects.categories.bots") },
  ]

  const filteredProjects: Project[] =
    activeCategory === "all"
      ? projects
      : projects.filter((project: Project) => project.category === activeCategory)

  const getTranslation = (project: Project) => {
    const lang = language as keyof typeof project.translations
    return project.translations[lang] || project.translations.en
  }

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-6">{t("projects.title")}</h2>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/80 hover:bg-secondary backdrop-blur-sm"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project, index) => {
            const translation = getTranslation(project)

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-card/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={translation.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {project.isOpenSource ? (
                      <span className="bg-pink-300/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {t("projects.tags.openSource")}
                      </span>
                    ) : (
                      <span className="bg-gray-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {t("projects.tags.closedSource")}
                      </span>
                    )}
                    {project.inDevelopment && (
                      <span className="bg-purple-600/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {t("projects.tags.inDevelopment")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{translation.title}</h3>
                  <p className="text-muted-foreground mb-4">{translation.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 absolute bottom-4 left-6">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                        aria-label={`GitHub repository for ${translation.title}`}
                      >
                        <Github size={20} />
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                        aria-label={`Live demo for ${translation.title}`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}

                    {!project.isOpenSource && (
                      <span className="text-muted-foreground" title="Closed source project">
                        <Lock size={20} />
                      </span>
                    )}

                    {project.isOpenSource && !project.github && (
                      <span className="text-muted-foreground" title="Source code available upon request">
                        <Code size={20} />
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}