'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { interpretSMS } from '@/lib/interpretSMS';
import Link from 'next/link';

const phases = [
  {
    id: "sms-sent",
    title: "Cliniko sends the reminder",
    description: "Your normal Cliniko SMS reminder goes out to the patient. Abby doesn't send anything – we just watch for replies."
  },
  {
    id: "patient-replies",
    title: "Patient replies via SMS",
    description: "Whether they say 'Yes!', 'Can't make it', or something ambiguous, Abby captures the response."
  },
  {
    id: "ai-interprets",
    title: "AI interprets the intent",
    description: "Our proprietary AI (not ChatGPT) analyses the message. 98% accuracy on single-intent messages. Trained specifically on healthcare appointment language."
  },
  {
    id: "note-posted",
    title: "Response logged to appointment",
    description: "Abby posts to the appointment notes: '[Intent] - [Original SMS] - [Timestamp]'. Your records stay complete."
  },
  {
    id: "calendar-updates",
    title: "Calendar shows the status",
    description: "The Chrome extension colour-codes appointments every 15 minutes. Grey for confirmed, red for attention needed."
  }
];

const examples = [
  {
    category: "Confirmations",
    colour: "bg-gray-200 border-gray-400",
    messages: [
      "Yes, see you then",
      "Confirmed thanks",
      "👍",
      "Will be there!",
      "OK"
    ]
  },
  {
    category: "Needs attention",
    colour: "bg-red-100 border-red-400",
    messages: [
      "I need to cancel",
      "Can we reschedule?",
      "Running late, is that ok?",
      "Yes but I have a question first"
    ]
  },
  {
    category: "Unclear",
    colour: "bg-amber-100 border-amber-400",
    messages: [
      "Maybe",
      "?",
      "What time was it again?"
    ]
  }
];

const specs = {
  processing: {
    title: "Processing",
    items: [
      "96% of SMS responses processed successfully",
      "98% interpretation accuracy",
      "15-minute sync frequency"
    ]
  },
  integration: {
    title: "Integration",
    items: [
      "Cliniko REST API (read-only access)",
      "Chrome browser required",
      "No software installation beyond extension"
    ]
  },
  limits: {
    title: "Limits",
    items: [
      "Up to 24 practitioners per account",
      "Standard appointments only (not one-off SMS)",
      "English language support"
    ]
  }
};

export default function HowItWorksPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How Abby works
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From patient SMS to colour-coded calendar – see exactly what happens at each step.
          </p>
        </div>
      </section>

      {/* The Journey - Step by Step */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            The Journey
          </h2>

          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {phases.map((phase, i) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(i)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer ${
                  activePhase === i
                    ? 'bg-[#5371CA] text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <div className="text-2xl font-bold mb-1">{i + 1}</div>
                <div className="text-sm font-medium">{phase.title}</div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {phases[activePhase].title}
              </h3>
              <p className="text-slate-400 text-lg">
                {phases[activePhase].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* What Abby Understands */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            What Abby understands
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Click any message to see how Abby would interpret it.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((category) => (
              <div key={category.category} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 ${category.colour} border-2 rounded`} />
                  <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                </div>
                <div className="space-y-2">
                  {category.messages.map((msg) => {
                    const result = interpretSMS(msg);
                    const isSelected = selectedExample === msg;

                    return (
                      <button
                        key={msg}
                        onClick={() => setSelectedExample(isSelected ? null : msg)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-[#5371CA]/20 border border-[#6381d4]'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        <p className="text-slate-300 text-sm">&quot;{msg}&quot;</p>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 pt-2 border-t border-slate-600"
                          >
                            <span className={`text-xs px-2 py-1 rounded ${result.badgeClass}`}>
                              {result.icon} {result.label}
                            </span>
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Technical specifications
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(specs).map((spec) => (
              <div key={spec.title} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">{spec.title}</h3>
                <ul className="space-y-2">
                  {spec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <svg className="w-4 h-4 text-[#5371CA] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-slate-400 mb-8">
            Try Abby free for 14 days. No credit card required.
          </p>
          <a
            href="https://app.abby.clinic/login?m=signup"
            className="inline-block bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Start your free trial
          </a>
        </div>
      </section>
    </div>
  );
}
