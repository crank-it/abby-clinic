'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQAccordion } from '@/components/FAQAccordion';
import { comprehensiveFAQ, whatAbbyIs, whatAbbyIsNot } from '@/lib/data';
import Link from 'next/link';

const categories = [
  { id: 'setup', label: 'Setup & Installation', icon: '🔧' },
  { id: 'extension', label: 'Chrome Extension', icon: '🧩' },
  { id: 'ai', label: 'AI & Accuracy', icon: '🧠' },
  { id: 'limitations', label: 'Limitations', icon: '⚠️' },
  { id: 'privacy', label: 'Privacy & Security', icon: '🔒' },
  { id: 'billing', label: 'Billing & Pricing', icon: '💳' },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('setup');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Everything you need to know about Abby, the Chrome extension that interprets patient SMS replies for Cliniko.
          </motion.p>
        </div>
      </section>

      {/* What Abby Is / Isn't */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* What Abby IS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#5371CA] rounded-full flex items-center justify-center text-sm">✓</span>
                Abby IS
              </h2>
              <ul className="space-y-3">
                {whatAbbyIs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-[#5371CA] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What Abby IS NOT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-sm">✗</span>
                Abby is NOT
              </h2>
              <ul className="space-y-3">
                {whatAbbyIsNot.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="px-4 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#5371CA] text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-4 pb-16">
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
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-3">
              Still have questions?
            </h2>
            <p className="text-slate-400 mb-6">
              We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/pricing"
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
