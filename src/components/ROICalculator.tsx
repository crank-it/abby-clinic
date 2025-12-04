'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateROI, type ROIResult } from '@/lib/calculateROI';
import { calculatorQuestions } from '@/lib/data';
import { currencies, type CurrencyCode, formatCurrency } from '@/lib/currencies';

interface ROICalculatorProps {
  currency?: CurrencyCode;
}

export function ROICalculator({ currency = 'AUD' }: ROICalculatorProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [notCliniko, setNotCliniko] = useState(false);

  const currencyConfig = currencies[currency];

  const handleAnswer = (questionId: string, value: number | boolean) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (questionId === 'cliniko' && value === false) {
      setNotCliniko(true);
      return;
    }

    if (step < calculatorQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const results: ROIResult | null = showResults ? calculateROI({
    weeklyAppointments: answers.appointments as number,
    responseRate: answers.responseRate as number,
    minutesPerResponse: answers.timePerResponse as number,
    hourlyWage: currencyConfig.hourlyWage,
    annualPrice: currencyConfig.annual
  }) : null;

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
    setNotCliniko(false);
  };

  // Not Cliniko user
  if (notCliniko) {
    return (
      <div className="bg-slate-800 rounded-2xl p-5 md:p-8 text-center mx-4 md:mx-auto md:max-w-xl">
        <span className="text-3xl md:text-4xl mb-4 block">💔</span>
        <h3 className="text-lg md:text-xl font-bold text-white mb-3">
          Abby works exclusively with Cliniko
        </h3>
        <p className="text-slate-400 text-sm md:text-base mb-6">
          We&apos;d love to support other practice management systems in the future.
          Leave your email and we&apos;ll let you know when we expand.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-[#5371CA] text-sm md:text-base"
        />
        <button className="w-full bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold py-3 rounded-lg transition-colors min-h-[48px]">
          Notify me
        </button>
        <button
          onClick={reset}
          className="text-slate-500 hover:text-slate-400 text-sm mt-4 py-2 min-h-[44px]"
        >
          Start over
        </button>
      </div>
    );
  }

  // Show results
  if (showResults && results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-2xl p-5 md:p-8 mx-4 md:mx-auto md:max-w-2xl"
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
          Your potential savings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-slate-700 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-xs md:text-sm mb-1">Weekly time spent</p>
            <p className="text-2xl md:text-3xl font-bold text-white">{results.weeklyHours} hrs</p>
          </div>
          <div className="bg-slate-700 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-xs md:text-sm mb-1">Annual staff cost</p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {formatCurrency(results.annualStaffCost, currency)}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#5371CA] to-teal-700 rounded-xl p-5 md:p-6 text-center mb-6">
          <p className="text-teal-100 text-xs md:text-sm mb-1">Your estimated annual saving</p>
          <p className="text-3xl md:text-5xl font-bold text-white">
            {formatCurrency(results.annualSavings, currency)}
          </p>
          <p className="text-teal-200 text-xs md:text-sm mt-2">
            Abby costs just {formatCurrency(currencyConfig.annual, currency)}/year
          </p>
        </div>

        <div className="text-center space-y-3">
          <Link href="/pricing" className="block w-full bg-white hover:bg-gray-100 text-slate-900 font-semibold px-6 md:px-8 py-3 rounded-full transition-colors min-h-[48px]">
            Start saving now - 14 days free
          </Link>
          <button
            onClick={reset}
            className="block w-full text-slate-500 hover:text-slate-400 text-sm py-2 min-h-[44px]"
          >
            Recalculate
          </button>
        </div>
      </motion.div>
    );
  }

  // Questions flow
  const currentQuestion = calculatorQuestions[step];

  return (
    <div className="bg-slate-800 rounded-2xl p-5 md:p-8 mx-4 md:mx-auto md:max-w-xl">
      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {calculatorQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 md:h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-[#6381d4]' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg md:text-2xl font-bold text-white mb-5 md:mb-6">
            {currentQuestion.question}
          </h3>

          <div className="flex flex-col space-y-2 md:space-y-3">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="w-full text-left bg-slate-700 hover:bg-slate-600 text-white px-4 md:px-5 py-4 md:py-4 rounded-xl transition-colors border-2 border-transparent hover:border-[#6381d4] min-h-[52px] text-sm md:text-base"
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="text-slate-500 hover:text-slate-400 text-sm mt-6 py-2 min-h-[44px]"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
