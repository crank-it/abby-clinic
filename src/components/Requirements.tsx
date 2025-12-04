'use client';

import { motion } from 'framer-motion';

// Chrome logo SVG
const ChromeLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="white"/>
    <path d="M24 14C18.4772 14 14 18.4772 14 24H24V14Z" fill="#EA4335"/>
    <path d="M24 14C29.5228 14 34 18.4772 34 24C34 26.3894 33.1545 28.5752 31.7574 30.2574L24 24V14Z" fill="#FFCD40"/>
    <path d="M24 34C29.5228 34 34 29.5228 34 24H24V34Z" fill="#4285F4"/>
    <path d="M14 24C14 29.5228 18.4772 34 24 34L24 24H14Z" fill="#34A853"/>
    <circle cx="24" cy="24" r="8" fill="white"/>
    <circle cx="24" cy="24" r="4" fill="#4285F4"/>
  </svg>
);

export function Requirements({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const requirements = [
    {
      icon: <ChromeLogo className="w-6 h-6" />,
      label: "Chrome browser",
      description: "Desktop only (no mobile/tablet)",
      required: true
    },
    {
      icon: (
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">C</span>
        </div>
      ),
      label: "Cliniko account",
      description: "With SMS reminders enabled",
      required: true
    },
    {
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      label: "API key access",
      description: "Admin or Power Receptionist role",
      required: true
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {requirements.map((req, i) => (
          <div key={i} className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2">
            {req.icon}
            <span className="text-slate-300">{req.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-[#5371CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Requirements
      </h3>

      <div className="space-y-3">
        {requirements.map((req, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{req.icon}</div>
            <div>
              <p className="text-white font-medium">{req.label}</p>
              <p className="text-slate-400 text-sm">{req.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs">
          Not using Cliniko? Abby works exclusively with Cliniko at this time.
        </p>
      </div>
    </motion.div>
  );
}
