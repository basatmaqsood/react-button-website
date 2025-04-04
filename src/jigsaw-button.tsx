"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/jigsaw-button.css"

interface JigsawButtonProps extends BaseButtonProps {
  pieces?: number
  animationSpeed?: number
  jigsawColor?: string
  jigsawPattern?: "classic" | "modern" | "random"
  reassembleDelay?: number
  scatterDistance?: number
  rotationAmount?: number
}

interface JigsawPiece {
  id: number
  x: number
  y: number
  width: number
  height: number
  translateX: number
  translateY: number
  rotation: number
  delay: number
  path: string
}

const JigsawButton: React.FC<JigsawButtonProps> = ({
  children,
  className = "",
  pieces = 9,
  animationSpeed = 1,
  jigsawColor,
  jigsawPattern = "classic",
  reassembleDelay = 1000,
  scatterDistance = 100,
  rotationAmount = 45,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [jigsawPieces, setJigsawPieces] = useState<JigsawPiece[]>([])
  const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0 })
  const [buttonBackground, setButtonBackground] = useState("")
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Generate jigsaw pieces
  const generateJigsawPieces = () => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Get computed background color
    const computedStyle = window.getComputedStyle(button)
    const bgColor = jigsawColor || computedStyle.backgroundColor || "#3b82f6"

    setButtonDimensions({ width, height })
    setButtonBackground(bgColor)

    // Calculate grid dimensions
    const cols = Math.ceil(Math.sqrt(pieces))
    const rows = Math.ceil(pieces / cols)

    const pieceWidth = width / cols
    const pieceHeight = height / rows

    const newPieces: JigsawPiece[] = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pieceIndex = row * cols + col

        if (pieceIndex >= pieces) break

        // Calculate piece position
        const x = col * pieceWidth
        const y = row * pieceHeight

        // Generate random scatter direction
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * scatterDistance + scatterDistance / 2

        const translateX = Math.cos(angle) * distance
        const translateY = Math.sin(angle) * distance
        const rotation = (Math.random() - 0.5) * 2 * rotationAmount

        // Generate jigsaw path based on pattern
        let path = ""

        switch (jigsawPattern) {
          case "modern":
            path = generateModernJigsawPath(pieceWidth, pieceHeight, col, row, cols, rows)
            break
          case "random":
            path = generateRandomJigsawPath(pieceWidth, pieceHeight)
            break
          case "classic":
          default:
            path = generateClassicJigsawPath(pieceWidth, pieceHeight, col, row, cols, rows)
            break
        }

        newPieces.push({
          id: pieceIndex,
          x,
          y,
          width: pieceWidth,
          height: pieceHeight,
          translateX,
          translateY,
          rotation,
          delay: Math.random() * 0.2,
          path,
        })
      }
    }

    setJigsawPieces(newPieces)
  }

  // Generate classic jigsaw path with tabs and slots
  const generateClassicJigsawPath = (
    width: number,
    height: number,
    col: number,
    row: number,
    cols: number,
    rows: number,
  ) => {
    const tabSize = Math.min(width, height) * 0.2

    // Determine if we need tabs or slots on each side
    const hasRightTab = col < cols - 1 ? Math.random() > 0.5 : false
    const hasBottomTab = row < rows - 1 ? Math.random() > 0.5 : false
    const hasLeftTab = col > 0 ? false : false // Left tab is handled by the piece to the left
    const hasTopTab = row > 0 ? false : false // Top tab is handled by the piece above

    let path = `M 0,0`

    // Top edge
    if (hasTopTab) {
      path += ` L ${width * 0.3},0 Q ${width * 0.4},${-tabSize} ${width * 0.5},0 Q ${width * 0.6},${tabSize} ${width * 0.7},0`
    }
    path += ` L ${width},0`

    // Right edge
    if (hasRightTab) {
      path += ` L ${width},${height * 0.3} Q ${width + tabSize},${height * 0.4} ${width},${height * 0.5} Q ${width - tabSize},${height * 0.6} ${width},${height * 0.7}`
    }
    path += ` L ${width},${height}`

    // Bottom edge
    if (hasBottomTab) {
      path += ` L ${width * 0.7},${height} Q ${width * 0.6},${height + tabSize} ${width * 0.5},${height} Q ${width * 0.4},${height - tabSize} ${width * 0.3},${height}`
    }
    path += ` L 0,${height}`

    // Left edge
    if (hasLeftTab) {
      path += ` L 0,${height * 0.7} Q ${-tabSize},${height * 0.6} 0,${height * 0.5} Q ${tabSize},${height * 0.4} 0,${height * 0.3}`
    }
    path += ` L 0,0`

    return path
  }

  // Generate modern jigsaw path with rounded corners and simpler tabs
  const generateModernJigsawPath = (
    width: number,
    height: number,
    col: number,
    row: number,
    cols: number,
    rows: number,
  ) => {
    const tabSize = Math.min(width, height) * 0.15
    const cornerRadius = Math.min(width, height) * 0.1

    // Determine if we need tabs or slots on each side
    const hasRightTab = col < cols - 1
    const hasBottomTab = row < rows - 1

    let path = `M ${cornerRadius},0`

    // Top edge
    path += ` L ${width - cornerRadius},0 Q ${width},0 ${width},${cornerRadius}`

    // Right edge
    if (hasRightTab) {
      path += ` L ${width},${height * 0.4} Q ${width + tabSize},${height * 0.5} ${width},${height * 0.6}`
    }
    path += ` L ${width},${height - cornerRadius} Q ${width},${height} ${width - cornerRadius},${height}`

    // Bottom edge
    if (hasBottomTab) {
      path += ` L ${width * 0.6},${height} Q ${width * 0.5},${height + tabSize} ${width * 0.4},${height}`
    }
    path += ` L ${cornerRadius},${height} Q 0,${height} 0,${height - cornerRadius}`

    // Left edge
    path += ` L 0,${cornerRadius} Q 0,0 ${cornerRadius},0`

    return path
  }

  // Generate random organic jigsaw path
  const generateRandomJigsawPath = (width: number, height: number) => {
    const points = []
    const pointCount = 8
    const variance = Math.min(width, height) * 0.15

    // Generate points around the perimeter
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2
      const radius = Math.min(width, height) / 2

      const x = width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * variance
      const y = height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * variance

      points.push({ x, y })
    }

    // Create path
    let path = `M ${points[0].x},${points[0].y}`

    for (let i = 1; i < points.length; i++) {
      const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) * 0.5 - (points[i].y - points[i - 1].y) * 0.2
      const cp1y = points[i - 1].y + (points[i].y - points[i - 1].y) * 0.5 + (points[i].x - points[i - 1].x) * 0.2
      path += ` Q ${cp1x},${cp1y} ${points[i].x},${points[i].y}`
    }

    // Close the path
    const cp1x =
      points[points.length - 1].x +
      (points[0].x - points[points.length - 1].x) * 0.5 -
      (points[0].y - points[points.length - 1].y) * 0.2
    const cp1y =
      points[points.length - 1].y +
      (points[0].y - points[points.length - 1].y) * 0.5 +
      (points[0].x - points[points.length - 1].x) * 0.2
    path += ` Q ${cp1x},${cp1y} ${points[0].x},${points[0].y}`

    return path
  }

  // Improve the handleClick function to use better timing and easing
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return
    
    props.onClick?.(e)
    
    generateJigsawPieces()
    setIsAnimating(true)
    
    // Reset after animation completes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, reassembleDelay + 1200 / animationSpeed)
  }

  // Update the JSX rendering for the pieces to use better animation
  return (
    <div className="jigsaw-button-container">
      <BaseButton
        ref={buttonRef}
        className={`jigsaw-button ${className} ${isAnimating ? "is-animating" : ""}`}
        onClick={handleClick}
        {...props}
      >
        <span className={`jigsaw-button__content ${isAnimating ? "is-hidden" : ""}`}>
          {children}
        </span>
      </BaseButton>
      
      {isAnimating && (
        <div 
          className="jigsaw-button__pieces-container"
          style={{
            width: buttonDimensions.width,
            height: buttonDimensions.height
          }}
        >
          {jigsawPieces.map((piece) => (
            <div
              key={piece.id}
              className="jigsaw-button__piece"
              style={{
                left: piece.x,
                top: piece.y,
                width: piece.width,
                height: piece.height,
                backgroundColor: buttonBackground,
                clipPath: `path('${piece.path}')`,
                transform: isAnimating 
                  ? `translate(${piece.translateX}px, ${piece.translateY}px) rotate(${piece.rotation}deg)`
                  : "translate(0, 0) rotate(0deg)",
                transition: `transform ${1.2 / animationSpeed}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                transitionDelay: `${piece.delay}s`,
                animationName: "reassemble",
                animationDuration: `${1.2 / animationSpeed}s`,
                animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                animationFillMode: "forwards",
                animationDelay: `${reassembleDelay / 1000 + piece.delay}s`,
                "--translateX": `${piece.translateX}px`,
                "--translateY": `${piece.translateY}px`,
                "--rotation": `${piece.rotation}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default JigsawButton
