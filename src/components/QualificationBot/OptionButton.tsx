'use client';

import { motion } from 'framer-motion';

interface OptionButtonProps {
  label: string;
  onClick: () => void;
  isPrimary?: boolean;
  index: number;
}

export function OptionButton({ label, onClick, isPrimary = false, index }: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition-colors min-h-[48px] text-sm font-medium ${
        isPrimary
          ? 'bg-[#5371CA] hover:bg-[#6381d4] text-white'
          : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600'
      }`}
    >
      {label}
    </motion.button>
  );
}
