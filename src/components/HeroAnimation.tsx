"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"

// Animation states
type AnimationState =
  | 'idle'
  | 'sms-incoming'
  | 'sms-typing'
  | 'sms-reply'
  | 'ai-processing'
  | 'calendar-update'
  | 'confirmed'
  | 'pause'
  | 'reset'

// Timing configuration (in ms)
const TIMINGS = {
  idle: 500,
  'sms-incoming': 1500,
  'sms-typing': 800,
  'sms-reply': 1000,
  'ai-processing': 600,
  'calendar-update': 500,
  'confirmed': 2000,
  'pause': 500,
  'reset': 300,
}

// Content configuration
const CONTENT = {
  incoming: "Hi Gav, can you make it to your appointment tomorrow at 10am?",
  reply: "Sure thing I'll be there! 👍",
  practitioner: "Gav",
  date: "Mon, 15th Dec",
  time: "10:00 - 10:45",
  service: "Follow-up Consultation",
}

// ============================================================================
// SMS Interface Component
// ============================================================================
interface SMSInterfaceProps {
  showIncoming: boolean
  showTyping: boolean
  showReply: boolean
  className?: string
}

function SMSInterface({ showIncoming, showTyping, showReply, className = "" }: SMSInterfaceProps) {
  return (
    <div className={`w-full max-w-[280px] sm:max-w-[320px] ${className}`}>
      {/* Phone Frame */}
      <div className="bg-slate-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        {/* Screen */}
        <div className="bg-slate-900 rounded-[1.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-5 py-2 bg-slate-800/50">
            <span className="text-[10px] text-slate-400 font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                <div className="w-1 h-1 bg-slate-500 rounded-full" />
              </div>
              <div className="w-5 h-2 bg-slate-400 rounded-sm ml-1" />
            </div>
          </div>

          {/* Chat Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5371CA] to-[#7b93db] flex items-center justify-center">
              <span className="text-white text-xs font-semibold">A</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Abby</p>
              <p className="text-slate-500 text-[10px]">Appointment Reminder</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[200px] sm:h-[240px] p-4 flex flex-col justify-end space-y-3 overflow-hidden">
            {/* Incoming Message */}
            <AnimatePresence>
              {showIncoming && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-start"
                >
                  <div className="bg-slate-700 rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%] shadow-lg">
                    <p className="text-white text-sm leading-relaxed">
                      {CONTENT.incoming}
                    </p>
                  </div>
                  <span className="text-slate-500 text-[10px] mt-1 ml-2">9:38 AM</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-end justify-end"
                >
                  <div className="bg-[#5371CA] rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-white/70 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white/70 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white/70 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reply Message */}
            <AnimatePresence>
              {showReply && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-end"
                >
                  <div className="bg-[#5371CA] rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%] shadow-lg shadow-[#5371CA]/20">
                    <p className="text-white text-sm leading-relaxed">
                      {CONTENT.reply}
                    </p>
                  </div>
                  <span className="text-slate-500 text-[10px] mt-1 mr-2">9:41 AM</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="px-3 py-2 border-t border-slate-700/50">
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2">
              <span className="text-slate-500 text-sm flex-1">Message</span>
              <div className="w-6 h-6 bg-[#5371CA] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Calendar Card Component
// ============================================================================
interface CalendarCardProps {
  isConfirmed: boolean
  showUpdate: boolean
  className?: string
}

function CalendarCard({ isConfirmed, showUpdate, className = "" }: CalendarCardProps) {
  return (
    <div className={`w-full max-w-[280px] sm:max-w-[300px] ${className}`}>
      {/* Calendar Frame */}
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-[#5371CA] px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs font-medium">Cliniko Calendar</p>
              <p className="text-white text-lg font-bold">{CONTENT.date}</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="p-3 space-y-2">
          {/* Previous appointment - faded */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 opacity-50">
            <div className="text-xs text-slate-400 font-medium w-16">9:00</div>
            <div className="flex-1">
              <p className="text-xs text-slate-400">Sarah M.</p>
            </div>
            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-slate-400" />
            </div>
          </div>

          {/* Main Appointment Card */}
          <motion.div
            className="relative overflow-hidden rounded-xl"
            animate={{
              boxShadow: isConfirmed
                ? "0 4px 20px rgba(16, 185, 129, 0.3)"
                : "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Background Color Animation */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundColor: isConfirmed ? "#ecfdf5" : "#f8fafc"
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Left Border Indicator */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1"
              animate={{
                backgroundColor: isConfirmed ? "#10b981" : "#94a3b8"
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <div className="relative p-3 pl-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <motion.span
                      className="text-sm font-bold"
                      animate={{
                        color: isConfirmed ? "#059669" : "#475569"
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {CONTENT.time}
                    </motion.span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{CONTENT.practitioner}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{CONTENT.service}</p>
                </div>

                {/* Status Indicator */}
                <motion.div
                  className="flex items-center gap-1.5"
                  initial={false}
                  animate={{
                    scale: showUpdate ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    animate={{
                      backgroundColor: isConfirmed ? "#10b981" : "#e2e8f0"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <AnimatePresence mode="wait">
                      {isConfirmed ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="pending"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>

              {/* Status Badge */}
              <motion.div
                className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                animate={{
                  backgroundColor: isConfirmed ? "#d1fae5" : "#f1f5f9",
                  color: isConfirmed ? "#059669" : "#64748b"
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.span
                  animate={{ scale: showUpdate ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isConfirmed ? "✓ Confirmed" : "Awaiting response"}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Next appointment - faded */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-teal-50/50 opacity-50">
            <div className="text-xs text-slate-400 font-medium w-16">11:00</div>
            <div className="flex-1">
              <p className="text-xs text-slate-400">Emily W.</p>
            </div>
            <div className="w-4 h-4 rounded-full bg-teal-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Processing Indicator Component
// ============================================================================
interface ProcessingIndicatorProps {
  isActive: boolean
  className?: string
}

function ProcessingIndicator({ isActive, className = "" }: ProcessingIndicatorProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-col items-center ${className}`}
        >
          {/* Abby Logo/Icon with glow */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-[#5371CA] rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="relative w-14 h-14 bg-gradient-to-br from-[#5371CA] to-[#7b93db] rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </div>

          {/* Processing Text */}
          <motion.p
            className="text-[#7b93db] text-sm font-medium mt-3"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Abby is interpreting...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// Connection Line Component (Desktop)
// ============================================================================
interface ConnectionLineProps {
  isActive: boolean
  progress: number // 0-1
}

function ConnectionLine({ isActive, progress }: ConnectionLineProps) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center px-8">
      {/* Arrow/Flow Line */}
      <svg
        className="w-32 h-16"
        viewBox="0 0 128 64"
        fill="none"
      >
        {/* Background path */}
        <path
          d="M 0 32 Q 64 32 128 32"
          stroke="rgba(99, 129, 212, 0.2)"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />
        {/* Animated progress path */}
        <motion.path
          d="M 0 32 Q 64 32 128 32"
          stroke="#5371CA"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? progress : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {/* Arrow head */}
        <motion.path
          d="M 118 27 L 128 32 L 118 37"
          stroke="#5371CA"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.9 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </svg>

      {/* Processing indicator positioned in the middle */}
      <div className="absolute">
        <ProcessingIndicator isActive={isActive && progress > 0.3 && progress < 0.9} />
      </div>
    </div>
  )
}

// ============================================================================
// Main Hero Animation Component
// ============================================================================
interface HeroAnimationProps {
  className?: string
  speed?: number // Multiplier for animation speed (1 = normal)
}

export function HeroAnimation({ className = "", speed = 1 }: HeroAnimationProps) {
  const [state, setState] = useState<AnimationState>('idle')
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // State machine transitions
  const getNextState = useCallback((currentState: AnimationState): AnimationState => {
    const transitions: Record<AnimationState, AnimationState> = {
      'idle': 'sms-incoming',
      'sms-incoming': 'sms-typing',
      'sms-typing': 'sms-reply',
      'sms-reply': 'ai-processing',
      'ai-processing': 'calendar-update',
      'calendar-update': 'confirmed',
      'confirmed': 'pause',
      'pause': 'reset',
      'reset': 'idle',
    }
    return transitions[currentState]
  }, [])

  // Animation loop
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return

    const timing = TIMINGS[state] / speed
    const timer = setTimeout(() => {
      setState(getNextState(state))
    }, timing)

    return () => clearTimeout(timer)
  }, [state, isPaused, speed, getNextState, shouldReduceMotion])

  // Derive UI state from animation state
  const showIncoming = ['sms-incoming', 'sms-typing', 'sms-reply', 'ai-processing', 'calendar-update', 'confirmed', 'pause'].includes(state)
  const showTyping = state === 'sms-typing'
  const showReply = ['sms-reply', 'ai-processing', 'calendar-update', 'confirmed', 'pause'].includes(state)
  const isProcessing = state === 'ai-processing'
  const isConfirmed = ['calendar-update', 'confirmed', 'pause'].includes(state)
  const showCalendarUpdate = state === 'calendar-update'

  // Calculate connection line progress
  const getProgress = () => {
    if (state === 'sms-reply') return 0.3
    if (state === 'ai-processing') return 0.6
    if (['calendar-update', 'confirmed', 'pause'].includes(state)) return 1
    return 0
  }

  // Reduced motion fallback - show static confirmed state
  if (shouldReduceMotion) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 px-4">
          <SMSInterface showIncoming={true} showTyping={false} showReply={true} />
          <div className="hidden lg:block text-[#5371CA] text-2xl">→</div>
          <CalendarCard isConfirmed={true} showUpdate={false} />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="img"
      aria-label="Animation showing how Abby automatically interprets SMS replies and updates your Cliniko calendar"
    >
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col items-center gap-6 lg:hidden px-4">
        <SMSInterface
          showIncoming={showIncoming}
          showTyping={showTyping}
          showReply={showReply}
        />

        {/* Mobile Processing Indicator */}
        <div className="h-20 flex items-center justify-center">
          <ProcessingIndicator isActive={isProcessing} />
          {!isProcessing && (
            <motion.div
              className="flex items-center gap-2 text-[#7b93db]"
              initial={{ opacity: 0 }}
              animate={{ opacity: showReply && !isProcessing ? 0.5 : 0 }}
            >
              <div className="w-8 h-px bg-current" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <div className="w-8 h-px bg-current" />
            </motion.div>
          )}
        </div>

        <CalendarCard
          isConfirmed={isConfirmed}
          showUpdate={showCalendarUpdate}
        />
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:flex items-center justify-center gap-4 px-4">
        <SMSInterface
          showIncoming={showIncoming}
          showTyping={showTyping}
          showReply={showReply}
        />

        {/* Connection area with processing */}
        <div className="relative flex items-center justify-center w-40">
          <ConnectionLine isActive={showReply} progress={getProgress()} />
          <div className="absolute">
            <ProcessingIndicator isActive={isProcessing} />
          </div>
        </div>

        <CalendarCard
          isConfirmed={isConfirmed}
          showUpdate={showCalendarUpdate}
        />
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {(['sms', 'processing', 'calendar'] as const).map((step, i) => {
          const isActive =
            (step === 'sms' && ['sms-incoming', 'sms-typing', 'sms-reply'].includes(state)) ||
            (step === 'processing' && state === 'ai-processing') ||
            (step === 'calendar' && ['calendar-update', 'confirmed', 'pause'].includes(state))

          return (
            <motion.div
              key={step}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: isActive ? "#5371CA" : "#475569",
                scale: isActive ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HeroAnimation
