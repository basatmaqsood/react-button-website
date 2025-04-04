"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/jelly-button.css"

interface JellyButtonProps extends BaseButtonProps {
  wiggleIntensity?: number
  bounceSpeed?: number
  elasticity?: number
  wobbleCount?: number
  squishOnHover?: boolean
  squishDirection?: "horizontal" | "vertical" | "both"
  jellyColor?: string
  jellyOpacity?: number
}

const JellyButton: React.FC<JellyButtonProps> = ({
  children,
  className = "",
  wiggleIntensity = 1.2,
  bounceSpeed = 1,
  elasticity = 0.6,
  wobbleCount = 2,
  squishOnHover = true,
  squishDirection = "both",
  jellyColor,
  jellyOpacity = 0.2,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate animation properties
  const animationDuration = 0.8 / bounceSpeed
  const animationIterations = Math.max(1, Math.round(wobbleCount))

  // Handle click animation
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return

    setIsAnimating(true)

    // Reset animation after it completes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(
      () => {
        setIsAnimating(false)
      },
      animationDuration * 1000 * animationIterations + 100,
    )

    props.onClick?.(e)
  }

  // Get squish transform based on direction
  const getSquishTransform = () => {
    if (!isHovered || !squishOnHover) return "scale(1)"

    switch (squishDirection) {
      case "horizontal":
        return `scale(${1 / Math.sqrt(wiggleIntensity)}, ${Math.sqrt(wiggleIntensity)})`
      case "vertical":
        return `scale(${Math.sqrt(wiggleIntensity)}, ${1 / Math.sqrt(wiggleIntensity)})`
      case "both":
      default:
        return `scale(${0.95}, ${0.95})`
    }
  }

  // Get animation name based on direction
  const getAnimationName = () => {
    switch (squishDirection) {
      case "horizontal":
        return "jellyWiggleHorizontal"
      case "vertical":
        return "jellyWiggleVertical"
      case "both":
      default:
        return "jellyWiggleBoth"
    }
  }

  return (
    <div className="jelly-button-wrapper">
      <BaseButton
        ref={buttonRef}
        className={`jelly-button ${className} ${isAnimating ? "is-animating" : ""}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={
          {
            transform: isAnimating ? "scale(1)" : getSquishTransform(),
            transition: isAnimating ? "none" : "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            animation: isAnimating
              ? `${getAnimationName()} ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${animationIterations}`
              : "none",
            "--wiggle-intensity": wiggleIntensity,
            "--elasticity": elasticity,
          } as React.CSSProperties
        }
        {...props}
      >
        <span className="jelly-button__content">{children}</span>
      </BaseButton>

      {/* Jelly shadow/reflection effect */}
      <div
        className={`jelly-button__shadow ${isAnimating ? "is-animating" : ""} ${isHovered && squishOnHover ? "is-hovered" : ""}`}
        style={
          {
            backgroundColor: jellyColor || "currentColor",
            opacity: jellyOpacity,
            animation: isAnimating
              ? `${getAnimationName()}Shadow ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${animationIterations}`
              : "none",
            transform: isAnimating ? "scale(1)" : getSquishTransform(),
            "--wiggle-intensity": wiggleIntensity,
            "--elasticity": elasticity,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

export default JellyButton

