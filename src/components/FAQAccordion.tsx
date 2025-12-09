'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQAccordion({ items, title }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {title && (
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-semibold text-white mb-4"
        >
          {title}
        </motion.h3>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-5 py-4 flex items-center justify-between text-white hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer"
            >
              <span className="font-medium pr-4">{item.q}</span>
              <motion.svg
                className="w-5 h-5 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                      opacity: { duration: 0.25, delay: 0.1 }
                    }
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                      opacity: { duration: 0.2 }
                    }
                  }}
                >
                  <div className="px-5 pb-4 text-slate-400 leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
