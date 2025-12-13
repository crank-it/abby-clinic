"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"

interface StatConfig {
  value: number
  suffix: string
  label: string
  duration: number
}

const STATS: StatConfig[] = [
  { value: 98, suffix: "%", label: "Interpretation accuracy", duration: 2 },
  { value: 15, suffix: "min", label: "Calendar sync frequency", duration: 1.5 },
  { value: 5, suffix: "min", label: "Setup time", duration: 1.2 },
]

function AnimatedNumber({
  value,
  suffix,
  duration,
  isInView
}: {
  value: number
  suffix: string
  duration: number
  isInView: boolean
}) {
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0
  })

  const display = useTransform(spring, (current) => Math.round(current))
  const [displayValue, setDisplayValue] = useState(0)

  // Color interpolation from pink to blue
  const progress = useTransform(spring, [0, value], [0, 1])
  const [colorProgress, setColorProgress] = useState(0)

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    } else {
      spring.set(0)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v))
    return () => unsubscribe()
  }, [display])

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => setColorProgress(v))
    return () => unsubscribe()
  }, [progress])

  // Interpolate between pink (#ec4899) and blue (#5371CA)
  const r = Math.round(236 + (83 - 236) * colorProgress)
  const g = Math.round(72 + (113 - 72) * colorProgress)
  const b = Math.round(153 + (202 - 153) * colorProgress)
  const color = `rgb(${r}, ${g}, ${b})`

  // Glow color follows the text color
  const glowColor = `rgba(${r}, ${g}, ${b}, 0.5)`

  return (
    <motion.span
      style={{
        color,
        textShadow: `0 0 60px ${glowColor}, 0 0 120px ${glowColor}, 0 0 180px ${glowColor}`
      }}
      className="tabular-nums"
    >
      {displayValue}{suffix}
    </motion.span>
  )
}

function StatSection({ stat, index }: { stat: StatConfig; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.5
  })

  return (
    <section
      ref={sectionRef}
      className="min-h-[100svh] flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          scale: isInView ? [1, 1.3, 1] : 1,
          opacity: isInView ? [0.15, 0.25, 0.15] : 0
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#5371CA]/10 blur-3xl"
        animate={{
          scale: isInView ? [1.3, 1, 1.3] : 1,
          opacity: isInView ? [0.15, 0.25, 0.15] : 0
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[7rem] sm:text-[12rem] md:text-[8rem] lg:text-[10rem] xl:text-[13rem] font-bold font-heading leading-none"
        >
          <AnimatedNumber
            value={stat.value}
            suffix={stat.suffix}
            duration={stat.duration}
            isInView={isInView}
          />
        </motion.div>
        <motion.p
          className="text-slate-400 text-lg sm:text-xl md:text-2xl mt-4 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stat.label}
        </motion.p>
      </div>
    </section>
  )
}

export function AnimatedStats() {
  return (
    <>
      {STATS.map((stat, index) => (
        <StatSection key={stat.label} stat={stat} index={index} />
      ))}
    </>
  )
}

export default AnimatedStats
