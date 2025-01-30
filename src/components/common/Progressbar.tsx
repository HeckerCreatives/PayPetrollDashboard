"use client"

import * as React from "react"
import * as Progress from "@radix-ui/react-progress"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ value, size = 120, strokeWidth = 6 }) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500)
    return () => clearTimeout(timer)
  }, [value])

  const center = size / 2
  const radius = center - strokeWidth
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <Progress.Root
      className="relative bg-gray-100 rounded-full"
      style={{ width: size, height: size }}
      value={progress}
    >
      <svg width={size} height={size}>
        <circle
          className="text-gray-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <Progress.Indicator asChild>
          <circle
            className={` ${progress === 100 ? 'text-[#A0E870]' : 'text-red-500'} transition-all duration-500 ease-in-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
            transform={`rotate(-90 ${center} ${center})`}
          />
        </Progress.Indicator>
      </svg>
      <div className="absolute top-0 right-0 flex items-center justify-center bg-dark px-2 py-1  text-white rounded-full">
        <p className="text-[.6rem] font-medium mt-[2px]">{Math.round(progress)}%</p>
      </div>
    </Progress.Root>
  )
}

