/* eslint-disable no-restricted-imports */

import React, { useState } from 'react'

interface RatingProps {
  className?: string
  count: number
  value: number
  color?: string
  hoverColor?: string
  activeColor?: string
  size?: number
  edit?: boolean
  onChange?: (value: number) => void
  emptyIcon?: React.ReactNode
  fullIcon?: React.ReactNode
}

interface IconProps {
  size?: number
  color?: string
}

const ZERO = 0
const ONE = 1
const TWENTYFOUR = 24
const THIRTY = 30

export const FullStar: React.FC<IconProps> = ({ size = TWENTYFOUR, color = '#000000' }) => (
  <div style={{ color }}>
    <svg height={size} viewBox="0 0 24 24">
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill="currentColor"
      />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  </div>
)

export const EmptyStar: React.FC<IconProps> = ({ size = TWENTYFOUR, color = '#000000' }) => (
  <div style={{ color }}>
    <svg height={size} viewBox="0 0 24 24">
      <path
        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
        fill="currentColor"
      />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  </div>
)

const Rating: React.FC<RatingProps> = ({
  className = '',
  count,
  value,
  color = '#ffd700',
  hoverColor = '#ffc107',
  activeColor = '#ffc107',
  size = THIRTY,
  edit = false,
  onChange,
  emptyIcon = <EmptyStar />,
  fullIcon = <FullStar />,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined)

  const handleMouseMove = (index: number) => {
    if (!edit) return
    setHoverValue(index)
  }

  const handleMouseLeave = () => {
    if (!edit) return
    setHoverValue(undefined)
  }

  const handleClick = (index: number) => {
    if (!edit || !onChange) return
    onChange(index + ONE)
  }

  const stars = []

  for (let i = ZERO; i < count; i++) {
    let star: React.ReactNode
    if (i < value) {
      star = fullIcon
    } else {
      star = emptyIcon
    }

    if (hoverValue !== undefined && i <= hoverValue) {
      star = fullIcon
    }

    stars.push(
      <div
        key={i}
        style={{ cursor: 'pointer', display: 'inline-block' }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {React.cloneElement(star as React.ReactElement, {
          size,
          color: i <= (hoverValue || ZERO) ? hoverColor : i < value ? activeColor : color,
        })}
      </div>
    )
  }

  return (
    <div className={`rating ${className}`} style={{ display: 'inline-block' }}>
      {stars}
    </div>
  )
}

export default Rating
