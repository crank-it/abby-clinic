'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { extensionFlow, colourCoding } from '@/lib/data';
import { Smartphone, MessageSquare, Brain, FileText, MousePointer2, Palette, ArrowDown } from 'lucide-react';

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

// Map step numbers to icons and colors
const stepConfig: Record<number, { icon: React.ReactNode; gradient: string; glow: string }> = {
  1: {
    icon: <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-blue-500 to-blue-600",
    glow: "shadow-blue-500/30"
  },
  2: {
    icon: <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-emerald-500 to-emerald-600",
    glow: "shadow-emerald-500/30"
  },
  3: {
    icon: <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-purple-500 to-purple-600",
    glow: "shadow-purple-500/30"
  },
  4: {
    icon: <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-amber-500 to-amber-600",
    glow: "shadow-amber-500/30"
  },
  5: {
    icon: <MousePointer2 className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-[#5371CA] to-[#6381d4]",
    glow: "shadow-[#5371CA]/30"
  },
  6: {
    icon: <Palette className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-pink-500 to-pink-600",
    glow: "shadow-pink-500/30"
  },
};

function JourneyStep({ step, index, isLast }: { step: typeof extensionFlow[0]; index: number; isLast: boolean }) {
  const config = stepConfig[step.step];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Connection line to next step */}
      {!isLast && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-16 md:h-24 bg-gradient-to-b from-slate-600 to-slate-700" />
      )}

      <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isEven ? '' : 'md:flex-row-reverse'}`}>
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`relative flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-2xl ${config.glow}`}
        >
          {config.icon}
          <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center text-sm md:text-lg font-bold text-white">
            {step.step}
          </div>
        </motion.div>

        {/* Content */}
        <div className={`text-center md:text-left ${isEven ? '' : 'md:text-right'} max-w-md`}>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {step.title}
          </h3>
          <p className="text-slate-400 text-base md:text-lg">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#5371CA]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div ref={containerRef} className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8 border border-slate-700"
          >
            <ChromeLogo className="w-6 h-6" />
            <span className="text-slate-300 text-sm font-medium">Chrome Extension</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
            How the magic happens
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From patient reply to colour-coded calendar in 6 simple steps
          </p>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-12"
          >
            <ArrowDown className="w-6 h-6 text-slate-500 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Journey Steps */}
        <div className="space-y-16 md:space-y-24">
          {extensionFlow.map((step, index) => (
            <JourneyStep
              key={step.step}
              step={step}
              index={index}
              isLast={index === extensionFlow.length - 1}
            />
          ))}
        </div>

        {/* The Result - Visual Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
              One click reveals everything
            </h3>
            <p className="text-slate-400 text-lg">
              See exactly who&apos;s coming at a glance
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <div className="grid grid-cols-3 gap-1 p-3 w-full h-full">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-teal-300/80 rounded-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-white font-semibold text-lg">Before</p>
                <p className="text-slate-500 text-sm">Plain Cliniko calendar</p>
              </motion.div>

              {/* Click action */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#5371CA] to-[#6381d4] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-[#5371CA]/30 cursor-pointer"
                >
                  <img src="/abby-extension.svg" alt="Abby" className="w-14 h-14 md:w-16 md:h-16" />
                </motion.div>
                <p className="text-[#7b93db] font-bold text-lg">Click Abby</p>
                <p className="text-slate-500 text-sm">In your toolbar</p>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden ring-4 ring-[#5371CA]/50">
                  <div className="grid grid-cols-3 gap-1 p-3 w-full h-full">
                    <div className="bg-white rounded-sm" />
                    <div className="bg-gray-300 rounded-sm border-b-2 border-red-500" />
                    <div className="bg-teal-300/80 rounded-sm" />
                    <div className="bg-white rounded-sm" />
                    <div className="bg-white rounded-sm" />
                    <div className="bg-gray-300 rounded-sm border-b-2 border-red-500" />
                    <div className="bg-teal-300/80 rounded-sm" />
                    <div className="bg-white rounded-sm" />
                    <div className="bg-teal-300/80 rounded-sm" />
                  </div>
                </div>
                <p className="text-white font-semibold text-lg">After</p>
                <p className="text-slate-500 text-sm">Status revealed instantly</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Colour Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8 font-heading">
            What the colours mean
          </h3>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {colourCoding.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-5 md:p-6 ${item.bgClass} ${item.hasRedUnderline ? 'border-b-4 border-b-red-500' : 'border border-slate-200'}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-lg font-bold ${item.textClass}`}>
                    {item.status}
                  </span>
                  {item.hasRedUnderline && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-medium">Action needed</span>
                  )}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.meaning}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700"
        >
          <h3 className="text-xl font-bold text-white mb-6">Good to know</h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: "Click to reveal", desc: "The extension applies colours whenever you click it" },
              { title: "Colours reset", desc: "Clicking an appointment refreshes Cliniko - just click Abby again" },
              { title: "15-minute cycle", desc: "Abby checks for new responses every 15 minutes" },
              { title: "Read-only", desc: "Abby never sends SMS - it only reads and displays replies" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#5371CA] mt-2 flex-shrink-0" />
                <div>
                  <span className="text-white font-semibold">{item.title}:</span>
                  <span className="text-slate-400 ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
