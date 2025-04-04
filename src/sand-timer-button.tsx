"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/sand-timer-button.css"

interface SandTimerButtonProps extends BaseButtonProps {
  fillDuration?: number
  fillColor?: string
  onComplete?: () => void
  particleCount?: number
  particleSize?: number
  hourglassShape?: boolean
  sandColor?: string | string[]
  sandGradient?: boolean
  sandOpacity?: number
  glassOpacity?: number
  glassColor?: string
  showProgress?: boolean
  progressColor?: string
  completionEffect?: "pulse" | "shake" | "glow" | "none"
  completionDelay?: number
  resetAfterComplete?: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  speedFactor: number
  opacity: number
  rotation: number
  shape: "circle" | "square" | "diamond"
}

const SandTimerButton: React.FC<SandTimerButtonProps> = ({
  children,
  className = "",
  fillDuration = 2000,
  fillColor,
  onComplete,
  particleCount = 60,
  particleSize = 4,
  hourglassShape = true,
  sandColor = "#f59e0b",
  sandGradient = true,
  sandOpacity = 0.9,
  glassOpacity = 0.2,
  glassColor = "#ffffff",
  showProgress = true,
  progressColor,
  completionEffect = "pulse",
  completionDelay = 300,
  resetAfterComplete = true,
  ...props
}) => {
  const [isFilling, setIsFilling] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const particlesContainerRef = useRef<HTMLDivElement>(null)

  // Determine actual colors
  const actualProgressColor = progressColor || (typeof sandColor === "string" ? sandColor : sandColor[0])

  // Generate sand particles
  useEffect(() => {
    if (!isFilling) return

    const colors = Array.isArray(sandColor) ? sandColor : [sandColor]
    const shapes: ("circle" | "square" | "diamond")[] = ["circle", "square", "diamond"]

    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const delay = (i / particleCount) * fillDuration * 0.8
      const x = hourglassShape
        ? 50 + (Math.random() - 0.5) * 20 // Narrower distribution for hourglass
        : Math.random() * 100 // Full width distribution
      const size = Math.random() * particleSize + particleSize / 2
      const colorIndex = sandGradient
        ? Math.floor((i / particleCount) * colors.length)
        : Math.floor(Math.random() * colors.length)
      const color = colors[colorIndex % colors.length]

      newParticles.push({
        id: i,
        x,
        y: -10, // Start above the button
        size,
        color,
        delay,
        speedFactor: 0.8 + Math.random() * 0.4,
        opacity: sandOpacity * (0.7 + Math.random() * 0.3),
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    setParticles(newParticles)
  }, [isFilling, particleCount, particleSize, sandColor, sandGradient, sandOpacity, hourglassShape, fillDuration])

  // Animation for progress and completion
  useEffect(() => {
    if (!isFilling) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const newProgress = Math.min(elapsed / fillDuration, 1)

      setProgress(newProgress)

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Complete the filling
        setIsFilling(false)
        setIsCompleted(true)

        // Trigger completion callback after a delay
        setTimeout(() => {
          onComplete?.()

          // Reset after completion if enabled
          if (resetAfterComplete) {
            setTimeout(() => {
              setIsCompleted(false)
              setProgress(0)
              setParticles([])
            }, completionDelay)
          }
        }, completionDelay)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isFilling, fillDuration, onComplete, resetAfterComplete, completionDelay])

  // Handle click to start filling
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isFilling || isCompleted) return

    setIsFilling(true)
    setProgress(0)
    startTimeRef.current = 0

    props.onClick?.(e)
  }

  // Render particle based on its shape
  const renderParticle = (particle: Particle) => {
    const baseStyle: React.CSSProperties = {
      left: `${particle.x}%`,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      opacity: particle.opacity,
      animationDelay: `${particle.delay}ms`,
      animationDuration: `${fillDuration * particle.speedFactor}ms`,
    }

    switch (particle.shape) {
      case "square":
        return (
          <div
            className="sand-timer-button__particle sand-timer-button__particle--square"
            style={{
              ...baseStyle,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          />
        )
      case "diamond":
        return (
          <div
            className="sand-timer-button__particle sand-timer-button__particle--diamond"
            style={{
              ...baseStyle,
              transform: `rotate(${particle.rotation + 45}deg)`,
            }}
          />
        )
      case "circle":
      default:
        return <div className="sand-timer-button__particle" style={baseStyle} />
    }
  }

  return (
    <div className="sand-timer-button-container">
      <BaseButton
        ref={buttonRef}
        className={`sand-timer-button ${className} ${isFilling ? "is-filling" : ""} ${isCompleted ? `is-completed is-completed--${completionEffect}` : ""}`}
        onClick={handleClick}
        disabled={isFilling || isCompleted}
        {...props}
      >
        <span className="sand-timer-button__content">{children}</span>

        {hourglassShape && (
          <div className="sand-timer-button__hourglass">
            <div
              className="sand-timer-button__hourglass-top"
              style={{ backgroundColor: glassColor, opacity: glassOpacity }}
            />
            <div
              className="sand-timer-button__hourglass-middle"
              style={{ backgroundColor: glassColor, opacity: glassOpacity }}
            />
            <div
              className="sand-timer-button__hourglass-bottom"
              style={{ backgroundColor: glassColor, opacity: glassOpacity }}
            />
          </div>
        )}

        {showProgress && (
          <div className="sand-timer-button__progress-container">
            <div
              className="sand-timer-button__progress"
              style={{
                height: `${progress * 100}%`,
                backgroundColor: actualProgressColor,
                opacity: sandOpacity,
              }}
            />
          </div>
        )}

        <div className="sand-timer-button__particles-container" ref={particlesContainerRef}>
          {particles.map((particle) => renderParticle(particle))}
        </div>
      </BaseButton>
    </div>
  )
}

export default SandTimerButton

