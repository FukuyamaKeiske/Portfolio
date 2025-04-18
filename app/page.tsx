import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import StackSection from "@/components/stack-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* The animated background is positioned behind everything */}
      <AnimatedBackground />

      <Header />

      {/* Content sections */}
      <div className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <StackSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
