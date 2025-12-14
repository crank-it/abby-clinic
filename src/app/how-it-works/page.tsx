'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { interpretSMS } from '@/lib/interpretSMS';
import Link from 'next/link';
import Image from 'next/image';
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
  ArrowRight,
  ArrowDown,
  Zap,
  Users,
  TrendingDown,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';

// Confetti component - disabled on mobile
function Confetti({ isActive }: { isActive: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const colors = ['#10b981', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#3b82f6'];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // No confetti on mobile
  if (!isActive || isMobile) return null;

  const confettiCount = 150;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(confettiCount)].map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = 3 + Math.random() * 2;
        const size = 8 + Math.random() * 8;
        const rotation = Math.random() * 360;

        return (
          <motion.div
            key={i}
            initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
            animate={{
              y: '100vh',
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              rotate: rotation + 720,
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: duration,
              delay: delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: `${left}%`,
              width: size,
              height: size * 0.6,
              backgroundColor: color,
              borderRadius: '2px',
            }}
          />
        );
      })}
    </div>
  );
}

// Manual process steps - the pain points
const manualSteps = [
  {
    icon: MessageSquare,
    title: "Open communication logs",
    description: "Navigate to Cliniko's communication logs and wait for the page to load",
    time: "30 sec",
    pain: "Constant tab switching disrupts your flow",
    image: "/manual-step-1.png"
  },
  {
    icon: Search,
    title: "Hunt through messages",
    description: "Scroll through the log trying to spot new SMS replies among dozens of conversations",
    time: "45 sec",
    pain: "Easy to miss replies buried in the noise",
    image: "/manual-step-2.png"
  },
  {
    icon: Eye,
    title: "Interpret the response",
    description: "Figure out what the patient actually means - are they confirming, cancelling, or asking something?",
    time: "15 sec",
    pain: "Ambiguous messages cause confusion",
    image: "/manual-step-3.png"
  },
  {
    icon: Search,
    title: "Find the appointment",
    description: "Switch to the calendar and search for the patient's appointment",
    time: "30 sec",
    pain: "Which appointment are they even replying to?",
    image: "/manual-step-4.png"
  },
  {
    icon: PenLine,
    title: "Update the records",
    description: "Open the appointment, add a note, maybe change the status",
    time: "20 sec",
    pain: "Manual data entry invites human error",
    image: "/manual-step-5.png"
  },
  {
    icon: RefreshCw,
    title: "Repeat. All. Day.",
    description: "Do this for every single SMS reply, every day, forever",
    time: "∞",
    pain: "The grind never stops",
    image: "/manual-step-6.png"
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
  // Lower threshold for mobile - trigger when just 5% is visible
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  // Calculate total time
  const totalSeconds = 140; // ~2.5 minutes per SMS
  const responsesPerDay = 30; // Average clinic
  const minutesPerDay = Math.round((totalSeconds * responsesPerDay) / 60);
  const hoursPerWeek = Math.round((minutesPerDay * 5) / 60);

  return (
    <section ref={ref} className="py-16 sm:py-28 md:py-40 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-red-950/20 to-slate-900" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-red-500/30"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-medium">The current reality</span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
            The manual SMS checking trap
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every patient reply triggers the same tedious process. Here&apos;s what your team does dozens of times per day:
          </p>
        </motion.div>

        {/* Manual steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 md:mb-24">
          {manualSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700 hover:border-red-500/50 transition-colors group"
            >
              {/* Image section - if image exists */}
              {step.image ? (
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full aspect-[4/3] sm:aspect-square object-cover"
                />
              ) : (
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 transition-colors">
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" />
                    </div>
                    <span className="text-red-400 text-xs sm:text-sm font-mono bg-red-500/20 px-2 sm:px-3 py-1 rounded-lg">
                      +{step.time}
                    </span>
                  </div>
                </div>
              )}
              {/* Text content */}
              <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <h3 className="text-white font-semibold text-base sm:text-lg">{step.title}</h3>
                  <span className="text-red-400 text-xs sm:text-sm font-mono bg-red-500/20 px-2 sm:px-3 py-1 rounded-lg flex-shrink-0">
                    +{step.time}
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                <p className="text-red-400/80 text-xs sm:text-sm italic">{step.pain}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function ImpactStatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Lower threshold for mobile
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      ref={ref}
      className="min-h-[80vh] sm:min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/30 via-transparent to-transparent" />

      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-8 sm:py-0">
        {/* Main headline - BIG */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
            SMS confirmations are{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
              vital
            </span>{' '}
            to keeping your clinic running.
          </h2>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-20 sm:w-32 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full mx-auto my-8 sm:my-10 md:my-14"
        />

        {/* Secondary statement - smaller but impactful */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-slate-400 leading-relaxed max-w-4xl mx-auto">
            Unfortunately, the manual process is{' '}
            <span className="font-semibold text-red-400">killing your best staff</span>,{' '}
            <span className="font-semibold text-red-400">burning hours</span>,{' '}
            <span className="font-semibold text-red-400">draining money</span>—and{' '}
            <span className="font-semibold text-red-400">completely inefficient</span>.
          </p>
        </motion.div>

        {/* Impact pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 sm:mt-14 md:mt-20 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4"
        >
          {[
            { icon: Clock, label: 'Time Lost' },
            { icon: TrendingDown, label: 'Money Wasted' },
            { icon: Users, label: 'Staff Burned Out' },
            { icon: AlertTriangle, label: 'Errors Made' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
              className="flex items-center gap-1.5 sm:gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3 sm:px-5 py-2 sm:py-3 backdrop-blur-sm"
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              <span className="text-red-300 text-sm sm:text-base font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-red-500/50 rounded-full" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-red-400/50 rounded-full" />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-red-500/30 rounded-full" />
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-red-400/40 rounded-full" />
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

      <div className={`flex flex-col md:flex-row items-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 ${isEven ? '' : 'md:flex-row-reverse'}`}>
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl sm:rounded-3xl ${step.step === 1 ? 'bg-white' : [2, 3, 4, 5].includes(step.step) ? '' : `bg-gradient-to-br ${step.gradient}`} flex items-center justify-center shadow-2xl ${[2, 3, 4, 5].includes(step.step) ? '' : step.glow} ${step.highlight ? 'ring-4 ring-purple-500/50' : ''}`}
        >
          {step.step === 1 ? (
            <img src="/cliniko-logo-dark.svg" alt={step.title} className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20" />
          ) : step.step === 2 ? (
            <img src="/hiw2.png" alt={step.title} className="w-full h-full object-cover rounded-2xl sm:rounded-3xl" />
          ) : step.step === 3 ? (
            <img src="/interpritation.png" alt={step.title} className="w-full h-full object-cover rounded-2xl sm:rounded-3xl" />
          ) : step.step === 4 ? (
            <img src="/abby-sends.png" alt={step.title} className="w-full h-full object-cover rounded-2xl sm:rounded-3xl" />
          ) : step.step === 5 ? (
            <img src="/extention-sm.png" alt={step.title} className="w-full h-full object-cover rounded-2xl sm:rounded-3xl" />
          ) : step.step === 6 ? (
            <img src="/cal.png" alt={step.title} className="w-full h-full object-cover rounded-2xl sm:rounded-3xl" />
          ) : (
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
          )}
          {step.highlight && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-purple-500/20"
            />
          )}
        </motion.div>

        {/* Content */}
        <div className={`text-center md:text-left ${isEven ? '' : 'md:text-right'} max-w-xl space-y-4 sm:space-y-6 px-2 sm:px-0`}>
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {step.title}
            </h3>
            <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Technical detail with prismatic glow */}
          <motion.div
            className={`relative inline-block ${isEven ? '' : 'md:ml-auto'}`}
            whileHover={{ scale: 1.02 }}
          >
            {/* Outer glow - large and soft */}
            <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl opacity-50" />
            {/* Middle glow - medium */}
            <div className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300 rounded-lg sm:rounded-xl blur-md opacity-60" />
            {/* Inner border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-200 rounded-lg sm:rounded-xl opacity-40" />
            {/* Content box */}
            <div className="relative flex items-start gap-2 sm:gap-3 bg-slate-950/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-5 border border-white/20">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-100 text-xs sm:text-sm leading-relaxed">{step.technical}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CelebrationSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Lower threshold for mobile
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowConfetti(true);
      // Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="min-h-[80vh] sm:min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <Confetti isActive={showConfetti} />

      {/* Celebratory background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-emerald-950/30 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />

      {/* Animated glowing orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
              There&apos;s a better way.
            </span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8">
            Meet <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Abby</span> — your AI assistant that handles SMS confirmations{' '}
            <span className="text-emerald-400 font-semibold">automatically</span>.
          </p>
        </motion.div>

        {/* Happy stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
        >
          {[
            { icon: Clock, label: 'Hours saved', value: '6+/week' },
            { icon: Heart, label: 'Happy staff', value: '100%' },
            { icon: Sparkles, label: 'Automated', value: 'Fully' },
            { icon: Star, label: 'No errors', value: 'Zero' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="flex flex-col items-center gap-1 sm:gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm"
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              <span className="text-lg sm:text-2xl font-bold text-white">{item.value}</span>
              <span className="text-emerald-300 text-xs sm:text-sm">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-12 sm:mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-8 h-8 text-emerald-500/50 mx-auto" />
          </motion.div>
          <p className="text-slate-500 text-sm mt-2">See how it works</p>
        </motion.div>
      </div>

      {/* Floating illustrated images - hidden on mobile, visible on larger screens */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-20 left-[3%] hidden md:block lg:left-[5%] xl:left-[8%]"
      >
        <motion.img
          src="/hiw1.png"
          alt="Abby for the win"
          className="w-28 lg:w-36 xl:w-44 drop-shadow-2xl"
          animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-20 right-[3%] hidden md:block lg:right-[5%] xl:right-[8%]"
      >
        <motion.img
          src="/interpritation.png"
          alt="Abby reading SMS"
          className="w-24 lg:w-32 xl:w-40 drop-shadow-2xl"
          animate={{ y: [10, -10, 10], rotate: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-28 left-[5%] hidden md:block lg:left-[8%] xl:left-[12%]"
      >
        <motion.img
          src="/hiw2.png"
          alt="Phone with message"
          className="w-20 lg:w-24 xl:w-28 drop-shadow-2xl"
          animate={{ y: [-12, 12, -12], rotate: [-8, 8, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-28 right-[5%] hidden md:block lg:right-[8%] xl:right-[12%]"
      >
        <motion.img
          src="/server.png"
          alt="Server"
          className="w-24 lg:w-28 xl:w-32 drop-shadow-2xl"
          animate={{ y: [8, -8, 8], rotate: [2, -2, 2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute top-1/2 left-[2%] -translate-y-1/2 hidden xl:block"
      >
        <motion.img
          src="/abby-sends.png"
          alt="Abby sending"
          className="w-32 xl:w-40 drop-shadow-2xl"
          animate={{ y: [-20, 20, -20], x: [-5, 5, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function AbbyJourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  // Lower threshold for mobile
  const isInView = useInView(ref, { once: true, amount: 0.02 });

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-40 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-20 md:mb-32"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 border border-emerald-500/30"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-emerald-300 text-xs sm:text-sm font-medium">The Abby Journey</span>
          </motion.div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 font-heading">
            Every step, automated
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
            From patient reply to colour-coded calendar — watch the magic happen
          </p>
        </motion.div>

        {/* Journey Steps */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
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
  // Lower threshold for mobile
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} className="py-16 sm:py-28 md:py-40 px-4 bg-slate-800/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
            What Abby understands
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
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

        {/* AI explanation - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 relative"
        >
          {/* Outer glow effects */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-[#5371CA]/20 to-cyan-500/20 rounded-3xl blur-2xl" />
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-[#5371CA]/10 to-cyan-400/10 rounded-3xl blur-xl" />

          <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-700/50 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5371CA]/10 rounded-full blur-3xl" />

            {/* First to market badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <div className="px-5 py-3 bg-emerald-600 rounded-full text-center">
                <span className="text-white text-sm font-semibold">
                  First approved Cliniko extension to use AI
                </span>
              </div>
            </motion.div>

            {/* Main title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 px-2"
            >
              <span className="text-[#7b93db]">
                Powered by our own AI
              </span>
            </motion.h3>

            {/* Content with floating images */}
            <div className="relative">
              {/* Floating robot images - hidden on small mobile */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="hidden sm:block absolute -left-4 md:left-0 top-0"
              >
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/brain.png"
                    alt="Abby AI Brain"
                    width={100}
                    height={100}
                    className="w-16 sm:w-20 md:w-24 drop-shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="hidden sm:block absolute -right-4 md:right-0 top-0"
              >
                <motion.div
                  animate={{ y: [5, -5, 5], rotate: [3, -3, 3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/server.png"
                    alt="Australian Servers"
                    width={100}
                    height={100}
                    className="w-16 sm:w-20 md:w-24 drop-shadow-[0_0_20px_rgba(83,113,202,0.4)]"
                  />
                </motion.div>
              </motion.div>

              {/* Main content */}
              <div className="max-w-2xl mx-auto text-center px-0 sm:px-16 md:px-20">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.65 }}
                  className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6"
                >
                  Abby uses a <strong className="text-white">proprietary language model</strong> built specifically for healthcare appointments —
                  <span className="text-purple-400 font-medium"> not ChatGPT, not Google, not any third-party AI</span>.
                </motion.p>

                {/* Feature highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6"
                >
                  <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-2xl mb-2">🇦🇺</div>
                    <p className="text-white font-medium text-sm">Australian servers</p>
                    <p className="text-slate-500 text-xs">Sydney AWS region</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-2xl mb-2">🔒</div>
                    <p className="text-white font-medium text-sm">Never trains others</p>
                    <p className="text-slate-500 text-xs">Your data stays yours</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-white font-medium text-sm">Healthcare focused</p>
                    <p className="text-slate-500 text-xs">98% interpretation accuracy</p>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.85 }}
                  className="text-slate-400 text-sm sm:text-base"
                >
                  Your SMS data never leaves our Australian AWS servers and is deleted immediately after interpretation.
                </motion.p>
              </div>
            </div>

            {/* Bottom floating image for mobile - single Abby robot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="flex sm:hidden justify-center mt-6"
            >
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/hiw1.png"
                  alt="Abby"
                  width={120}
                  height={120}
                  className="drop-shadow-[0_0_20px_rgba(83,113,202,0.4)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechnicalSpecsSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Lower threshold for mobile
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} className="py-16 sm:py-28 md:py-40 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
            Technical specifications
          </h2>
          <p className="text-slate-400 text-lg">
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
            className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading"
          >
            How Abby works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            See exactly what happens at each step - from the manual nightmare you&apos;re escaping to the automated simplicity you&apos;re gaining.
          </motion.p>
        </div>
      </section>

      {/* The Manual Process (Pain) */}
      <ManualProcessSection />

      {/* Impact Statement - Full Viewport */}
      <ImpactStatementSection />

      {/* Celebration - The Better Way */}
      <CelebrationSection />

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
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
              Ready to escape the manual trap?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
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
