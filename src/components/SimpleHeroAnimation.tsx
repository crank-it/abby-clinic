"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Check, MessageSquare, AlertCircle, X } from "lucide-react"

type AnimationState = 'idle' | 'message' | 'processing' | 'calendar' | 'result' | 'reset'
type OutcomeType = 'confirmed' | 'attention' | 'cancelled'

interface Scenario {
  message: string
  outcome: OutcomeType
  badgeText: string
}

const SCENARIOS: Scenario[] = [
  {
    message: "Sure thing I'll be there! 👍",
    outcome: 'confirmed',
    badgeText: 'Confirmed'
  },
  {
    message: "Please give me a call",
    outcome: 'attention',
    badgeText: 'Needs Attention'
  },
  {
    message: "Sorry I can't make it",
    outcome: 'cancelled',
    badgeText: 'Cancelled'
  }
]

const OUTCOME_STYLES: Record<OutcomeType, {
  bg: string
  border: string
  badgeBg: string
  badgeText: string
  timeColor: string
  rippleColor: string
  circleColor: string
}> = {
  confirmed: {
    bg: "rgba(16, 185, 129, 0.1)",
    border: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.2)",
    badgeText: "#34d399",
    timeColor: "#34d399",
    rippleColor: "bg-emerald-500",
    circleColor: "#10b981"
  },
  attention: {
    bg: "rgba(245, 158, 11, 0.1)",
    border: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.2)",
    badgeText: "#fbbf24",
    timeColor: "#fbbf24",
    rippleColor: "bg-amber-500",
    circleColor: "#f59e0b"
  },
  cancelled: {
    bg: "rgba(239, 68, 68, 0.1)",
    border: "#ef4444",
    badgeBg: "rgba(239, 68, 68, 0.2)",
    badgeText: "#f87171",
    timeColor: "#f87171",
    rippleColor: "bg-red-500",
    circleColor: "#ef4444"
  }
}

const TIMINGS: Record<AnimationState, number> = {
  idle: 400,
  message: 1200,
  processing: 800,
  calendar: 400,
  result: 2200,
  reset: 300,
}

export function SimpleHeroAnimation() {
  const [state, setState] = useState<AnimationState>('idle')
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const currentScenario = SCENARIOS[scenarioIndex]
  const styles = OUTCOME_STYLES[currentScenario.outcome]

  // State machine
  useEffect(() => {
    if (shouldReduceMotion) return

    const transitions: Record<AnimationState, AnimationState> = {
      idle: 'message',
      message: 'processing',
      processing: 'calendar',
      calendar: 'result',
      result: 'reset',
      reset: 'idle',
    }

    const timer = setTimeout(() => {
      const nextState = transitions[state]
      setState(nextState)

      // Cycle to next scenario when resetting
      if (state === 'reset') {
        setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length)
      }
    }, TIMINGS[state])

    return () => clearTimeout(timer)
  }, [state, shouldReduceMotion])

  const showMessage = ['message', 'processing', 'calendar', 'result'].includes(state)
  const isProcessing = state === 'processing'
  const hasResult = ['calendar', 'result'].includes(state)

  const OutcomeIcon = currentScenario.outcome === 'confirmed'
    ? Check
    : currentScenario.outcome === 'attention'
      ? AlertCircle
      : X

  // Reduced motion fallback
  if (shouldReduceMotion) {
    return (
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Static Message */}
          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#5371CA] flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Patient reply</p>
                <p className="text-white text-lg">&quot;Sure thing I&apos;ll be there! 👍&quot;</p>
              </div>
            </div>
          </div>

          {/* Static Calendar - Confirmed */}
          <div className="bg-emerald-500/10 rounded-2xl p-5 border-2 border-emerald-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Mon, 15th Dec</p>
                <p className="text-white text-xl font-semibold mb-1">Gav</p>
                <p className="text-emerald-400 font-medium">10:00 - 10:45</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5" />
              Confirmed
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="flex flex-col gap-6">
        {/* Message Section - Fixed height container */}
        <div className="h-[120px]">
          <motion.div
            className="bg-slate-800 rounded-2xl p-4 border border-slate-700 relative overflow-hidden h-full"
            animate={{
              borderColor: isProcessing ? "#5371CA" : "#334155",
              opacity: showMessage ? 1 : 0.4
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Processing shimmer overlay */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5371CA]/20 to-transparent"
                />
              )}
            </AnimatePresence>

            <div className="flex items-start gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-[#5371CA] flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-400 text-xs mb-1">Patient reply</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={scenarioIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-base sm:text-lg leading-tight"
                  >
                    &quot;{currentScenario.message}&quot;
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Processing indicator - fixed position at bottom */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-4 left-4 right-4 flex items-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[#5371CA] border-t-transparent rounded-full"
                  />
                  <span className="text-[#7b93db] text-sm">Abby is interpreting...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Connecting Arrow - Static container, only color/opacity changes */}
        <div className="flex justify-center h-8">
          <motion.div
            animate={{
              opacity: showMessage ? 1 : 0.3
            }}
            transition={{ duration: 0.3 }}
          >
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-[#5371CA]">
              <motion.path
                d="M12 0 L12 24 M6 18 L12 24 L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  strokeDasharray: hasResult ? "0" : "4 4"
                }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Calendar Section */}
        <motion.div
          className="rounded-2xl p-5 border-2 relative overflow-hidden"
          animate={{
            backgroundColor: hasResult ? styles.bg : "rgba(51, 65, 85, 0.3)",
            borderColor: hasResult ? styles.border : "#475569"
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Success ripple effect */}
          <AnimatePresence>
            {state === 'calendar' && (
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 ${styles.rippleColor} rounded-full`}
              />
            )}
          </AnimatePresence>

          <div className="flex items-start justify-between relative">
            <div>
              <motion.p
                className="text-sm mb-1"
                animate={{ color: hasResult ? "#94a3b8" : "#64748b" }}
              >
                Mon, 15th Dec
              </motion.p>
              <p className="text-white text-xl font-semibold mb-1">Gav</p>
              <motion.p
                className="font-medium"
                animate={{ color: hasResult ? styles.timeColor : "#94a3b8" }}
                transition={{ duration: 0.5 }}
              >
                10:00 - 10:45
              </motion.p>
            </div>

            {/* Status Circle - No scale animation to prevent layout shift */}
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              animate={{
                backgroundColor: hasResult ? styles.circleColor : "#475569"
              }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {hasResult ? (
                  <motion.div
                    key={`icon-${scenarioIndex}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <OutcomeIcon className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="dot"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-2.5 h-2.5 bg-slate-400 rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Status Badge */}
          <motion.div
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full"
            animate={{
              backgroundColor: hasResult ? styles.badgeBg : "rgba(71, 85, 105, 0.3)",
              color: hasResult ? styles.badgeText : "#94a3b8"
            }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {hasResult ? (
                <motion.div
                  key={`badge-${scenarioIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <OutcomeIcon className="w-3.5 h-3.5" />
                  <span>{currentScenario.badgeText}</span>
                </motion.div>
              ) : (
                <motion.span
                  key="awaiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Awaiting response
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default SimpleHeroAnimation
