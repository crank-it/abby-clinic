'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatTriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatTrigger({ onClick, isOpen }: ChatTriggerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || isOpen) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 z-50 bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-5 py-3 rounded-full shadow-lg shadow-[#5371CA]/30 transition-colors flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-[#FCE3EB] animate-pulse"></span>
        <span className="hidden sm:inline text-sm">Is Abby right for you?</span>
        <span className="sm:hidden text-sm">Chat</span>
      </motion.button>
    </AnimatePresence>
  );
}
