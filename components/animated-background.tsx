"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Script from "next/script"

export default function AnimatedBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [vantaInitialized, setVantaInitialized] = useState(false)

  // Устанавливаем mounted в true только на клиенте
  useEffect(() => {
    setMounted(true)
  }, [])

  // Функция для ��роверки доступности Vanta.js
  const isVantaAvailable = () => {
    return (
      typeof window !== "undefined" &&
      window.VANTA !== undefined &&
      window.THREE !== undefined &&
      typeof window.VANTA.WAVES === "function"
    )
  }

  // Функция для инициализации Vanta эффекта
  const initVantaEffect = () => {
    // Проверяем доступность Vanta.js
    if (!isVantaAvailable()) {
      console.warn("VANTA.WAVES is not available, using fallback background")
      return false
    }

    // Очищаем предыдущий эффект при повторной инициализации
    if (vantaEffect) {
      vantaEffect.destroy()
    }

    // Определяем цвета в зависимости от темы
    const currentTheme = resolvedTheme || theme
    const isDarkTheme = currentTheme === "dark"

    // Настройки для темной и светлой темы - МИНИМАЛИСТИЧНЫЕ
    const colorConfig = isDarkTheme
      ? {
          color: 0x2a1b41, // Более темный оттенок dark-accent
          shininess: 15, // Уменьшенный блеск
          waveHeight: 8, // Уменьшенная высота волн
          waveSpeed: 0.4, // Уменьшенная скорость
          zoom: 0.8, // Увеличенный зум для меньшего количества деталей
          backgroundColor: 0x0f0a1a, // Темный фоновый цвет
        }
      : {
          color: 0xffb6c1, // light-accent
          shininess: 15, // Уменьшенный блеск
          waveHeight: 8, // Уменьшенная высота волн
          waveSpeed: 0.4, // Уменьшенная скорость
          zoom: 0.8, // Увеличенный зум для меньшего количества деталей
          backgroundColor: null, // Без фонового цвета для светлой темы
        }

    // Создаем эффект только если элемент существует
    if (vantaRef.current) {
      try {
        // Явно проверяем наличие VANTA.WAVES перед вызовом
        if (typeof window.VANTA?.WAVES !== "function") {
          console.error("VANTA.WAVES is not a function")
          return false
        }

        const newEffect = window.VANTA.WAVES({
          el: vantaRef.current,
          THREE: window.THREE, // Явно передаем THREE
          mouseControls: false, // Отключаем интерактивность с мышью
          touchControls: false, // Отключаем интерактивность с тачскрином
          gyroControls: false, // Отключаем гироскоп
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: colorConfig.color,
          shininess: colorConfig.shininess,
          waveHeight: colorConfig.waveHeight,
          waveSpeed: colorConfig.waveSpeed,
          zoom: colorConfig.zoom,
          backgroundColor: colorConfig.backgroundColor,
          fps: 20, // Ограничиваем FPS для экономии ресурсов
        })

        setVantaEffect(newEffect)
        return true
      } catch (error) {
        console.error("Error initializing VANTA effect:", error)
        return false
      }
    }
    return false
  }

  // Инициализация Vanta эффекта с задержкой после загрузки скриптов
  useEffect(() => {
    if (!mounted || !scriptsLoaded) return

    // Добавляем небольшую задержку для уверенности, что скрипты полностью инициализированы
    const timer = setTimeout(() => {
      const success = initVantaEffect()
      setVantaInitialized(success)
    }, 500)

    return () => {
      clearTimeout(timer)
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [theme, resolvedTheme, mounted, scriptsLoaded])

  // Если не смонтирован, возвращаем пустой div для избежания ошибок гидратации
  if (!mounted) {
    return <div className="fixed top-0 left-0 w-full h-full -z-10" />
  }

  // Создаем CSS-классы для фона в зависимости от темы
  const bgClass =
    resolvedTheme === "dark"
      ? "bg-gradient-to-b from-[#0f0a1a] to-[#1a1025] animated-gradient"
      : "bg-gradient-to-b from-[#fff5f7] to-[#f8f8ff] animated-gradient"

  return (
    <>
      {/* Загружаем скрипты внутри компонента */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        onLoad={() => console.log("THREE.js loaded")}
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
        onLoad={() => {
          console.log("VANTA.js loaded")
          setScriptsLoaded(true)
        }}
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Error loading VANTA.js:", e)
        }}
      />

      {/* Запасной фон на случай, если Vanta не загрузится */}
      <div className={`fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-500 ${bgClass}`} />

      {/* Контейнер для Vanta эффекта */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          opacity: vantaInitialized ? 0.9 : 0, // Показываем только если инициализирован
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </>
  )
}
