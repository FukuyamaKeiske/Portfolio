"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let scrollY = window.scrollY
    let lastScrollY = scrollY
    let time = 0

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight * 1.5)

      drawWaves()
    }

    const drawWaves = () => {
      const currentTheme = resolvedTheme || theme

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const lightColors = [
        "rgba(255, 182, 193, 0.3)",
        "rgba(255, 182, 193, 0.2)",
        "rgba(255, 182, 193, 0.1)",
        "rgba(230, 230, 250, 0.25)",
        "rgba(230, 230, 250, 0.15)",
      ]

      const darkColors = [
        "rgba(74, 59, 113, 0.35)",
        "rgba(74, 59, 113, 0.25)",
        "rgba(74, 59, 113, 0.15)",
        "rgba(106, 90, 255, 0.2)",
        "rgba(138, 122, 255, 0.15)",
      ]

      const colors = currentTheme === "dark" ? darkColors : lightColors

      const totalWaves = 7

      for (let i = 0; i < totalWaves; i++) {
        const noiseOffset = Math.sin(time * 0.1 + i) * 0.2
        const amplitude = 0.4 + (i / totalWaves) * 0.6 + noiseOffset
        const frequency = 0.003 + Math.sin(time * 0.05 + i * 2) * 0.001
        const speed = 0.15 + (i / totalWaves) * 0.4 + Math.cos(time * 0.1) * 0.05
        const parallaxFactor = 0.05 + (i / totalWaves) * 0.5

        const positionOffset = Math.sin(time * 0.2 + i * 3) * canvas.height * 0.05

        drawWave(
          ctx,
          time * speed,
          colors[i % colors.length],
          canvas.width,
          canvas.height,
          amplitude,
          frequency * (1 + Math.sin(time * 0.1 + i) * 0.3),
          scrollY * parallaxFactor,
          i * (canvas.height / (totalWaves - 0.5)) + positionOffset,
        )
      }
    }

    const drawWave = (
      ctx: CanvasRenderingContext2D,
      time: number,
      color: string,
      width: number,
      height: number,
      amplitude: number,
      frequency: number,
      scrollOffset: number,
      baseY: number,
    ) => {
      const waveHeight = height / 5

      ctx.beginPath()

      const startY = baseY + Math.sin(time) * waveHeight * amplitude - scrollOffset * 0.1
      ctx.moveTo(0, startY)

      for (let x = 0; x <= width + 50; x += 5) {
        const chaos = Math.sin(x * 0.01 + time * 2) * 10 

        const y =
          baseY +
          Math.sin(x * frequency + time) * waveHeight * amplitude +
          Math.sin(x * frequency * 1.5 + time * 1.3) * waveHeight * amplitude * 0.3 +
          Math.sin(x * frequency * 0.5 + time * 0.7) * waveHeight * amplitude * 0.2 +
          chaos -
          scrollOffset * 0.1

        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, baseY - waveHeight, 0, baseY + waveHeight * 2)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, "rgba(0,0,0,0)")

      ctx.fillStyle = gradient
      ctx.fill()
    }

    const handleScroll = () => {
      lastScrollY = scrollY
      scrollY = window.scrollY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    handleResize()

    const animate = () => {
      time += 0.01
      drawWaves()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        opacity: 1,
        transform: "translateZ(0)",
      }}
    />
  )
}
