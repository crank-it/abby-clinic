'use client';

import { useState, useEffect } from 'react';
import { trustSignals } from '@/lib/data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { YoonetLogo } from '@/components/YoonetLogo';
import { Server, Shield, Trash2, Bot, Sparkles, Heart } from 'lucide-react';

// Map trust signal titles to Feather icons
const trustSignalIcons: Record<string, React.ReactNode> = {
  "Australian hosted": <Server className="w-7 h-7 text-[#7b93db]" />,
  "Privacy first": <Shield className="w-7 h-7 text-[#7b93db]" />,
  "Auto-delete": <Trash2 className="w-7 h-7 text-[#7b93db]" />,
  "Our own AI": <Bot className="w-7 h-7 text-[#7b93db]" />,
};

// Magic sparkles component - reduced for mobile
function MagicSparkles({ count = 40, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const [particles, setParticles] = useState<Array<{size: number; left: number; top: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    const actualCount = isMobile ? Math.min(count, 12) : count;
    setParticles(
      [...Array(actualCount)].map(() => ({
        size: 2 + Math.random() * 3,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      }))
    );
  }, [count, isMobile]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating particles - reduced for mobile
function FloatingParticles({ count = 15, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const [particles, setParticles] = useState<Array<{size: number; left: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    const actualCount = isMobile ? Math.min(count, 5) : count;
    setParticles(
      [...Array(actualCount)].map(() => ({
        size: 4 + Math.random() * 6,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 20 + Math.random() * 15,
      }))
    );
  }, [count, isMobile]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100px',
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical Aurora Background - Fixed */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Aurora layers - simplified on mobile */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
                  'radial-gradient(ellipse 80% 50% at 80% 50%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
                  'radial-gradient(ellipse 80% 50% at 40% 40%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
                  'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(83, 113, 202, 0.25) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
                  'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
                  'radial-gradient(ellipse 60% 40% at 60% 40%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
                  'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
                  'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
                  'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
                  'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)',
                ],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(ellipse 50% 30% at 30% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                  'radial-gradient(ellipse 50% 30% at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                  'radial-gradient(ellipse 50% 30% at 50% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                  'radial-gradient(ellipse 50% 30% at 30% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </>
        )}

        {/* Static aurora for mobile */}
        {isMobile && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(83,113,202,0.2)_0%,transparent_50%)]" />
        )}

        {/* Sparkles - reduced on mobile */}
        <MagicSparkles count={50} isMobile={isMobile} />

        {/* Floating particles - reduced on mobile */}
        <FloatingParticles count={20} isMobile={isMobile} />
      </div>

      {/* Floating Robots */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="hidden lg:block fixed left-4 xl:left-8 top-32 z-20"
      >
        <motion.div
          animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/hiw1.png"
            alt="Abby"
            width={100}
            height={100}
            className="drop-shadow-[0_0_25px_rgba(83,113,202,0.4)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        className="hidden lg:block fixed right-4 xl:right-8 top-40 z-20"
      >
        <motion.div
          animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/hiw2.png"
            alt="Abby"
            width={90}
            height={90}
            className="drop-shadow-[0_0_25px_rgba(147,51,234,0.4)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
        className="hidden xl:block fixed left-12 bottom-32 z-20"
      >
        <motion.div
          animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/abby-sends.png"
            alt="Abby"
            width={80}
            height={80}
            className="drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
        className="hidden xl:block fixed right-12 bottom-40 z-20"
      >
        <motion.div
          animate={{ y: [3, -3, 3], rotate: [2, -2, 2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/server.png"
            alt="Abby"
            width={75}
            height={75}
            className="drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          />
        </motion.div>
      </motion.div>

      {/* Founder Story */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Sparkle badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 backdrop-blur-sm rounded-full text-[#7b93db] text-sm font-medium border border-[#5371CA]/30">
              <Heart className="w-4 h-4" />
              <span>Our Story</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 text-center font-heading leading-tight"
          >
            We built Abby because we{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#5371CA] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                lived the problem
              </span>
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-[#5371CA]/20 via-purple-500/20 to-pink-500/20 blur-lg rounded-lg"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-8 border border-slate-700/50 shadow-2xl"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5371CA]/10 via-purple-500/10 to-[#5371CA]/10 rounded-3xl blur-xl -z-10" />

            {/* Desktop/tablet image - hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden md:block w-full rounded-2xl overflow-hidden mb-6 border border-slate-700/50"
            >
              <img
                src="/ben-and-gav.jpeg"
                alt="Ben and Gav - founders of Yoonet and Abby"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Mobile-only collage image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="md:hidden w-full rounded-2xl overflow-hidden mb-6 border border-slate-700/50"
            >
              <img
                src="/mobile-about.jpeg"
                alt="Ben and Gav through the years - from under 9s football to summer 2025"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <div className="prose prose-invert max-w-none">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-slate-300 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4"
              >
                We&apos;re Ben and Gav, founders of Yoonet – a company that&apos;s spent years helping
                allied health clinics with their admin.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="text-slate-300 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4"
              >
                We watched clinic staff spend hours every day doing the same thing: checking
                SMS replies, opening Cliniko, finding the appointment, updating the notes,
                moving on to the next one. <span className="text-white font-medium">Repeat, repeat, repeat.</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-slate-300 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4"
              >
                It wasn&apos;t hard work. It was <span className="text-pink-400 font-medium">tedious work</span>. The kind that drains good people
                and adds no real value.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
              >
                So we built Abby.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-slate-300 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4"
              >
                Not a complex platform. Not an AI that tries to do everything. Just one
                thing, done properly: <span className="text-[#7b93db] font-medium">interpret patient SMS replies and update your calendar
                automatically.</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="text-slate-300 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4"
              >
                We&apos;re based in New Zealand, our servers are in Australia, and we only work
                with Cliniko because that&apos;s what we know inside out.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-slate-300 text-base sm:text-lg leading-relaxed"
              >
                If you&apos;ve got questions, we&apos;ll answer them personally.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
                className="text-white font-semibold mt-4 sm:mt-6 text-lg sm:text-xl"
              >
                — Ben & Gav
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="relative z-10 py-12 sm:py-16 px-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4"
            >
              <Shield className="w-4 h-4" />
              <span>Security & Privacy</span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading">
              Built for trust
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {trustSignals.map((signal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-[#5371CA]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="flex-shrink-0 w-12 h-12 bg-[#5371CA]/20 rounded-xl flex items-center justify-center"
                  >
                    {trustSignalIcons[signal.title]}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{signal.title}</h3>
                    <p className="text-slate-400">{signal.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yoonet */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-slate-500 mb-4">An official product from</p>
          <motion.a
            href="https://yoonet.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl px-8 py-5 border border-slate-700/50 hover:border-[#5371CA]/50 transition-all duration-300 group"
          >
            <YoonetLogo className="w-8 h-14" />
            <div className="text-left">
              <p className="text-white font-semibold text-lg group-hover:text-[#8A9EFF] transition-colors">Yoonet</p>
              <p className="text-slate-400 text-sm">Allied health admin solutions</p>
            </div>
          </motion.a>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#5371CA]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

            {/* Peeking robots */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ x: [-3, 3, -3], rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/interpritation.png"
                  alt="Abby"
                  width={80}
                  height={80}
                  className="drop-shadow-[0_0_15px_rgba(83,113,202,0.5)]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ x: [3, -3, 3], rotate: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/hiw2.png"
                  alt="Abby"
                  width={80}
                  height={80}
                  className="drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                />
              </motion.div>
            </motion.div>

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 rounded-full text-[#7b93db] text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join the Abby family</span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                Ready to try Abby?
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                14-day free trial. No credit card required.
              </p>
              <motion.a
                href="https://app.abby.clinic/login?m=signup"
                className="group relative inline-block bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-[#5371CA]/30 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start your free trial
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#6381d4] to-purple-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
