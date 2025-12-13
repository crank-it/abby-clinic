'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { interpretSMS } from '@/lib/interpretSMS';
import Link from 'next/link';
import {
  Smartphone,
  MessageSquare,
  Brain,
  FileText,
  MousePointer2,
  Palette,
  Clock,
  Eye,
  Search,
  PenLine,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowDown,
  Zap,
  Timer,
  Users,
  TrendingDown
} from 'lucide-react';

// Manual process steps - the pain points
const manualSteps = [
  {
    icon: MessageSquare,
    title: "Open communication logs",
    description: "Navigate to Cliniko's communication logs and wait for the page to load",
    time: "30 sec",
    pain: "Constant tab switching disrupts your flow"
  },
  {
    icon: Search,
    title: "Hunt through messages",
    description: "Scroll through the log trying to spot new SMS replies among dozens of conversations",
    time: "45 sec",
    pain: "Easy to miss replies buried in the noise"
  },
  {
    icon: Eye,
    title: "Interpret the response",
    description: "Figure out what the patient actually means - are they confirming, cancelling, or asking something?",
    time: "15 sec",
    pain: "Ambiguous messages cause confusion"
  },
  {
    icon: Search,
    title: "Find the appointment",
    description: "Switch to the calendar and search for the patient's appointment",
    time: "30 sec",
    pain: "Which appointment are they even replying to?"
  },
  {
    icon: PenLine,
    title: "Update the records",
    description: "Open the appointment, add a note, maybe change the status",
    time: "20 sec",
    pain: "Manual data entry invites human error"
  },
  {
    icon: RefreshCw,
    title: "Repeat. All. Day.",
    description: "Do this for every single SMS reply, every day, forever",
    time: "∞",
    pain: "The grind never stops"
  }
];

// Abby's journey steps - the solution (more technical)
const abbyJourney = [
  {
    step: 1,
    icon: Smartphone,
    title: "Cliniko sends reminder",
    description: "Your existing Cliniko SMS reminder workflow continues unchanged. Abby doesn't send anything - it observes the conversation thread.",
    technical: "Abby monitors the Cliniko API endpoint for SMS responses linked to appointment reminder messages.",
    gradient: "from-blue-500 to-blue-600",
    glow: "shadow-blue-500/30"
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Patient replies via SMS",
    description: "The patient texts back whatever they want - 'Yes', 'Can we reschedule?', '👍', or even 'huh?'. Every reply is captured.",
    technical: "Responses are matched to appointment IDs using Cliniko's conversation threading. Reply-to matching handles edge cases.",
    gradient: "from-emerald-500 to-emerald-600",
    glow: "shadow-emerald-500/30"
  },
  {
    step: 3,
    icon: Brain,
    title: "AI interprets intent",
    description: "Our proprietary language model - trained specifically on healthcare appointment language - determines what the patient means.",
    technical: "98% accuracy on single-intent messages. Conflicting intents (\"Yes but I can't come\") are flagged for human review, not guessed.",
    gradient: "from-purple-500 to-purple-600",
    glow: "shadow-purple-500/30",
    highlight: true
  },
  {
    step: 4,
    icon: FileText,
    title: "Logged to appointment notes",
    description: "Abby writes a structured note to the appointment: the interpretation, original SMS text, and timestamp.",
    technical: "Format: [CONFIRMED/CANCELLED/CALL TO DISCUSS] - \"original message\" - timestamp. Fully auditable trail.",
    gradient: "from-amber-500 to-amber-600",
    glow: "shadow-amber-500/30"
  },
  {
    step: 5,
    icon: MousePointer2,
    title: "Click the extension",
    description: "When you're ready to see who's coming, click the Abby icon in your Chrome toolbar. That's it.",
    technical: "The extension reads appointment notes via Cliniko's session and applies CSS overlays. No additional API calls needed.",
    gradient: "from-[#5371CA] to-[#6381d4]",
    glow: "shadow-[#5371CA]/30"
  },
  {
    step: 6,
    icon: Palette,
    title: "Calendar shows status",
    description: "Appointments light up: white for confirmed, grey with red underline for needs attention, coloured for no reply yet.",
    technical: "Colour-coding is applied via DOM manipulation. Clicking any appointment refreshes Cliniko's view - just click Abby again to reapply.",
    gradient: "from-pink-500 to-pink-600",
    glow: "shadow-pink-500/30"
  }
];

// Example messages for demo
const examples = [
  {
    category: "Confirmed",
    colour: "bg-white border-slate-300",
    badgeClass: "bg-emerald-100 text-emerald-700",
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
    colour: "bg-gray-100 border-slate-300",
    badgeClass: "bg-red-100 text-red-700",
    hasRedUnderline: true,
    messages: [
      "I need to cancel",
      "Can we reschedule?",
      "Running late, is that ok?",
      "Yes but I have a question first"
    ]
  },
  {
    category: "Flagged for review",
    colour: "bg-amber-50 border-amber-300",
    badgeClass: "bg-amber-100 text-amber-700",
    messages: [
      "Maybe",
      "?",
      "What time was it again?",
      "Yep sorry I can't come"
    ]
  }
];

// Technical specs
const specs = {
  processing: {
    title: "Processing",
    icon: Zap,
    items: [
      { label: "SMS capture rate", value: "96%" },
      { label: "Interpretation accuracy", value: "98%" },
      { label: "Sync frequency", value: "15 min" },
      { label: "Processing latency", value: "<2 sec" }
    ]
  },
  integration: {
    title: "Integration",
    icon: RefreshCw,
    items: [
      { label: "API access", value: "Read-only" },
      { label: "Data modified", value: "Notes only" },
      { label: "Browser", value: "Chrome" },
      { label: "Installation", value: "Extension only" }
    ]
  },
  limits: {
    title: "Limits",
    icon: Users,
    items: [
      { label: "Max practitioners", value: "24" },
      { label: "Locations", value: "Unlimited" },
      { label: "SMS types", value: "Reminders only" },
      { label: "Language", value: "English" }
    ]
  }
};

// Animated counter for time saved
function AnimatedTime({ value, isInView }: { value: number; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span>{count}</span>;
}

function ManualProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Calculate total time
  const totalSeconds = 140; // ~2.5 minutes per SMS
  const responsesPerDay = 30; // Average clinic
  const minutesPerDay = Math.round((totalSeconds * responsesPerDay) / 60);
  const hoursPerWeek = Math.round((minutesPerDay * 5) / 60);

  return (
    <section ref={ref} className="py-28 md:py-40 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-red-950/20 to-slate-900" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-red-500/30"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-medium">The current reality</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
            The manual SMS checking trap
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Every patient reply triggers the same tedious process. Here&apos;s what your team does dozens of times per day:
          </p>
        </motion.div>

        {/* Manual steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {manualSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-red-500/50 transition-colors group"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 transition-colors">
                    <step.icon className="w-7 h-7 text-red-400" />
                  </div>
                  <span className="text-red-400 text-sm font-mono bg-red-500/20 px-3 py-1 rounded-lg">
                    +{step.time}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  <p className="text-red-400/80 text-sm italic">{step.pain}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Time cost summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-500/20 rounded-3xl p-8 md:p-12 border border-red-500/30"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold text-red-400 mb-2">
                ~<AnimatedTime value={Math.round(totalSeconds / 60)} isInView={isInView} />min
              </div>
              <p className="text-slate-400">per SMS reply</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-red-400 mb-2">
                <AnimatedTime value={minutesPerDay} isInView={isInView} />min
              </div>
              <p className="text-slate-400">per day (30 replies)</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-red-400 mb-2">
                <AnimatedTime value={hoursPerWeek} isInView={isInView} />hrs
              </div>
              <p className="text-slate-400">per week wasted</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-red-500/30 text-center">
            <p className="text-slate-300 text-lg">
              That&apos;s <span className="text-red-400 font-bold">{hoursPerWeek * 52} hours per year</span> spent on a task that adds zero value.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function JourneyStep({
  step,
  index,
  isLast
}: {
  step: typeof abbyJourney[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-8"
    >
      {/* Connection line to next step */}
      {!isLast && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0.5 h-16 bg-gradient-to-b from-slate-600 to-transparent" />
      )}

      <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${isEven ? '' : 'md:flex-row-reverse'}`}>
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`relative flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-3xl ${step.step === 1 ? 'bg-white' : [2, 3, 4, 5].includes(step.step) ? '' : `bg-gradient-to-br ${step.gradient}`} flex items-center justify-center shadow-2xl ${[2, 3, 4, 5].includes(step.step) ? '' : step.glow} ${step.highlight ? 'ring-4 ring-purple-500/50' : ''}`}
        >
          {step.step === 1 ? (
            <img src="/cliniko-logo-dark.svg" alt={step.title} className="w-12 h-12 md:w-20 md:h-20" />
          ) : step.step === 2 ? (
            <img src="/hiw2.png" alt={step.title} className="w-full h-full object-cover rounded-3xl" />
          ) : step.step === 3 ? (
            <img src="/interpritation.png" alt={step.title} className="w-full h-full object-cover rounded-3xl" />
          ) : step.step === 4 ? (
            <img src="/abby-sends.png" alt={step.title} className="w-full h-full object-cover rounded-3xl" />
          ) : step.step === 5 ? (
            <img src="/extention-sm.png" alt={step.title} className="w-full h-full object-cover rounded-3xl" />
          ) : step.step === 6 ? (
            <img src="/cal.png" alt={step.title} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
          )}
          {step.highlight && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl bg-purple-500/20"
            />
          )}
        </motion.div>

        {/* Content */}
        <div className={`text-center md:text-left ${isEven ? '' : 'md:text-right'} max-w-xl space-y-6`}>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {step.title}
            </h3>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Technical detail with prismatic glow */}
          <motion.div
            className={`relative inline-block ${isEven ? '' : 'md:ml-auto'}`}
            whileHover={{ scale: 1.02 }}
          >
            {/* Outer glow - large and soft */}
            <div className="absolute -inset-3 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 rounded-2xl blur-2xl opacity-50" />
            {/* Middle glow - medium */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300 rounded-xl blur-md opacity-60" />
            {/* Inner border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-200 rounded-xl opacity-40" />
            {/* Content box */}
            <div className="relative flex items-start gap-3 bg-slate-950/95 backdrop-blur-sm rounded-xl px-6 py-5 border border-white/20">
              <Zap className="w-5 h-5 text-fuchsia-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-100 text-sm leading-relaxed">{step.technical}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function AbbyJourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-28 md:py-40 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#5371CA]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20 md:mb-32"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-emerald-500/30"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">With Abby</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
            The automated journey
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From patient reply to colour-coded calendar - every step handled automatically
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
        <div className="space-y-16 md:space-y-20">
          {abbyJourney.map((step, index) => (
            <JourneyStep
              key={step.step}
              step={step}
              index={index}
              isLast={index === abbyJourney.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function WhatAbbyUnderstandsSection() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-28 md:py-40 px-4 bg-slate-800/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
            What Abby understands
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Click any message to see how Abby interprets it. Our AI handles the nuance so you don&apos;t have to.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-6 h-6 ${category.colour} ${category.hasRedUnderline ? 'border-b-2 border-b-red-500' : ''} border-2 rounded`} />
                <h3 className="text-lg font-semibold text-white">{category.category}</h3>
              </div>
              <div className="space-y-3">
                {category.messages.map((msg) => {
                  const result = interpretSMS(msg);
                  const isSelected = selectedExample === msg;

                  return (
                    <button
                      key={msg}
                      onClick={() => setSelectedExample(isSelected ? null : msg)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-[#5371CA]/20 border border-[#6381d4]'
                          : 'bg-slate-700/50 hover:bg-slate-700 border border-transparent'
                      }`}
                    >
                      <p className="text-slate-300 text-sm">&quot;{msg}&quot;</p>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 pt-2 border-t border-slate-600"
                          >
                            <span className={`text-xs px-2 py-1 rounded ${result.badgeClass}`}>
                              {result.icon} {result.label}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
        >
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-7 h-7 text-purple-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">About our AI</h3>
              <p className="text-slate-400 leading-relaxed">
                Abby uses a <strong className="text-white">proprietary language model</strong> - not ChatGPT, not Google, not any third-party AI.
                Your SMS data never leaves our Australian AWS servers and never trains anyone else&apos;s model.
                The AI is specifically trained on healthcare appointment language for maximum accuracy in this domain.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechnicalSpecsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-28 md:py-40 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
            Technical specifications
          </h2>
          <p className="text-slate-400 text-lg md:text-xl">
            The details for those who want them
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.values(specs).map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#5371CA]/20 flex items-center justify-center">
                  <spec.icon className="w-6 h-6 text-[#5371CA]" />
                </div>
                <h3 className="text-xl font-semibold text-white">{spec.title}</h3>
              </div>
              <div className="space-y-4">
                {spec.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white font-medium bg-slate-700/50 px-3 py-1.5 rounded-lg">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional technical notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <h4 className="text-white font-semibold text-lg mb-6">Data handling</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                SMS content deleted immediately after interpretation
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Appointment IDs purged after 48 hours
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                No patient names, phones, or health data stored
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <h4 className="text-white font-semibold text-lg mb-6">Infrastructure</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Australian AWS servers (Sydney region)
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Encryption at rest and in transit
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                HTTPS for all API communications
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-heading"
          >
            How Abby works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            See exactly what happens at each step - from the manual nightmare you&apos;re escaping to the automated simplicity you&apos;re gaining.
          </motion.p>
        </div>
      </section>

      {/* The Manual Process (Pain) */}
      <ManualProcessSection />

      {/* The Abby Journey (Solution) */}
      <AbbyJourneySection />

      {/* What Abby Understands */}
      <WhatAbbyUnderstandsSection />

      {/* Technical Specs */}
      <TechnicalSpecsSection />

      {/* CTA - Full viewport */}
      <section className="min-h-[100svh] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#5371CA]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white font-heading">
              Ready to escape the manual trap?
            </h2>
            <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto">
              Try Abby free for 14 days. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://app.abby.clinic/login?m=signup"
                className="inline-flex items-center justify-center gap-2 bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-10 py-4 rounded-full transition-colors shadow-lg shadow-[#5371CA]/30 text-lg"
              >
                Start your free trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center text-slate-400 hover:text-white transition-colors px-10 py-4 text-lg"
              >
                See pricing →
              </Link>
            </div>
            <p className="text-slate-500 pt-4">
              Works with Cliniko · Chrome extension included
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
