'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ROICalculator } from '@/components/ROICalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Requirements } from '@/components/Requirements';
import { currencies, type CurrencyCode, formatCurrency } from '@/lib/currencies';
import { pricingFAQ, pricingIncluded } from '@/lib/data';
import Link from 'next/link';

export default function PricingPage() {
  const [currency, setCurrency] = useState<CurrencyCode>('AUD');

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
  };

  const currencyConfig = currencies[currency];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* ROI Calculator */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Calculate your savings
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Answer 5 quick questions to see how much time and money Abby could save your clinic.
            </p>
          </div>

          <ROICalculator currency={currency} onCurrencyChange={handleCurrencyChange} />
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>

            {/* Currency Selector */}
            <div className="flex justify-center gap-2 mb-8">
              {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currency === code
                      ? 'bg-[#5371CA] text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {currencies[code].flag} {code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
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
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-[#5371CA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="https://app.abby.clinic/login?m=signup"
                className="block w-full bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold py-4 rounded-xl transition-colors text-center"
              >
                Start your 14-day free trial
              </a>
              <p className="text-slate-500 text-sm text-center mt-4">
                No credit card required
              </p>
            </motion.div>

            {/* Requirements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Frequently asked questions
          </h2>
          <FAQAccordion items={pricingFAQ} />
        </div>
      </section>
    </div>
  );
}
