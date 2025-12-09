'use client';

import { motion } from 'framer-motion';
import { extensionFlow, colourCoding } from '@/lib/data';
import { Smartphone, MessageSquare, Brain, FileText, MousePointer2, Palette } from 'lucide-react';

// Chrome logo SVG component
const ChromeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="white"/>
    <path d="M24 14C18.4772 14 14 18.4772 14 24H24V14Z" fill="#EA4335"/>
    <path d="M24 14C29.5228 14 34 18.4772 34 24C34 26.3894 33.1545 28.5752 31.7574 30.2574L24 24V14Z" fill="#FFCD40"/>
    <path d="M24 34C29.5228 34 34 29.5228 34 24H24V34Z" fill="#4285F4"/>
    <path d="M14 24C14 29.5228 18.4772 34 24 34L24 24H14Z" fill="#34A853"/>
    <circle cx="24" cy="24" r="8" fill="white"/>
    <circle cx="24" cy="24" r="4" fill="#4285F4"/>
  </svg>
);

// Cliniko-style logo
const ClinikoLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={`${className} bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center`}>
    <span className="text-white font-bold text-sm">C</span>
  </div>
);

// Map step numbers to Feather icons
const stepIcons: Record<number, React.ReactNode> = {
  1: <Smartphone className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
  2: <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
  3: <Brain className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
  4: <FileText className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
  5: <MousePointer2 className="w-6 h-6 md:w-7 md:h-7 text-white" />,
  6: <Palette className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
};

export function HowItWorks() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Chrome badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2 mb-6">
            <ChromeLogo className="w-5 h-5" />
            <span className="text-slate-300 text-sm font-medium">Chrome Extension</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            How the extension works
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Abby is a Chrome browser extension that reads patient SMS replies and displays their status directly on your Cliniko calendar.
          </p>
        </motion.div>

        {/* Flow Diagram - 6 steps in 2 rows */}
        <div className="relative mb-16">
          {/* First row: Steps 1-3 (Background process) */}
          <div className="mb-8">
            <p className="text-center text-slate-500 text-xs uppercase tracking-wider mb-4">Behind the scenes</p>
            <div className="grid grid-cols-3 gap-3 md:gap-6 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-slate-700 via-[#5371CA] to-slate-700" />

              {extensionFlow.slice(0, 3).map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center">
                      {stepIcons[step.step]}
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-slate-600 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold text-white">
                      {step.step}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-white font-semibold text-sm md:text-base mb-1">{step.title}</h3>
                    <p className="text-slate-400 text-xs md:text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider with arrow */}
          <div className="flex items-center justify-center my-6">
            <div className="h-8 w-0.5 bg-gradient-to-b from-slate-700 to-[#5371CA]"></div>
          </div>

          {/* Second row: Steps 4-6 (User action) */}
          <div>
            <p className="text-center text-slate-500 text-xs uppercase tracking-wider mb-4">What you do</p>
            <div className="grid grid-cols-3 gap-3 md:gap-6 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#5371CA] via-[#6381d4] to-[#5371CA]" />

              {extensionFlow.slice(3, 6).map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center ${
                      step.step === 5
                        ? 'bg-[#5371CA] border-2 border-[#6381d4]'
                        : 'bg-slate-800 border-2 border-slate-700'
                    }`}>
                      {stepIcons[step.step]}
                    </div>
                    <div className={`absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold text-white ${
                      step.step === 5 ? 'bg-[#6381d4]' : 'bg-[#5371CA]'
                    }`}>
                      {step.step}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className={`font-semibold text-sm md:text-base mb-1 ${step.step === 5 ? 'text-[#7b93db]' : 'text-white'}`}>
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual: The Extension Click */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700 mb-12"
        >
          <h3 className="text-lg font-semibold text-white text-center mb-6">
            One click reveals everything
          </h3>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Before - Plain calendar */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-3 overflow-hidden">
                <div className="grid grid-cols-3 gap-0.5 p-2 w-full h-full">
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                </div>
              </div>
              <p className="text-white font-semibold">Your Cliniko calendar</p>
              <p className="text-slate-400 text-xs">Before clicking</p>
            </div>

            {/* Click the extension */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-2 mb-3">
                <svg className="w-6 h-6 text-slate-500 rotate-90 md:rotate-0 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <motion.div
                  className="w-16 h-16 bg-[#1c283c] rounded-2xl flex items-center justify-center cursor-pointer border-slate-700 border-2 hover:bg-[#1e293b]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src="/abby-extension.svg" alt="Abby Logo" className="w-10 h-10" />
                </motion.div>
                <p className="text-[#7b93db] text-sm font-medium">Click here</p>
              </div>
              <p className="text-white font-semibold">Abby Extension</p>
              <p className="text-slate-400 text-xs">In your Chrome toolbar</p>
            </div>

            {/* After - Colour coded */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-3 overflow-hidden ring-2 ring-[#5371CA]">
                <div className="grid grid-cols-3 gap-0.5 p-2 w-full h-full">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-gray-200 rounded-sm border-b-2 border-b-red-500"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-gray-200 rounded-sm border-b-2 border-b-red-500"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-teal-200 rounded-sm"></div>
                </div>
              </div>
              <p className="text-white font-semibold">Status revealed</p>
              <p className="text-slate-400 text-xs">Instantly see who&apos;s coming</p>
            </div>
          </div>
        </motion.div>

        {/* Colour coding legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white text-center mb-6">
            At a glance, you&apos;ll know
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {colourCoding.map((item, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 border ${item.bgClass} ${item.hasRedUnderline ? 'border-b-4 border-b-red-500' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-base font-bold ${item.textClass}`}>
                    {item.status}
                  </span>
                  {item.hasRedUnderline && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">Call them</span>
                  )}
                </div>
                <p className="text-slate-600 text-sm">{item.meaning}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-slate-800 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Good to know</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-[#5371CA] mt-1">•</span>
              <span><strong className="text-white">Click to reveal:</strong> The extension applies status updates to your calendar whenever you open it.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5371CA] mt-1">•</span>
              <span><strong className="text-white">Colours reset:</strong> When you click an appointment, Cliniko refreshes the page. Just click the Abby icon again</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5371CA] mt-1">•</span>
              <span><strong className="text-white">15-minute cycle:</strong> Abby checks for new responses every 15 minutes, consistent with Cliniko&apos;s update cycle.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#5371CA] mt-1">•</span>
              <span><strong className="text-white">Read-only:</strong> Abby operates in a read-only capacity and does not send SMS messages. It interprets and displays replies received through your existing Cliniko reminders.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
