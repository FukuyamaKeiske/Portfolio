"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 2
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    const animate = () => {
      time += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      const lightColors = ["rgba(255, 182, 193, 0.2)", "rgba(230, 230, 250, 0.2)", "rgba(245, 245, 245, 0.2)"]
      const darkColors = ["rgba(74, 59, 113, 0.2)", "rgba(106, 90, 255, 0.2)", "rgba(138, 122, 255, 0.2)"]

      const colors = theme === "dark" ? darkColors : lightColors

      for (let i = 0; i < colors.length; i++) {
        drawWave(ctx, time + i * 0.5, colors[i], canvas.width, canvas.height, 0.5 + i * 0.2)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const drawWave = (
      ctx: CanvasRenderingContext2D,
      time: number,
      color: string,
      width: number,
      height: number,
      amplitude: number,
    ) => {
      ctx.beginPath()
      ctx.moveTo(0, height / 2)

      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.003 + time) * amplitude * 50 + height / 2
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
