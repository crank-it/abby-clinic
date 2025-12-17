'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SimpleHeroAnimation } from '@/components/SimpleHeroAnimation';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { Legend } from '@/components/Legend';
import { HowItWorks } from '@/components/HowItWorks';
import { AnimatedStats } from '@/components/AnimatedStats';
import { connectSteps } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const connectStepImages: Record<number, string> = {
  0: "/cliniko-logo-light.png",
  1: "/interpritation.png",
  2: "/extention.png",
  3: "/after.png",
};

// Magic sparkles component - only renders on client
function MagicSparkles({ count = 40 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: 2 + Math.random() * 3,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
  }, [mounted, count]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating particles - only renders on client
function FloatingParticles({ count = 15 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: 4 + Math.random() * 6,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 15,
    }));
  }, [mounted, count]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100px',
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical Aurora Background - Fixed */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Aurora layers */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 80% 50%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 40% 40%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 60% 40%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
              'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
              'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
              'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 50% 30% at 30% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse 50% 30% at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse 50% 30% at 50% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse 50% 30% at 30% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Sparkles */}
        <MagicSparkles count={50} />

        {/* Floating particles */}
        <FloatingParticles count={20} />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 md:py-32 px-4">
        {/* Floating Robots - Hero */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -20 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="hidden lg:block absolute left-4 xl:left-12 top-32 z-20"
        >
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/new-server.png"
              alt="Abby"
              width={120}
              height={120}
              className="drop-shadow-[0_0_25px_rgba(83,113,202,0.4)]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 20 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          className="hidden lg:block absolute right-4 xl:right-12 top-40 z-20"
        >
          <motion.div
            animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/hiw2.png"
              alt="Abby"
              width={100}
              height={100}
              className="drop-shadow-[0_0_25px_rgba(147,51,234,0.4)]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
          className="hidden xl:block absolute left-20 bottom-20 z-20"
        >
          <motion.div
            animate={{ y: [-3, 3, -3], rotate: [-3, 3, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/abby-sends.png"
              alt="Abby"
              width={90}
              height={90}
              className="drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
          className="hidden xl:block absolute right-24 bottom-32 z-20"
        >
          <motion.div
            animate={{ y: [3, -3, 3], rotate: [2, -2, 2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/new-server.png"
              alt="Abby"
              width={85}
              height={85}
              className="drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            />
          </motion.div>
        </motion.div>

        {!showDemo ? (
          <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
            {/* Sparkle badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 backdrop-blur-sm rounded-full text-[#7b93db] text-sm font-medium border border-[#5371CA]/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-powered SMS automation for Cliniko</span>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
                Stop chasing{' '}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-[#5371CA] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    SMS replies
                  </span>
                  <motion.span
                    className="absolute -inset-1 bg-gradient-to-r from-[#5371CA]/20 via-purple-500/20 to-pink-500/20 blur-lg rounded-lg"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                Abby makes Cliniko SMS confirmations a breeze. Let's see it in action.
              </p>
            </motion.div>

            {/* Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              {/* Glow behind animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5371CA]/10 via-purple-500/10 to-[#5371CA]/10 blur-3xl rounded-full scale-75" />
              <div className="relative">
                <SimpleHeroAnimation />
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <motion.button
                  onClick={() => setShowDemo(true)}
                  className="group relative bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-[#5371CA]/30 text-base overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Try it yourself
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#6381d4] to-purple-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <Link
                  href="/pricing"
                  className="text-slate-400 hover:text-white transition-colors px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-full"
                >
                  View pricing
                </Link>
              </div>
              <p className="text-slate-500 text-sm">
                No credit card required · Works with Cliniko
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Demo</span>
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                  Now you try
                </h2>
                <p className="text-slate-400 text-sm">
                  Type any response and watch your calendar update
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-[#5371CA]/10 to-emerald-500/10 blur-3xl rounded-3xl" />
                <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50">
                  <InteractiveDemo />
                  <div className="mt-4">
                    <Legend />
                  </div>
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
          </div>
        )}
      </section>

      {/* Animated Stats Section */}
      <div className="relative z-10">
        <AnimatedStats />
      </div>

      {/* How the Extension Works */}
      <div className="relative z-10">
        <HowItWorks />
      </div>

      {/* Quick Setup Steps */}
      <section className="relative z-10 py-16 sm:py-20 px-4 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
              Get started in minutes
            </h2>
            <p className="text-slate-400">Four simple steps to automation bliss</p>
          </motion.div>

          {/* Mobile: Vertical list, Desktop: 4 columns */}
          <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-8">
            {connectSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex md:flex-col items-center md:text-center gap-4 md:gap-0 group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 md:w-16 md:h-16 bg-slate-800/80 border border-slate-700/50 rounded-2xl flex items-center justify-center md:mb-4 group-hover:border-[#5371CA]/50 transition-colors overflow-hidden"
                >
                  <img
                    src={connectStepImages[i]}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

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

      {/* Final CTA */}
      <section className="relative z-10 py-16 sm:py-20 px-4">
        <div className="max-w-[75%] md:max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#5371CA]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 rounded-full text-[#7b93db] text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start your journey today</span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                Ready to stop manually checking SMS?
              </h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                Join clinics saving hours every week with automated SMS interpretation.
              </p>

              <div className="flex flex-col gap-4 justify-center items-center">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white font-semibold px-8 py-3 rounded-full transition-all"
                >
                  See how it works →
                </Link>
                <motion.a
                  href="https://app.abby.clinic/login?m=signup"
                  className="group relative bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-[#5371CA]/30 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Start your 14-day free trial</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#6381d4] to-purple-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
