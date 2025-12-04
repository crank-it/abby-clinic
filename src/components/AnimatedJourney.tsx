'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyScenarios } from '@/lib/data';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface AnimatedJourneyProps {
  onComplete: () => void;
  loops?: number;
}

type Phase = 'idle' | 'sms-appear' | 'traveling' | 'processing' | 'arriving' | 'result' | 'pause';

// Desktop timings
const desktopTimings: Record<Phase, number> = {
  'idle': 400,
  'sms-appear': 1000,
  'traveling': 1400,
  'processing': 800,
  'arriving': 500,
  'result': 1400,
  'pause': 300
};

// Faster timings for mobile
const mobileTimings: Record<Phase, number> = {
  'idle': 300,
  'sms-appear': 800,
  'traveling': 1000,
  'processing': 600,
  'arriving': 400,
  'result': 1200,
  'pause': 250
};

export function AnimatedJourney({ onComplete, loops = 2 }: AnimatedJourneyProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const isMobile = useIsMobile();

  const scenario = journeyScenarios[scenarioIndex];
  const phaseTimings = isMobile ? mobileTimings : desktopTimings;

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const transitions: Record<Phase, () => void> = {
        'idle': () => setPhase('sms-appear'),
        'sms-appear': () => setPhase('traveling'),
        'traveling': () => setPhase('processing'),
        'processing': () => setPhase('arriving'),
        'arriving': () => setPhase('result'),
        'result': () => setPhase('pause'),
        'pause': () => {
          if (scenarioIndex < journeyScenarios.length - 1) {
            setScenarioIndex(i => i + 1);
            setPhase('idle');
          } else if (loopCount < loops - 1) {
            setScenarioIndex(0);
            setLoopCount(c => c + 1);
            setPhase('idle');
          } else {
            handleComplete();
          }
        }
      };
      transitions[phase]();
    }, phaseTimings[phase]);

    return () => clearTimeout(timer);
  }, [phase, scenarioIndex, loopCount, loops, handleComplete, phaseTimings]);

  // Mobile Layout - Vertical
  if (isMobile) {
    return (
      <div className="relative w-full flex flex-col items-center gap-4 py-4">
        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-36 bg-slate-700 rounded-2xl border-3 border-slate-600 p-1.5 shadow-xl">
            <div className="w-full h-full bg-slate-800 rounded-xl flex flex-col justify-end p-1.5 overflow-hidden">
              {/* Outgoing message */}
              <div className="bg-[#5371CA] rounded-lg rounded-tr-sm p-1.5 mb-1.5 max-w-[95%] self-end">
                <p className="text-[6px] text-white leading-tight">
                  Reminder: Appt tomorrow
                </p>
              </div>

              {/* Incoming message */}
              <AnimatePresence>
                {phase !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{
                      opacity: phase === 'sms-appear' ? 1 : 0.5,
                      y: 0,
                      scale: 1
                    }}
                    className="bg-slate-600 rounded-lg rounded-tl-sm p-1.5 max-w-[95%]"
                  >
                    <p className="text-[6px] text-white leading-tight">
                      {scenario.sms.length > 25 ? scenario.sms.substring(0, 22) + '...' : scenario.sms}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] text-center mt-2">Patient</p>
        </motion.div>

        {/* Vertical dotted line + traveling particle */}
        <div className="relative h-16 w-px">
          <div className="absolute inset-0 border-l-2 border-dashed border-[#6381d4]/20" />

          {/* Traveling Particle - vertical */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ top: 0, opacity: 0 }}
            animate={{
              top: phase === 'traveling' ? '100%' :
                   phase === 'processing' ? '100%' :
                   phase === 'arriving' ? '100%' : 0,
              opacity: ['traveling', 'processing', 'arriving'].includes(phase) ? 1 : 0,
              scale: phase === 'processing' ? 1.3 : 1
            }}
            transition={{
              duration: phase === 'traveling' ? 1.0 : 0.3,
              ease: 'easeInOut'
            }}
          >
            <div className="relative">
              <div className={`w-4 h-4 rounded-full bg-[#6381d4] shadow-lg shadow-teal-500/50 ${
                phase === 'processing' ? 'animate-pulse' : ''
              }`} />
              <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-30" />
            </div>
          </motion.div>
        </div>

        {/* AI Processing Indicator */}
        <AnimatePresence>
          {phase === 'processing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center -my-2"
            >
              <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-[#6381d4] flex items-center justify-center shadow-lg shadow-teal-500/20">
                <span className="text-xl">🧠</span>
              </div>
              <motion.span
                className="text-[#7b93db] text-xs mt-1 font-medium"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                Interpreting...
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Another vertical line */}
        <div className="relative h-8 w-px">
          <div className="absolute inset-0 border-l-2 border-dashed border-[#6381d4]/20" />
        </div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-40 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#5371CA] px-2.5 py-1.5">
              <span className="text-white text-xs font-semibold">Calendar</span>
            </div>
            <div className="p-1.5 space-y-1">
              {/* Context appointment - Confirmed (white) */}
              <div className="bg-white border border-slate-300 rounded p-1.5 opacity-50">
                <p className="text-[9px] text-gray-600 font-medium">9:00 - Sarah M.</p>
              </div>

              {/* Main appointment */}
              <motion.div
                className={`rounded p-1.5 border transition-colors duration-500 ${
                  ['result', 'pause'].includes(phase)
                    ? `${scenario.calendarClass} ${scenario.hasRedUnderline ? 'border-b-2 border-b-red-500' : ''}`
                    : 'bg-teal-100 border-[#7b93db]'
                }`}
                animate={{
                  scale: ['result', 'pause'].includes(phase) ? 1.02 : 1
                }}
              >
                <p className="text-[9px] text-gray-800 font-semibold">10:30 - James C.</p>
                <p className="text-[8px] text-gray-500">Follow-up</p>
                <AnimatePresence>
                  {['result', 'pause'].includes(phase) && (
                    <motion.div
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-0.5"
                    >
                      <span className={`text-[7px] px-1 py-0.5 rounded ${
                        scenario.result === 'confirmed'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {scenario.icon} {scenario.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Context appointment - No response (teal) */}
              <div className="bg-teal-100 border border-[#7b93db] rounded p-1.5 opacity-50">
                <p className="text-[9px] text-gray-600 font-medium">11:30 - Emily W.</p>
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] text-center mt-2">Your Cliniko</p>
        </motion.div>

        {/* Current SMS Display */}
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mt-2"
            >
              <div className="bg-slate-700 rounded-full px-3 py-2 shadow-lg max-w-[280px]">
                <p className="text-white text-xs text-center">&quot;{scenario.sms}&quot;</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-2">
          {journeyScenarios.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === scenarioIndex ? 'bg-[#6381d4]' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Desktop Layout - Horizontal (larger, fills viewport better)
  return (
    <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden px-4">
      {/* SVG Path Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 150 250 Q 350 150 500 250 Q 650 350 850 250"
          fill="none"
          stroke="rgba(20, 184, 166, 0.2)"
          strokeWidth="3"
          strokeDasharray="10 8"
        />
      </svg>

      {/* Phone - Left Side */}
      <motion.div
        className="absolute left-[5%] md:left-[10%]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-40 md:w-48 h-72 md:h-80 bg-slate-700 rounded-[2.5rem] border-4 border-slate-600 p-3 shadow-2xl">
          <div className="w-full h-full bg-slate-800 rounded-[2rem] flex flex-col justify-end p-3 overflow-hidden">
            {/* Outgoing message */}
            <div className="bg-[#5371CA] rounded-xl rounded-tr-sm p-3 mb-3 max-w-[90%] self-end">
              <p className="text-[11px] md:text-xs text-white leading-relaxed">
                Hi James, reminder for your appointment tomorrow at 10:30 AM. Reply to confirm.
              </p>
              <p className="text-[9px] text-teal-200 mt-1 text-right">Sent 2:30 PM</p>
            </div>

            {/* Incoming message */}
            <AnimatePresence>
              {phase !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{
                    opacity: phase === 'sms-appear' ? 1 : 0.6,
                    y: 0,
                    scale: 1
                  }}
                  className="bg-slate-600 rounded-xl rounded-tl-sm p-3 max-w-[90%]"
                >
                  <p className="text-[11px] md:text-xs text-white leading-relaxed">
                    {scenario.sms}
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1">Just now</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="text-slate-400 text-sm text-center mt-4 font-medium">Patient&apos;s phone</p>
      </motion.div>

      {/* Traveling Particle */}
      <motion.div
        className="absolute"
        initial={{ left: '20%', opacity: 0 }}
        animate={{
          left: phase === 'traveling' ? '50%' :
            phase === 'processing' ? '50%' :
              phase === 'arriving' ? '75%' : '20%',
          opacity: ['traveling', 'processing', 'arriving'].includes(phase) ? 1 : 0,
          scale: phase === 'processing' ? 1.8 : 1,
          x: '-50%'
        }}
        transition={{
          duration: phase === 'traveling' ? 1.4 :
            phase === 'arriving' ? 0.5 : 0.3,
          ease: 'easeInOut'
        }}
      >
        <div className="relative">
          <div className={`w-6 h-6 rounded-full bg-[#6381d4] shadow-lg shadow-teal-500/50 ${phase === 'processing' ? 'animate-pulse' : ''
            }`} />
          <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-30" />
        </div>
      </motion.div>

      {/* AI Processing Indicator - Centre */}
      <AnimatePresence>
        {phase === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-700 border-3 border-[#6381d4] flex items-center justify-center shadow-xl shadow-teal-500/30">
              <span className="text-4xl md:text-5xl">🧠</span>
            </div>
            <motion.span
              className="text-[#7b93db] text-base md:text-lg mt-3 font-semibold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              Interpreting...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar - Right Side */}
      <motion.div
        className="absolute right-[5%] md:right-[10%]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-52 md:w-64 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#5371CA] px-4 py-3">
            <span className="text-white text-base font-semibold">Calendar</span>
            <span className="text-teal-100 text-sm ml-2">Tuesday</span>
          </div>
          <div className="p-3 space-y-2">
            {/* Context appointment - Confirmed (white) */}
            <div className="bg-white border-2 border-slate-300 rounded-lg p-3 opacity-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700 font-medium">9:00 AM - Sarah M.</p>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">✓</span>
              </div>
            </div>

            {/* Main appointment - this one changes */}
            <motion.div
              className={`rounded-lg p-3 border-2 transition-colors duration-500 ${['result', 'pause'].includes(phase)
                  ? `${scenario.calendarClass} ${scenario.hasRedUnderline ? 'border-b-4 border-b-red-500' : ''}`
                  : 'bg-teal-100 border-[#7b93db]'
                }`}
              animate={{
                scale: ['result', 'pause'].includes(phase) ? 1.02 : 1
              }}
            >
              <p className="text-sm text-gray-800 font-semibold">10:30 AM - James C.</p>
              <p className="text-xs text-gray-500">Follow-up Appointment</p>
              <AnimatePresence>
                {['result', 'pause'].includes(phase) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <span className={`text-xs px-2 py-1 rounded font-medium ${scenario.result === 'confirmed'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                      {scenario.icon} {scenario.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Context appointment - No response (teal) */}
            <div className="bg-teal-100 border-2 border-[#7b93db] rounded-lg p-3 opacity-50">
              <p className="text-sm text-gray-700 font-medium">11:30 AM - Emily W.</p>
            </div>
          </div>
        </div>
        <p className="text-slate-400 text-sm text-center mt-4 font-medium">Your Cliniko calendar</p>
      </motion.div>

      {/* Current SMS Display - Bottom */}
      <AnimatePresence>
        {phase !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="bg-slate-700 rounded-full px-6 py-3 shadow-lg">
              <p className="text-white text-base">&quot;{scenario.sms}&quot;</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {journeyScenarios.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${i === scenarioIndex ? 'bg-[#6381d4]' : 'bg-slate-600'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
