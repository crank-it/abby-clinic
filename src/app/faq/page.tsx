'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FAQAccordion } from '@/components/FAQAccordion';
import { comprehensiveFAQ, whatAbbyIs, whatAbbyIsNot, quickStart } from '@/lib/data';
import Link from 'next/link';
import { Wrench, Puzzle, Brain, AlertTriangle, Lock, CreditCard, Check, X, Sparkles, HelpCircle, Rocket, Zap, Shield, MessageCircle } from 'lucide-react';

const categories = [
  { id: 'setup', label: 'Setup & Installation', icon: <Wrench className="w-4 h-4" />, color: 'emerald' },
  { id: 'extension', label: 'Chrome Extension', icon: <Puzzle className="w-4 h-4" />, color: 'blue' },
  { id: 'ai', label: 'AI & Accuracy', icon: <Brain className="w-4 h-4" />, color: 'purple' },
  { id: 'limitations', label: 'Limitations', icon: <AlertTriangle className="w-4 h-4" />, color: 'amber' },
  { id: 'privacy', label: 'Privacy & Security', icon: <Lock className="w-4 h-4" />, color: 'pink' },
  { id: 'billing', label: 'Billing & Pricing', icon: <CreditCard className="w-4 h-4" />, color: 'cyan' },
];

// Magic sparkles component
function MagicSparkles({ count = 40 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{size: number; left: number; top: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    setParticles(
      [...Array(count)].map(() => ({
        size: 2 + Math.random() * 3,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
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

// Floating particles
function FloatingParticles({ count = 15 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{size: number; left: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    setParticles(
      [...Array(count)].map(() => ({
        size: 4 + Math.random() * 6,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 20 + Math.random() * 15,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
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

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('setup');

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

      {/* Floating Robots */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="hidden lg:block fixed left-4 xl:left-8 top-32 z-20"
      >
        <motion.div
          animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/interpritation.png"
            alt="Abby"
            width={100}
            height={100}
            className="drop-shadow-[0_0_25px_rgba(83,113,202,0.4)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        className="hidden lg:block fixed right-4 xl:right-8 top-40 z-20"
      >
        <motion.div
          animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/server.png"
            alt="Abby"
            width={90}
            height={90}
            className="drop-shadow-[0_0_25px_rgba(147,51,234,0.4)]"
          />
        </motion.div>
      </motion.div>

      {/* Header */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 backdrop-blur-sm rounded-full text-[#7b93db] text-sm font-medium border border-[#5371CA]/30 mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading"
          >
            Frequently Asked{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#5371CA] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-[#5371CA]/20 via-purple-500/20 to-pink-500/20 blur-lg rounded-lg"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Everything you need to get started and stay running smoothly.
          </motion.p>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="relative z-10 px-4 pb-10 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-700/50"
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-[#5371CA]/10 to-emerald-500/10 rounded-3xl blur-xl -z-10" />

            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center"
              >
                <Rocket className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <h2 className="text-xl font-bold text-white">Quick Start Guide</h2>
            </div>

            <div className="space-y-6">
              {quickStart.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex-shrink-0 w-8 h-8 bg-[#5371CA] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#5371CA]/30"
                  >
                    {item.step}
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 group-hover:text-[#7b93db] transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.instruction}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Abby Is / Isn't */}
      <section className="relative z-10 px-4 pb-10 sm:pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4"
            >
              <Zap className="w-4 h-4" />
              <span>Know Your Tool</span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
              Understanding Abby
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* What Abby IS */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.span>
                Abby IS
              </h3>
              <ul className="space-y-3">
                {whatAbbyIs.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* What Abby IS NOT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50 hover:border-red-500/50 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <motion.span
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30"
                >
                  <X className="w-4 h-4 text-white" />
                </motion.span>
                Abby is NOT
              </h3>
              <ul className="space-y-3">
                {whatAbbyIsNot.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="text-red-400 mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="relative z-10 px-4 pb-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 rounded-full text-[#7b93db] text-sm font-medium mb-4"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Browse by Topic</span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
              Common Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-[#5371CA] text-white border-[#5371CA] shadow-lg shadow-[#5371CA]/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700'
                }`}
              >
                {cat.icon}
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative z-10 px-4 pb-10 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {activeCategory === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FAQAccordion items={comprehensiveFAQ.setup} title="Setup & Installation" />
              </motion.div>
            )}
            {activeCategory === 'extension' && (
              <motion.div
                key="extension"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FAQAccordion items={comprehensiveFAQ.extension} title="Chrome Extension" />
              </motion.div>
            )}
            {activeCategory === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FAQAccordion items={comprehensiveFAQ.ai} title="AI & Accuracy" />
              </motion.div>
            )}
            {activeCategory === 'limitations' && (
              <motion.div
                key="limitations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FAQAccordion items={comprehensiveFAQ.limitations} title="Limitations" />
              </motion.div>
            )}
            {activeCategory === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FAQAccordion items={comprehensiveFAQ.privacy} title="Privacy & Security" />
              </motion.div>
            )}
            {activeCategory === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FAQAccordion items={comprehensiveFAQ.billing} title="Billing & Pricing" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Still have questions? */}
      <section className="relative z-10 px-4 pb-12 sm:pb-20">
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

            {/* Peeking robots */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ x: [-3, 3, -3], rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/hiw2.png"
                  alt="Abby"
                  width={80}
                  height={80}
                  className="drop-shadow-[0_0_15px_rgba(83,113,202,0.5)]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ x: [3, -3, 3], rotate: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/abby-sends.png"
                  alt="Abby"
                  width={80}
                  height={80}
                  className="drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                />
              </motion.div>
            </motion.div>

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 rounded-full text-[#7b93db] text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>We're here to help</span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 font-heading">
                Still have questions?
              </h2>
              <p className="text-slate-400 mb-8">
                We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-block bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg shadow-[#5371CA]/30"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/pricing"
                    className="inline-block bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
                  >
                    View Pricing
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
