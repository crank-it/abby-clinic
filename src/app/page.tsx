'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedJourney } from '@/components/AnimatedJourney';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { Legend } from '@/components/Legend';
import { HowItWorks } from '@/components/HowItWorks';
import { Requirements } from '@/components/Requirements';
import { testimonial, stats, connectSteps } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section - Animated Journey */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        {!showDemo ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Watch Abby in action
              </h1>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                See how patient SMS replies become instant calendar updates
              </p>
            </motion.div>

            <AnimatedJourney onComplete={() => setShowDemo(true)} loops={2} />

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => setShowDemo(true)}
              className="text-[#7b93db] hover:text-[#a3b5e8] text-sm mt-4 transition-colors"
            >
              Skip to demo →
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Now you try
              </h2>
              <p className="text-slate-400 text-lg">
                Type any response and watch your calendar update
              </p>
            </div>

            <InteractiveDemo />

            <div className="mt-6">
              <Legend />
            </div>
          </motion.div>
        )}
      </section>

      {/* Social Proof Strip */}
      <section className="py-16 px-4 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          {/* Testimonial */}
          <div className="text-center mb-12">
            <blockquote className="text-xl md:text-2xl text-white font-medium mb-4">
              &quot;{testimonial.quote}&quot;
            </blockquote>
            <div className="text-slate-400">
              <span className="font-semibold text-white">{testimonial.author}</span>
              {' '}· {testimonial.role}, {testimonial.clinic}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#7b93db]">{stat.number}</p>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the Extension Works - NEW SECTION */}
      <HowItWorks />

      {/* Quick Setup Steps */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {connectSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl md:text-3xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 md:right-auto md:left-1/2 md:ml-6 w-6 h-6 bg-[#5371CA] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-sm md:text-base font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-slate-400 text-xs md:text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to stop manually checking SMS?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
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
