'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Message } from './Message';
import { OptionButton } from './OptionButton';
import { chatbotFlow, type ChatNode, type ChatOption } from '@/lib/chatbotFlow';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<ChatNode | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showOptions]);

  const addBotMessages = useCallback(async (node: ChatNode) => {
    setShowOptions(false);

    for (const message of node.messages) {
      // Show typing dots
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsTyping(false);

      // Add message with typewriter effect
      messageIdCounter.current += 1;
      setMessages(prev => [...prev, {
        id: `bot-${messageIdCounter.current}`,
        content: message,
        isUser: false
      }]);

      // Wait for typewriter to complete (25ms per char + buffer)
      const typewriterDuration = message.length * 25 + 400;
      await new Promise(resolve => setTimeout(resolve, typewriterDuration));
    }

    // Handle actions
    if (node.action) {
      await new Promise(resolve => setTimeout(resolve, 600));

      if (node.action.type === 'close') {
        onClose();
        return;
      }

      if (node.action.type === 'link' && node.action.url) {
        onClose();
        router.push(node.action.url);
        return;
      }

      if (node.action.type === 'calendly' && node.action.url) {
        onClose();
        window.open(node.action.url, '_blank');
        return;
      }
    }

    setCurrentNode(node);
    if (node.options && node.options.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowOptions(true);
    }
  }, [onClose, router]);

  // Start conversation when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const startNode = chatbotFlow['start'];
      addBotMessages(startNode);
    }
  }, [isOpen, messages.length, addBotMessages]);

  const handleOptionSelect = async (option: ChatOption) => {
    // Add user message
    messageIdCounter.current += 1;
    setMessages(prev => [...prev, {
      id: `user-${messageIdCounter.current}`,
      content: option.label,
      isUser: true
    }]);

    setShowOptions(false);

    // Gentle pause before bot responds
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get next node and continue
    const nextNode = chatbotFlow[option.nextNode];
    if (nextNode) {
      addBotMessages(nextNode);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentNode(null);
    setShowOptions(false);
    setIsTyping(false);
    messageIdCounter.current = 0;

    // Restart conversation
    setTimeout(() => {
      const startNode = chatbotFlow['start'];
      addBotMessages(startNode);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-[500px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#5371CA] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Abby</p>
                <p className="text-slate-400 text-xs">Qualification assistant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Status bar for qualified/disqualified */}
          {currentNode?.isQualified && (
            <div className="bg-[#5371CA]/20 border-b border-[#5371CA]/30 px-4 py-2">
              <p className="text-[#7b93db] text-xs font-medium text-center">
                ✓ Looks like Abby&apos;s a great fit!
              </p>
            </div>
          )}
          {currentNode?.isDisqualified && (
            <div className="bg-slate-700/50 border-b border-slate-600 px-4 py-2">
              <p className="text-slate-400 text-xs font-medium text-center">
                Doesn&apos;t sound like the right fit — and that&apos;s okay!
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <Message
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                typewriter={!message.isUser}
              />
            ))}

            {isTyping && <Message content="" isTyping />}

            {/* Options inline in chat */}
            <AnimatePresence>
              {showOptions && currentNode?.options && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-wrap gap-2 pt-3"
                >
                  {currentNode.options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      onClick={() => handleOptionSelect(option)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        option.isPrimary
                          ? 'bg-[#5371CA] hover:bg-[#6381d4] text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600'
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700 px-4 py-2 bg-slate-800">
            <button
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
            >
              Start over
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
