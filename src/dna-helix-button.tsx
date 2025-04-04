"use client"

import React, { useState, useEffect } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/dna-helix-button.css"

interface DNAHelixButtonProps extends BaseButtonProps {
  helixColor?: string
  rotationSpeed?: number
  particleSize?: number
  particleCount?: number
}

interface Particle {
  id: number
  offset: number
  size: number
  color: string
}

const DNAHelixButton: React.FC<DNAHelixButtonProps> = ({
  children,
  className = "",
  helixColor = "#3b82f6",
  rotationSpeed = 2,
  particleSize = 4,
  particleCount = 20,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [rotation, setRotation] = useState(0)

  // Create particles
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      offset: i / particleCount,
      size: Math.random() * particleSize + particleSize / 2,
      color: typeof helixColor === "string" ? helixColor : `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
    }))

    setParticles(newParticles)
  }, [particleCount, particleSize, helixColor])

  // Animation loop for DNA rotation
  useEffect(() => {
    if (!isHovered) return

    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time
      const delta = time - lastTime
      lastTime = time

      setRotation((prev) => (prev + (delta / 1000) * rotationSpeed) % (Math.PI * 2))

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [rotationSpeed, isHovered])

  return (
    <div
      className="dna-helix-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BaseButton className={`dna-helix-button ${className}`} {...props}>
        {children}
      </BaseButton>

      {isHovered &&
        particles.map((particle) => (
          <React.Fragment key={particle.id}>
            <span
              className="dna-helix-particle dna-helix-particle--left"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: isHovered ? 1 : 0,
                top: `${particle.offset * 100}%`,
                transform: `translateX(-50%) translateY(-50%) translateX(${Math.sin(rotation + particle.offset * Math.PI * 2) * 30}px)`,
              }}
            />
            <span
              className="dna-helix-particle dna-helix-particle--right"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: isHovered ? 1 : 0,
                top: `${particle.offset * 100}%`,
                transform: `translateX(50%) translateY(-50%) translateX(${Math.sin(rotation + particle.offset * Math.PI * 2 + Math.PI) * 30}px)`,
              }}
            />
          </React.Fragment>
        ))}
    </div>
  )
}

export default DNAHelixButton

