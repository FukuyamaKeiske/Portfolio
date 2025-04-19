"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  baseSize: number // Базовый размер для анимации
  speedX: number
  speedY: number
  color: string
  originalX: number
  originalY: number
  opacity: number // Добавляем контроль прозрачности
  active: boolean // Флаг активности для анимации
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRectRef = useRef<DOMRect | null>(null)
  const isHeroVisibleRef = useRef(true)
  const { theme, resolvedTheme } = useTheme()
  const particlesRef = useRef<Particle[]>([])
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)
  const isMouseInHeroRef = useRef(false)
  const lastMouseMoveTimeRef = useRef(0)
  const canvasVisibleRef = useRef(true)

  // Максимальное количество частиц
  const MAX_PARTICLES = 100 // Увеличиваем количество частиц

  // Используем useCallback для функций, чтобы они не пересоздавались при каждом рендере
  const updateHeroRect = useCallback(() => {
    const heroSection = document.getElementById("hero")
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect()
      heroRectRef.current = rect

      // Проверяем, видима ли секция hero (хотя бы частично)
      const isVisible =
        rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth

      // Обновляем видимость только если она изменилась
      if (isHeroVisibleRef.current !== isVisible) {
        isHeroVisibleRef.current = isVisible
        canvasVisibleRef.current = isVisible
        
        // Обновляем стиль canvas
        const canvas = canvasRef.current
        if (canvas) {
          canvas.style.opacity = isVisible ? "1" : "0"
        }
      }

      // Обновляем canvas только если он существует
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = rect.height
        
        // Фиксируем canvas к верху hero секции
        canvas.style.position = "fixed"
        canvas.style.top = `${rect.top}px`
        canvas.style.left = "0"
      }
    }
  }, [])

  // Добавление частицы
  const addParticle = useCallback(
    (x?: number, y?: number, isActive: boolean = false) => {
      // Если достигнут максимум, не добавляем больше
      if (particlesRef.current.length >= MAX_PARTICLES) {
        // Заменяем самую старую частицу
        particlesRef.current.shift()
      }

      const currentTheme = resolvedTheme || theme
      // Более яркие цвета для темной темы
      const lightColors = ["#FFB6C1", "#E6E6FA", "#F5F5F5"]
      const darkColors = ["#9A8AFF", "#B0A0FF", "#C6B6FF"] // Делаем цвета ярче

      const colors = currentTheme === "dark" ? darkColors : lightColors
      const canvas = canvasRef.current
      const heroRect = heroRectRef.current

      if (!canvas || !heroRect) return

      // Если координаты не указаны, создаем частицу в случайном месте в пределах hero секции
      const posX = x !== undefined ? x : Math.random() * canvas.width
      const posY = y !== undefined ? y : Math.random() * canvas.height
      
      // Базовый размер частиц увеличен
      const baseSize = Math.random() * 5 + 2 // Увеличиваем размер частиц

      particlesRef.current.push({
        x: posX,
        y: posY,
        originalX: posX,
        originalY: posY,
        size: baseSize,
        baseSize: baseSize,
        speedX: Math.random() * 0.6 - 0.3, // Уменьшаем начальную скорость для более плавного движения
        speedY: Math.random() * 0.6 - 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: isActive ? 1 : 0.7, // Активные частицы более яркие
        active: isActive,
      })
    },
    [resolvedTheme, theme]
  )

  // Инициализация частиц
  const initParticles = useCallback(() => {
    particlesRef.current = []
    const canvas = canvasRef.current
    if (!canvas) return

    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 20000), MAX_PARTICLES)

    for (let i = 0; i < particleCount; i++) {
      addParticle()
    }
  }, [addParticle])

  // Обработчик изменения размера окна
  const handleResize = useCallback(() => {
    updateHeroRect()
    initParticles()
  }, [updateHeroRect, initParticles])

  // Основной эффект для настройки canvas и анимации
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let lastDrawTime = 0
    const FPS_LIMIT = 60 // Увеличиваем FPS для более плавной анимации

    // Инициализация
    handleResize()

    // Взаимодействие с мышью
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
      mouseYRef.current = e.clientY
      lastMouseMoveTimeRef.current = Date.now()

      // Проверяем, находится ли мышь в пределах hero секции
      if (heroRectRef.current) {
        const heroRect = heroRectRef.current
        isMouseInHeroRef.current =
          mouseYRef.current >= heroRect.top &&
          mouseYRef.current <= heroRect.bottom &&
          mouseXRef.current >= heroRect.left &&
          mouseXRef.current <= heroRect.right
      }

      // Добавляем частицы в позиции мыши реже и только если мышь в hero
      if (isMouseInHeroRef.current && Math.random() > 0.85 && particlesRef.current.length < MAX_PARTICLES) {
        const heroRect = heroRectRef.current
        if (heroRect) {
          // Создаем активную частицу в позиции курсора
          addParticle(mouseXRef.current, mouseYRef.current - window.scrollY, true)
        }
      }
    }

    // Цикл анимации
    const animate = (timestamp: number) => {
      // Ограничение частоты кадров
      if (timestamp - lastDrawTime < 1000 / FPS_LIMIT) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      lastDrawTime = timestamp
      
      // Обновляем позицию canvas при прокрутке
      updateHeroRect()
      
      // Если hero секция не видна, не рисуем частицы
      if (!isHeroVisibleRef.current) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Время с последнего движения мыши
      const timeSinceLastMouseMove = Date.now() - lastMouseMoveTimeRef.current
      const isMouseActive = timeSinceLastMouseMove < 2000 // Мышь считается активной в течение 2 секунд после последнего движения

      // Обновление и отрисовка частиц
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i]

        // Перемещение частиц
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Взаимодействие с мышью - ВСЕГДА, если мышь в hero секции
        if (isMouseInHeroRef.current && isMouseActive) {
          const heroRect = heroRectRef.current
          if (heroRect) {
            const mouseY = mouseYRef.current - window.scrollY
            const dx = mouseXRef.current - particle.x
            const dy = mouseY - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 200 // Увеличиваем радиус действия

            if (distance < maxDistance) {
              const angle = Math.atan2(dy, dx)
              const force = (maxDistance - distance) / maxDistance
              
              // Усиливаем эффект притяжения
              particle.speedX += Math.cos(angle) * force * 0.3
              particle.speedY += Math.sin(angle) * force * 0.3
              
              // Увеличиваем размер частиц при приближении к курсору
              const sizeFactor = 1 + (1 - distance / maxDistance) * 1.5
              particle.size = particle.baseSize * sizeFactor
              
              // Увеличиваем непрозрачность при приближении к курсору
              particle.opacity = Math.min(1, particle.opacity + force * 0.3)
              
              // Помечаем частицу как активную
              particle.active = true
            } else {
              // Если мышь далеко, частицы медленно возвращаются к исходной позиции
              particle.speedX += (particle.originalX - particle.x) * 0.002
              particle.speedY += (particle.originalY - particle.y) * 0.002
              
              // Постепенно возвращаем размер к базовому
              particle.size = particle.baseSize + (particle.size - particle.baseSize) * 0.95
              
              // Постепенно уменьшаем непрозрачность
              particle.opacity = Math.max(0.7, particle.opacity * 0.99)
              
              // Постепенно деактивируем частицу
              particle.active = false
            }
          }
        } else {
          // Если мышь не в hero, частицы возвращаются к исходной позиции
          particle.speedX += (particle.originalX - particle.x) * 0.01
          particle.speedY += (particle.originalY - particle.y) * 0.01
          
          // Постепенно возвращаем размер к базовому
          particle.size = particle.baseSize + (particle.size - particle.baseSize) * 0.95
          
          // Постепенно уменьшаем непрозрачность
          particle.opacity = Math.max(0.7, particle.opacity * 0.99)
          
          // Деактивируем частицу
          particle.active = false
        }

        // Проверка границ
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.5 // Уменьшаем отскок
          particle.x = Math.max(0, Math.min(particle.x, canvas.width))
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.5 // Уменьшаем отскок
          particle.y = Math.max(0, Math.min(particle.y, canvas.height))
        }

        // Ограничение скорости
        const maxSpeed = 2.5 // Увеличиваем максимальную скорость
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)

        if (speed > maxSpeed) {
          particle.speedX = (particle.speedX / speed) * maxSpeed
          particle.speedY = (particle.speedY / speed) * maxSpeed
        }

        // Трение для постепенного замедления
        particle.speedX *= 0.98
        particle.speedY *= 0.98

        // Отрисовка частицы
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Используем непрозрачность частицы
        const hexOpacity = Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")
        ctx.fillStyle = particle.color + hexOpacity
        ctx.fill()

        // Соединяем частицы линиями - более интенсивно
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j]
          const dx = particle.x - p2.x
          const dy = particle.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Увеличиваем дистанцию соединения для активных частиц
          const connectionDistance = (particle.active || p2.active) ? 150 : 100
          
          if (distance < connectionDistance) {
            // Рассчитываем непрозрачность линии
            const lineOpacity = (1 - distance / connectionDistance) * 
                               (particle.active || p2.active ? 1 : 0.7)
            
            const hexLineOpacity = Math.floor(lineOpacity * 255)
                                  .toString(16)
                                  .padStart(2, "0")
            
            // Используем цвет более активной частицы
            const lineColor = (particle.active && p2.active) 
                            ? resolvedTheme === "dark" ? "#B0A0FF" : "#FFB6C1"
                            : particle.active ? particle.color : p2.color
            
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `${lineColor}${hexLineOpacity}`
            
            // Увеличиваем толщину линии для активных частиц
            ctx.lineWidth = (particle.active || p2.active) ? 0.8 : 0.4
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Добавляем обработчики событий
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Запускаем анимацию
    animate(0)

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [handleResize, updateHeroRect, addParticle, resolvedTheme, theme])

  return (
    <canvas
      ref={canvasRef}
      className="w-full z-20 transition-opacity duration-300"
      style={{
        pointerEvents: "none",
        transform: "translateZ(0)", // Принудительное использование аппаратного ускорения
        opacity: canvasVisibleRef.current ? 1 : 0,
      }}
    />
  )
}
