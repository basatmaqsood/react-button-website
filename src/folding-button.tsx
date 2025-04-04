"use client"

import type React from "react"
import { useState } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/folding-button.css"

interface FoldingButtonProps extends BaseButtonProps {
  foldDirection?: "left" | "right" | "up" | "down"
  foldSpeed?: number
  foldEasing?: string
  foldAngle?: number
}

const FoldingButton: React.FC<FoldingButtonProps> = ({
  children,
  className = "",
  foldDirection = "left",
  foldSpeed = 0.5,
  foldEasing = "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
  foldAngle = 90,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getFoldTransform = () => {
    if (!isHovered) return "rotateY(0) rotateX(0)"

    switch (foldDirection) {
      case "left":
        return `rotateY(-${foldAngle}deg)`
      case "right":
        return `rotateY(${foldAngle}deg)`
      case "up":
        return `rotateX(${foldAngle}deg)`
      case "down":
        return `rotateX(-${foldAngle}deg)`
      default:
        return `rotateY(-${foldAngle}deg)`
    }
  }

  const getTransformOrigin = () => {
    switch (foldDirection) {
      case "left":
        return "left center"
      case "right":
        return "right center"
      case "up":
        return "center top"
      case "down":
        return "center bottom"
      default:
        return "left center"
    }
  }

  const buttonStyle = {
    transform: getFoldTransform(),
    transformOrigin: getTransformOrigin(),
    transition: `transform ${foldSpeed}s ${foldEasing}`,
    backfaceVisibility: "hidden" as const,
  }

  return (
    <div className="folding-button-wrapper">
      <BaseButton
        className={`folding-button ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={buttonStyle}
        {...props}
      >
        {children}
      </BaseButton>
    </div>
  )
}

export default FoldingButton

