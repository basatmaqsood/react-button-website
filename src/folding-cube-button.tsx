"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/folding-cube-button.css"

interface FoldingCubeButtonProps extends BaseButtonProps {
  foldSpeed?: number
  cubeSize?: number
  faceColors?: {
    front?: string
    back?: string
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  autoRotate?: boolean
  rotationSpeed?: number
}

const FoldingCubeButton: React.FC<FoldingCubeButtonProps> = ({
  children,
  className = "",
  foldSpeed = 0.6,
  cubeSize = 1,
  faceColors = {
    front: "#3b82f6",
    back: "#2563eb",
    top: "#60a5fa",
    bottom: "#1d4ed8",
    left: "#93c5fd",
    right: "#1e40af",
  },
  backgroundColor,
  autoRotate = false,
  rotationSpeed = 3,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cubeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || isHovered) return

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time
      }

      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + (delta / 1000) * 30 * rotationSpeed) % 360,
      }))

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      lastTimeRef.current = 0
    }
  }, [autoRotate, isHovered, rotationSpeed])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered || !cubeRef.current) return

    const rect = cubeRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation based on mouse position
    const rotateY = ((x - centerX) / centerX) * 45
    const rotateX = -((y - centerY) / centerY) * 45

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!autoRotate) {
      setRotation({ x: 0, y: 0 })
    }
  }

  // Apply colors, defaulting to backgroundColor if specific face color not provided
  const frontColor = faceColors.front || backgroundColor
  const backColor = faceColors.back || backgroundColor
  const topColor = faceColors.top || backgroundColor
  const bottomColor = faceColors.bottom || backgroundColor
  const leftColor = faceColors.left || backgroundColor
  const rightColor = faceColors.right || backgroundColor

  return (
    <div
      className="folding-cube-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cubeRef}
    >
      <div
        className="folding-cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${cubeSize})`,
          transition: isHovered
            ? `transform ${foldSpeed}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`
            : `transform ${foldSpeed}s ease`,
        }}
      >
        <div className="folding-cube__face folding-cube__face--front" style={{ backgroundColor: frontColor }}>
          <BaseButton
            className={`folding-cube-button ${className}`}
            style={{ backgroundColor: "transparent" }}
            {...props}
          >
            {children}
          </BaseButton>
        </div>
        <div className="folding-cube__face folding-cube__face--back" style={{ backgroundColor: backColor }}></div>
        <div className="folding-cube__face folding-cube__face--top" style={{ backgroundColor: topColor }}></div>
        <div className="folding-cube__face folding-cube__face--bottom" style={{ backgroundColor: bottomColor }}></div>
        <div className="folding-cube__face folding-cube__face--left" style={{ backgroundColor: leftColor }}></div>
        <div className="folding-cube__face folding-cube__face--right" style={{ backgroundColor: rightColor }}></div>
      </div>
    </div>
  )
}

export default FoldingCubeButton

