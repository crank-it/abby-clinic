'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { interpretSMS, type InterpretationResult } from '@/lib/interpretSMS';
import { suggestedResponses } from '@/lib/data';

export function InteractiveDemo() {
  const [smsText, setSmsText] = useState('');
  const [interpretation, setInterpretation] = useState<InterpretationResult>(interpretSMS(''));
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (smsText) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        setInterpretation(interpretSMS(smsText));
        setIsProcessing(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setInterpretation(interpretSMS(''));
    }
  }, [smsText]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl mx-auto">
      {/* SMS Panel - Left side on desktop */}
      <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
        <div className="bg-slate-700 px-3 py-2.5 md:px-4 md:py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#5371CA] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">JC</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm md:text-base">James Cooper</p>
              <p className="text-slate-400 text-xs md:text-sm">Replying to reminder</p>
            </div>
          </div>
        </div>

        <div className="p-3 md:p-4 space-y-3 md:space-y-4">
          {/* Outgoing message */}
          <div className="flex justify-end">
            <div className="bg-[#5371CA] text-white rounded-2xl rounded-tr-sm px-3 py-2 md:px-4 md:py-2.5 max-w-[85%]">
              <p className="text-xs md:text-sm">
                Hi James, reminder for your appointment tomorrow at 10:30 AM. Reply to confirm.
              </p>
              <p className="text-[10px] md:text-xs text-teal-200 mt-1 text-right">Sent 2:30 PM</p>
            </div>
          </div>

          {/* Input area */}
          <div className="flex justify-start">
            <div className="bg-slate-600 rounded-2xl rounded-tl-sm px-3 py-2.5 md:px-4 md:py-3 w-full">
              <textarea
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                placeholder="Type any patient response..."
                className="w-full bg-transparent text-white placeholder-slate-400 resize-none outline-none text-sm min-h-[50px] md:min-h-[60px]"
                rows={2}
              />
            </div>
          </div>

          {/* Suggestions - horizontally scrollable on mobile */}
          <div>
            <p className="text-slate-500 text-xs mb-2 uppercase tracking-wide font-medium">
              Try these:
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible scrollbar-hide">
              {suggestedResponses.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setSmsText(suggestion.text)}
                  className="flex-shrink-0 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-2 md:py-1.5 rounded-full transition-colors min-h-[40px] md:min-h-0"
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>

          {/* Clear button */}
          <AnimatePresence>
            {smsText && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSmsText('')}
                className="w-full text-sm text-slate-400 hover:text-white py-3 md:py-2 transition-colors min-h-[44px]"
              >
                Clear and try again
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Calendar Panel - Right side on desktop */}
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1">
          <div className="bg-gradient-to-r from-[#5371CA] to-teal-700 px-3 py-2.5 md:px-4 md:py-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-sm md:text-base">Cliniko Calendar</span>
              <span className="text-teal-100 text-xs md:text-sm">Tuesday, 3 Dec</span>
            </div>
          </div>

          <div className="p-3 md:p-4 space-y-3 md:space-y-4">
            {/* Context appointment - Confirmed (white) */}
            <div className="bg-white border-2 border-slate-300 rounded-lg p-4 md:p-5 opacity-60">
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-700 text-sm md:text-base">9:00 AM - Sarah Mitchell</p>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">✓ Confirmed</span>
              </div>
            </div>

            {/* Active appointment */}
            <motion.div
              className={`${interpretation.colorClass} border-2 rounded-lg p-4 md:p-5 transition-all duration-500 ${interpretation.hasRedUnderline ? 'border-b-4 border-b-red-500' : ''}`}
              animate={{
                scale: smsText && !isProcessing ? 1.01 : 1,
                boxShadow: smsText && !isProcessing
                  ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  : '0 0 0 0 rgba(0, 0, 0, 0)'
              }}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-800 text-sm md:text-base">10:30 AM - James Cooper</p>
                  <p className="text-sm text-gray-600">Follow-up Appointment</p>
                  <p className="text-xs text-gray-500 mt-1">Ph: 021 555 0123</p>
                </div>
                <div className="flex-shrink-0">
                  {isProcessing ? (
                    <motion.span
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded whitespace-nowrap"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      Processing...
                    </motion.span>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${interpretation.badgeClass}`}>
                      {interpretation.icon} {interpretation.label}
                    </span>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {smsText && !isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-300"
                  >
                    <p className="text-xs text-gray-500 font-medium">SMS Response:</p>
                    <p className="text-sm text-gray-700 italic break-words">&quot;{smsText}&quot;</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Context appointment - No response yet (coloured/teal) */}
            <div className="bg-teal-100 border-2 border-[#7b93db] rounded-lg p-4 md:p-5 opacity-60">
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-700 text-sm md:text-base">11:30 AM - Emily Watson</p>
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">Awaiting...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
