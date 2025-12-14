'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ROICalculator } from '@/components/ROICalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Requirements } from '@/components/Requirements';
import { currencies, type CurrencyCode, formatCurrency } from '@/lib/currencies';
import { pricingFAQ, pricingIncluded } from '@/lib/data';
import Link from 'next/link';
import { Sparkles, Calculator, Check } from 'lucide-react';

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

export default function PricingPage() {
  const [currency, setCurrency] = useState<CurrencyCode>('AUD');

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
  };

  const currencyConfig = currencies[currency];

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
            src="/hiw1.png"
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
            src="/hiw2.png"
            alt="Abby"
            width={90}
            height={90}
            className="drop-shadow-[0_0_25px_rgba(147,51,234,0.4)]"
          />
        </motion.div>
      </motion.div>

      {/* ROI Calculator */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full text-emerald-400 text-sm font-medium border border-emerald-500/30 mb-6"
            >
              <Calculator className="w-4 h-4" />
              <span>ROI Calculator</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading"
            >
              Calculate your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-[#5371CA] to-purple-400 bg-clip-text text-transparent">
                  savings
                </span>
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 via-[#5371CA]/20 to-purple-400/20 blur-lg rounded-lg"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-lg max-w-xl mx-auto"
            >
              Answer 5 quick questions to see how much time and money Abby could save your clinic.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ROICalculator currency={currency} onCurrencyChange={handleCurrencyChange} />
          </motion.div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="relative z-10 py-12 sm:py-16 px-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 rounded-full text-[#7b93db] text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simple Pricing</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-heading"
            >
              Simple, transparent pricing
            </motion.h2>

            {/* Currency Selector */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center gap-2 mb-8"
            >
              {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
                <motion.button
                  key={code}
                  onClick={() => setCurrency(code)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currency === code
                      ? 'bg-[#5371CA] text-white shadow-lg shadow-[#5371CA]/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {currencies[code].flag} {code}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-[#5371CA]/50 transition-all"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5371CA]/10 via-purple-500/10 to-[#5371CA]/10 rounded-3xl blur-xl -z-10 opacity-0 hover:opacity-100 transition-opacity" />

              <div className="text-center mb-8">
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">Everything included</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-white">
                    {formatCurrency(currencyConfig.monthly, currency)}
                  </span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="text-[#7b93db] text-sm mt-2">
                  or {formatCurrency(currencyConfig.annual, currency)}/year – save ~12%
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pricingIncluded.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <div className="w-5 h-5 bg-[#5371CA]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#7b93db]" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="https://app.abby.clinic/login?m=signup"
                className="block w-full bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold py-4 rounded-xl transition-all text-center shadow-lg shadow-[#5371CA]/30 overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Start your 14-day free trial</span>
              </motion.a>
              <p className="text-slate-500 text-sm text-center mt-4">
                No credit card required
              </p>
            </motion.div>

            {/* Requirements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Requirements variant="full" />

              <div className="mt-4 text-center">
                <Link href="/faq" className="text-[#7b93db] hover:text-[#a3b5e8] text-sm transition-colors">
                  Have questions? See our FAQ →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-white mb-8 text-center font-heading"
          >
            Frequently asked questions
          </motion.h2>
          <FAQAccordion items={pricingFAQ} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
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
                  src="/abby-sends.png"
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
                  src="/server.png"
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
                <span>Start saving today</span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                Ready to automate your confirmations?
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Join clinics saving hours every week. 14-day free trial.
              </p>
              <motion.a
                href="https://app.abby.clinic/login?m=signup"
                className="group relative inline-block bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-[#5371CA]/30 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start your free trial
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
