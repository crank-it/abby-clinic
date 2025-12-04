'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MessageProps {
  content: string;
  isUser?: boolean;
  isTyping?: boolean;
  typewriter?: boolean;
}

export function Message({ content, isUser = false, isTyping = false, typewriter = false }: MessageProps) {
  const [displayedText, setDisplayedText] = useState(typewriter ? '' : content);
  const [isComplete, setIsComplete] = useState(!typewriter);

  useEffect(() => {
    if (!typewriter) {
      setDisplayedText(content);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);

    let index = 0;
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 25); // 25ms per character for smooth typing

    return () => clearInterval(interval);
  }, [content, typewriter]);

  if (isTyping) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex justify-start"
      >
        <div className="bg-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
          <div className="flex gap-1.5">
            <motion.span
              className="w-2 h-2 bg-slate-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0, ease: "easeInOut" }}
            />
            <motion.span
              className="w-2 h-2 bg-slate-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.span
              className="w-2 h-2 bg-slate-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-[#5371CA] text-white rounded-tr-sm'
            : 'bg-slate-700 text-slate-100 rounded-tl-sm'
        }`}
      >
        <p className="text-sm whitespace-pre-line">
          {displayedText}
          {!isComplete && <span className="opacity-50">|</span>}
        </p>
      </div>
    </motion.div>
  );
}
