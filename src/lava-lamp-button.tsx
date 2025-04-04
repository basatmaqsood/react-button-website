"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/lava-lamp-button.css"

interface LavaLampButtonProps extends BaseButtonProps {
  waveSpeed?: number
  blobSize?: number
  colorTransition?: boolean
  blobCount?: number
  primaryColor?: string
  secondaryColor?: string
  blendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "difference"
    | "exclusion"
  viscosity?: number
  interactOnHover?: boolean
  glowIntensity?: number
  backgroundOpacity?: number
  borderWidth?: number
  borderColor?: string
  textBlendMode?: "normal" | "difference" | "exclusion" | "overlay"
  textColor?: string
}

interface Blob {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  hue: number
  targetX?: number
  targetY?: number
}

const LavaLampButton: React.FC<LavaLampButtonProps> = ({
  children,
  className = "",
  waveSpeed = 1,
  blobSize = 0.5,
  colorTransition = true,
  blobCount = 5,
  primaryColor = "#ff6b6b",
  secondaryColor = "#4ecdc4",
  blendMode = "normal",
  viscosity = 0.95,
  interactOnHover = true,
  glowIntensity = 0,
  backgroundOpacity = 1,
  borderWidth = 2,
  borderColor = "rgba(255, 255, 255, 0.5)",
  textBlendMode = "difference",
  textColor,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const blobsRef = useRef<Blob[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize blobs
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const rect = container.getBoundingClientRect()

    setDimensions({ width: rect.width, height: rect.height })
    canvas.width = rect.width
    canvas.height = rect.height

    // Create blobs with varying sizes and speeds
    const newBlobs: Blob[] = []
    for (let i = 0; i < blobCount; i++) {
      const radius = (20 + Math.random() * 30) * blobSize
      const speedFactor = 1 / (radius / 20) // Smaller blobs move faster

      newBlobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        speedX: (Math.random() - 0.5) * waveSpeed * speedFactor,
        speedY: (Math.random() - 0.5) * waveSpeed * speedFactor,
        hue: Math.random() * 360,
      })
    }

    blobsRef.current = newBlobs
  }, [blobCount, blobSize, waveSpeed])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return

      const canvas = canvasRef.current
      const container = containerRef.current
      const rect = container.getBoundingClientRect()

      setDimensions({ width: rect.width, height: rect.height })
      canvas.width = rect.width
      canvas.height = rect.height

      // Adjust blob positions to fit new dimensions
      blobsRef.current = blobsRef.current.map((blob) => ({
        ...blob,
        x: (blob.x / canvas.width) * rect.width,
        y: (blob.y / canvas.height) * rect.height,
      }))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactOnHover || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })
  }

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set global composite operation based on blend mode
    ctx.globalCompositeOperation = blendMode as GlobalCompositeOperation

    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - backgroundOpacity})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw blobs
      blobsRef.current.forEach((blob, index) => {
        // Update position
        blob.x += blob.speedX
        blob.y += blob.speedY

        // Bounce off edges with damping
        if (blob.x < blob.radius) {
          blob.x = blob.radius
          blob.speedX = -blob.speedX * viscosity
        }
        if (blob.x > canvas.width - blob.radius) {
          blob.x = canvas.width - blob.radius
          blob.speedX = -blob.speedX * viscosity
        }
        if (blob.y < blob.radius) {
          blob.y = blob.radius
          blob.speedY = -blob.speedY * viscosity
        }
        if (blob.y > canvas.height - blob.radius) {
          blob.y = canvas.height - blob.radius
          blob.speedY = -blob.speedY * viscosity
        }

        // Update hue if color transition is enabled
        if (colorTransition) {
          blob.hue = (blob.hue + 0.1 * waveSpeed) % 360
        }

        // Attract blobs to mouse if hovered
        if (isHovered && interactOnHover) {
          const dx = mousePos.x - blob.x
          const dy = mousePos.y - blob.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const force = ((150 - distance) / 150) * 0.05
            blob.speedX += dx * force
            blob.speedY += dy * force
          }

          // Apply maximum speed limit
          const maxSpeed = 2 * waveSpeed
          const currentSpeed = Math.sqrt(blob.speedX * blob.speedX + blob.speedY * blob.speedY)
          if (currentSpeed > maxSpeed) {
            const ratio = maxSpeed / currentSpeed
            blob.speedX *= ratio
            blob.speedY *= ratio
          }
        }

        // Draw blob with gradient
        ctx.beginPath()

        // Create gradient
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)

        if (colorTransition) {
          const hue1 = blob.hue
          const hue2 = (blob.hue + 40) % 360
          gradient.addColorStop(0, `hsla(${hue1}, 100%, 70%, 0.8)`)
          gradient.addColorStop(0.5, `hsla(${hue1}, 90%, 60%, 0.5)`)
          gradient.addColorStop(1, `hsla(${hue2}, 80%, 50%, 0)`)
        } else {
          const color1 = primaryColor
          const color2 = secondaryColor
          gradient.addColorStop(0, color1 + "cc") // Add alpha
          gradient.addColorStop(0.6, color1 + "80")
          gradient.addColorStop(1, color2 + "00") // Transparent
        }

        ctx.fillStyle = gradient

        // Draw with bezier curves for more organic shape
        const wobble = Math.sin(Date.now() * 0.001 * waveSpeed + index) * 5 * blobSize

        ctx.beginPath()
        for (let i = 0; i < 360; i += 45) {
          const angle = (i * Math.PI) / 180
          const radiusOffset = wobble * Math.sin(angle * 3)
          const x = blob.x + (blob.radius + radiusOffset) * Math.cos(angle)
          const y = blob.y + (blob.radius + radiusOffset) * Math.sin(angle)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            const prevAngle = ((i - 45) * Math.PI) / 180
            const prevRadiusOffset = wobble * Math.sin(prevAngle * 3)
            const prevX = blob.x + (blob.radius + prevRadiusOffset) * Math.cos(prevAngle)
            const prevY = blob.y + (blob.radius + prevRadiusOffset) * Math.sin(prevAngle)

            const cp1x = prevX + (x - prevX) * 0.5 - (y - prevY) * 0.2
            const cp1y = prevY + (y - prevY) * 0.5 + (x - prevX) * 0.2

            ctx.quadraticCurveTo(cp1x, cp1y, x, y)
          }
        }

        // Close the path
        ctx.closePath()
        ctx.fill()

        // Add glow effect if enabled
        if (glowIntensity > 0) {
          const glowColor = colorTransition
            ? `hsla(${blob.hue}, 100%, 70%, ${glowIntensity * 0.2})`
            : primaryColor.replace(")", `, ${glowIntensity * 0.2})`).replace("rgb", "rgba")

          ctx.shadowColor = glowColor
          ctx.shadowBlur = 20 * glowIntensity
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [
    waveSpeed,
    blobSize,
    colorTransition,
    primaryColor,
    secondaryColor,
    blendMode,
    viscosity,
    interactOnHover,
    isHovered,
    mousePos,
    glowIntensity,
    backgroundOpacity,
    dimensions,
  ])

  return (
    <div
      className="lava-lamp-button-container"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="lava-lamp-button__canvas" />
      <BaseButton
        className={`lava-lamp-button ${className}`}
        style={{
          borderWidth: `${borderWidth}px`,
          borderColor,
          borderStyle: "solid",
        }}
        {...props}
      >
        <span
          className="lava-lamp-button__content"
          style={{ 
            mixBlendMode: textBlendMode as React.CSSProperties["mixBlendMode"],
            color: textColor || 'white'
          }}
        >
          {children}
        </span>
      </BaseButton>
    </div>
  )
}

export default LavaLampButton
