'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SimpleHeroAnimation } from '@/components/SimpleHeroAnimation';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { Legend } from '@/components/Legend';
import { HowItWorks } from '@/components/HowItWorks';
import { AnimatedStats } from '@/components/AnimatedStats';
import { connectSteps } from '@/lib/data';
import Link from 'next/link';
import { Key, Brain, MousePointer2, Palette } from 'lucide-react';

const connectStepIcons: Record<number, React.ReactNode> = {
  0: <Key className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
  1: <Brain className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
  2: <MousePointer2 className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
  3: <Palette className="w-6 h-6 md:w-7 md:h-7 text-slate-300" />,
};

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section - Single Viewport */}
      <section className="h-[100svh] flex flex-col px-4 py-6 overflow-hidden">
        {!showDemo ? (
          <div className="flex-1 flex flex-col justify-between max-w-lg mx-auto w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-2"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-heading">
                Stop chasing SMS replies
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                Abby makes Cliniko SMS confirmations a breeze. Let's see it in action
              </p>
            </motion.div>

            {/* Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex items-center justify-center py-4"
            >
              <SimpleHeroAnimation />
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center pb-2"
            >
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowDemo(true)}
                  className="bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-[#5371CA]/30 text-sm"
                >
                  Try it yourself →
                </button>
              </div>
              <p className="text-slate-500 text-xs">
                No credit card required · Works with Cliniko
              </p>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col max-w-5xl mx-auto w-full"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                Now you try
              </h2>
              <p className="text-slate-400 text-sm">
                Type any response and watch your calendar update
              </p>
            </div>

            <div className="flex-1 overflow-auto">
              <InteractiveDemo />
              <div className="mt-4">
                <Legend />
              </div>
            </div>

            <div className="text-center py-4">
              <button
                onClick={() => setShowDemo(false)}
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                ← Back to animation
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* How the Extension Works */}
      <HowItWorks />

      {/* Quick Setup Steps */}
      <section className="py-16 sm:py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12 font-heading">
            Get started in minutes
          </h2>

          {/* Mobile: Vertical list, Desktop: 4 columns */}
          <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-8">
            {connectSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex md:flex-col items-center md:text-center gap-4 md:gap-0"
              >
                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-700 rounded-2xl flex items-center justify-center md:mb-4">
                  {connectStepIcons[i]}
                </div>

                {/* Text content */}
                <div className="flex-1 md:flex-none">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive CTA */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
              Sounds pretty cool, hey?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8">
              Now let&apos;s really get into the weeds of how this life-changing application works.
            </p>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              See how it works →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 bg-slate-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
            Ready to stop manually checking SMS?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8">
            Join clinics saving hours every week with automated SMS interpretation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://app.abby.clinic/login?m=signup"
              className="bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg shadow-[#5371CA]/30"
            >
              Start your 14-day free trial
            </a>
            <Link
              href="/pricing"
              className="text-slate-400 hover:text-white transition-colors"
            >
              See pricing →
            </Link>
          </div>

          <p className="text-slate-500 text-sm mt-6">
            No credit card required · Works with Cliniko
          </p>
        </div>
      </section>
    </div>
  );
}
