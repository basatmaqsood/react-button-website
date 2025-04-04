"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/melting-button.css"

interface MeltingButtonProps extends BaseButtonProps {
  meltSpeed?: number
  reformTime?: number
  meltColor?: string
  meltAmount?: number
  dripCount?: number
}

const MeltingButton: React.FC<MeltingButtonProps> = ({
  children,
  className = "",
  meltSpeed = 0.8,
  reformTime = 1000,
  meltColor,
  meltAmount = 100,
  dripCount = 8,
  backgroundColor = "#3b82f6",
  ...props
}) => {
  const [isMelting, setIsMelting] = useState(false)
  const [isReforming, setIsReforming] = useState(false)
  const [drips, setDrips] = useState<Array<{ position: number; delay: number; height: number; width: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isMelting || isReforming) return

    props.onClick?.(e)

    // Generate random drips
    const newDrips = Array.from({ length: dripCount }, () => ({
      position: Math.random() * 100,
      delay: Math.random() * 0.3,
      height: Math.random() * meltAmount * 0.5 + meltAmount * 0.5,
      width: Math.random() * 8 + 4,
    }))

    setDrips(newDrips)
    setIsMelting(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Start reforming after melt animation completes
    timeoutRef.current = setTimeout(() => {
      setIsMelting(false)
      setIsReforming(true)

      // Reset after reform animation
      timeoutRef.current = setTimeout(() => {
        setIsReforming(false)
        setDrips([])
      }, meltSpeed * 1000)
    }, reformTime)
  }

  const actualMeltColor = meltColor || backgroundColor

  return (
    <div className="melting-button-container">
      <BaseButton
        ref={buttonRef}
        className={`melting-button ${className} ${isMelting ? "is-melting" : ""} ${isReforming ? "is-reforming" : ""}`}
        onClick={handleClick}
        style={{
          backgroundColor: actualMeltColor,
          ...props.style,
        }}
        {...props}
      >
        <span className="melting-button__content">{children}</span>
      </BaseButton>

      {isMelting &&
        drips.map((drip, index) => (
          <div
            key={index}
            className="melting-button__drip"
            style={
              {
                left: `${drip.position}%`,
                backgroundColor: actualMeltColor,
                animationDuration: `${meltSpeed}s`,
                animationDelay: `${drip.delay}s`,
                width: `${drip.width}px`,
                "--height": `${drip.height}px`,
              } as React.CSSProperties
            }
          >
            <div className="melting-button__drip-head" style={{ backgroundColor: actualMeltColor }} />
          </div>
        ))}
    </div>
  )
}

export default MeltingButton

