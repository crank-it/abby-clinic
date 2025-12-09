'use client';

import { motion } from 'framer-motion';
import { Chrome, Key } from 'lucide-react';

// Cliniko-style logo
const ClinikoLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`${className} rounded flex items-center justify-center`}>
    <img src="../cliniko-logo-light.svg" alt="Cliniko Logo" className="w-10 h-10" />
  </div>
);

export function Requirements({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const requirements = [
    {
      icon: <Chrome className="w-6 h-6 text-slate-300" />,
      label: "Chrome browser",
      description: "Desktop only (no mobile/tablet)",
      required: true
    },
    {
      icon: <ClinikoLogo className="w-6 h-6" />,
      label: "Cliniko account",
      description: "With SMS reminders enabled",
      required: true
    },
    {
      icon: <Key className="w-6 h-6 text-slate-300" />,
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
