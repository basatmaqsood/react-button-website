"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/smoke-button.css"

interface SmokeButtonProps extends BaseButtonProps {
  smokeColor?: string
  fadeSpeed?: number
  particleCount?: number
  smokeOpacity?: number
  smokeSize?: number
  smokeSpread?: number
  smokeRise?: number
  resetDelay?: number
}

interface SmokeParticle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
}

const SmokeButton: React.FC<SmokeButtonProps> = ({
  children,
  className = "",
  smokeColor = "rgba(255, 255, 255, 0.8)",
  fadeSpeed = 1,
  particleCount = 30,
  smokeOpacity = 0.8,
  smokeSize = 30,
  smokeSpread = 100,
  smokeRise = 100,
  resetDelay = 1500,
  ...props
}) => {
  const [isDissolving, setIsDissolving] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Generate smoke particles with improved distribution
  const generateSmokeParticles = () => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()

    const newParticles: SmokeParticle[] = []

    // Create different types of particles for more realistic smoke
    // Core particles (denser in the center)
    for (let i = 0; i < Math.floor(particleCount * 0.6); i++) {
      // Calculate position with bias toward center
      const centerBias = 0.7
      const x = rect.width / 2 + (Math.random() - 0.5) * rect.width * (1 - centerBias)
      const y = rect.height / 2 + (Math.random() - 0.5) * rect.height * (1 - centerBias)

      // Random size variation
      const size = Math.random() * smokeSize * 1.2 + smokeSize / 2

      // Random movement with upward bias
      const angle = Math.random() * Math.PI - Math.PI / 2 // -90 to 90 degrees
      const speed = Math.random() * 2 + 1.5

      newParticles.push({
        id: i,
        x,
        y,
        size,
        opacity: Math.random() * smokeOpacity * 0.8 + smokeOpacity * 0.2,
        delay: Math.random() * 0.2,
        speedX: Math.cos(angle) * speed * (smokeSpread / 100),
        speedY: (Math.sin(angle) - 1.2) * speed * (smokeRise / 100), // Stronger upward bias
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
      })
    }

    // Edge particles (more spread out)
    for (let i = Math.floor(particleCount * 0.6); i < particleCount; i++) {
      // Calculate position with bias toward edges
      const edgeBias = 0.3
      const x = Math.random() * rect.width
      const y = Math.random() * rect.height

      // Random size variation (smaller for edge particles)
      const size = Math.random() * smokeSize * 0.8 + smokeSize / 3

      // Random movement with more horizontal spread
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 0.5

      newParticles.push({
        id: i,
        x,
        y,
        size,
        opacity: Math.random() * smokeOpacity * 0.6 + smokeOpacity * 0.1,
        delay: Math.random() * 0.3 + 0.1,
        speedX: Math.cos(angle) * speed * (smokeSpread / 80),
        speedY: (Math.sin(angle) - 0.8) * speed * (smokeRise / 100),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 30,
      })
    }

    setSmokeParticles(newParticles)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDissolving) return

    props.onClick?.(e)

    generateSmokeParticles()
    setIsDissolving(true)

    // Hide button after a short delay
    setTimeout(() => {
      setIsHidden(true)
    }, 100)

    // Reset after animation completes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsDissolving(false)
      setIsHidden(false)
      setSmokeParticles([])
    }, resetDelay)
  }

  return (
    <div className="smoke-button-container">
      <BaseButton
        ref={buttonRef}
        className={`smoke-button ${className} ${isDissolving ? "is-dissolving" : ""}`}
        onClick={handleClick}
        style={{
          opacity: isHidden ? 0 : 1,
        }}
        {...props}
      >
        <span className="smoke-button__content">{children}</span>
      </BaseButton>

      {isDissolving && (
        <div className="smoke-button__particles-container">
          {smokeParticles.map((particle) => (
            <div
              key={particle.id}
              className="smoke-button__particle"
              style={
                {
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: smokeColor,
                  opacity: particle.opacity,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${2 / fadeSpeed}s`,
                  transform: `rotate(${particle.rotation}deg)`,
                  "--speed-x": `${particle.speedX}px`,
                  "--speed-y": `${particle.speedY}px`,
                  "--rotation-speed": `${particle.rotationSpeed}deg`,
                  "--opacity": particle.opacity,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SmokeButton

