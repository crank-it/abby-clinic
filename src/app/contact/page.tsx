'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Sparkle component for the magical effect
function MagicSparkles({ count = 50 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{size: number; left: number; top: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    setParticles(
      [...Array(count)].map(() => ({
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      }))
    );
  }, [count]);

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

// Floating particles
function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{size: number; left: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    setParticles(
      [...Array(count)].map(() => ({
        size: 4 + Math.random() * 8,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 20,
      }))
    );
  }, [count]);

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
            background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100px',
            opacity: [0, 0.6, 0.6, 0],
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

export default function ContactPage() {
  const robots = [
    { src: '/hiw1.png', position: 'left-top', className: 'hidden md:block -left-16 top-20 w-32 h-32 -rotate-12' },
    { src: '/hiw2.png', position: 'right-top', className: 'hidden md:block -right-14 top-32 w-28 h-28 rotate-12' },
    { src: '/server.png', position: 'left-bottom', className: 'hidden md:block -left-12 bottom-40 w-28 h-28 rotate-6' },
    { src: '/interpritation.png', position: 'right-bottom', className: 'hidden md:block -right-16 bottom-24 w-32 h-32 -rotate-6' },
    { src: '/abby-sends.png', position: 'left-mid', className: 'hidden lg:block -left-20 top-1/2 w-36 h-36 -rotate-3' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical Aurora Background */}
      <div className="fixed inset-0" style={{ zIndex: -1 }}>
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Aurora layers */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(83, 113, 202, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 80% 60%, rgba(83, 113, 202, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 40% 30%, rgba(83, 113, 202, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(83, 113, 202, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 30% 70%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 60% 50%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)',
              'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)',
              'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)',
              'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)',
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 50% 30% at 30% 60%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse 50% 30% at 70% 40%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse 50% 30% at 50% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse 50% 30% at 30% 60%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Sparkles */}
        <MagicSparkles count={60} />

        {/* Floating particles */}
        <FloatingParticles count={25} />
      </div>

      {/* Main Content - Single Centered Card */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl relative"
        >
          {/* Peeking Robots */}
          {robots.map((robot, index) => (
            <motion.div
              key={robot.src}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.5 + index * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className={`absolute z-20 ${robot.className}`}
            >
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={robot.src}
                  alt="Abby character"
                  width={140}
                  height={140}
                  className="drop-shadow-[0_0_20px_rgba(83,113,202,0.5)]"
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Main Card */}
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl shadow-black/50">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5371CA]/20 via-purple-500/10 to-[#5371CA]/20 rounded-3xl blur-xl -z-10" />

            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5371CA]/20 rounded-full text-[#7b93db] text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>We'd love to hear from you</span>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                Let's connect
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                We're passionate about our solutions and are here to make things better for you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-[#5371CA]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#5371CA]/20 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#7b93db]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Email us</h3>
                <a
                  href="mailto:support@abby.clinic"
                  className="text-[#7b93db] hover:text-[#a3b5e8] transition-colors"
                >
                  support@abby.clinic
                </a>
                <p className="text-slate-400 text-sm mt-2">
                  We typically respond within 1 business day
                </p>
              </motion.div>

              {/* Mailing Address */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-[#5371CA]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#5371CA]/20 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#7b93db]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Mailing address</h3>
                <p className="text-slate-300 text-sm">
                  Abby<br />
                  309 Princes Street<br />
                  Dunedin 9016, New Zealand
                </p>
              </motion.div>
            </div>

            {/* Our Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50 mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heading">
                Our story
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  We're two honest, hard-working guys trying to make a difference through innovative ideas.
                  Originally from <span className="text-white font-medium">Brisbane and Toowoomba, Australia</span>, we made the move
                  to beautiful <span className="text-white font-medium">Dunedin, New Zealand</span> in 2023.
                </p>

                <p>
                  With a combined business history of over 40 years and a passion for everything we do,
                  we've built our careers on solving real problems for real businesses.
                </p>

                <p>
                  We operate <a href="https://outeredge.nz" target="_blank" rel="noopener noreferrer" className="text-[#7b93db] hover:text-[#a3b5e8] transition-colors font-medium">Outer Edge</a> as a consultancy here in New Zealand,
                  with <a href="https://yournet.io" target="_blank" rel="noopener noreferrer" className="text-[#7b93db] hover:text-[#a3b5e8] transition-colors font-medium">Yoonet</a> as our main staple business. And in 2026, we're
                  launching <span className="text-white font-medium">Allied Flow</span> - a significant product that will transform
                  efficiency and operations, filling critical scarcity gaps for Cliniko users across Australia and New Zealand.
                </p>

                <p className="text-slate-400 italic pt-4 border-t border-slate-700/50">
                  We appreciate you visiting our site and look forward to helping your business thrive.
                </p>
              </div>
            </motion.div>

            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heading text-center">
                Company information
              </h2>
              <p className="text-slate-400 text-center mb-8">Transparency matters to us</p>

              <div className="grid sm:grid-cols-3 gap-6">
                {/* Billing Entity */}
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:border-[#5371CA]/30 transition-colors">
                  <h3 className="text-base font-semibold text-white mb-4">Billing entity</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-500">Company name</p>
                      <p className="text-white font-medium">Outer Edge Limited</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Company number</p>
                      <p className="text-slate-300">8973750</p>
                    </div>
                    <div>
                      <p className="text-slate-500">NZBN</p>
                      <p className="text-slate-300">9429051685140</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Registered</p>
                      <p className="text-slate-300">October 26, 2023</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:border-[#5371CA]/30 transition-colors">
                  <h3 className="text-base font-semibold text-white mb-4">Location</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-500">Headquarters</p>
                      <p className="text-white font-medium">Dunedin, New Zealand</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Previously</p>
                      <p className="text-slate-300">Brisbane & Toowoomba, Australia</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Timezone</p>
                      <p className="text-slate-300">NZST (UTC+12/+13)</p>
                    </div>
                  </div>
                </div>

                {/* Infrastructure */}
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:border-[#5371CA]/30 transition-colors">
                  <h3 className="text-base font-semibold text-white mb-4">Infrastructure</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-500">Server location</p>
                      <p className="text-white font-medium">Sydney, Australia</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Provider</p>
                      <p className="text-slate-300">Amazon Web Services</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Data sovereignty</p>
                      <p className="text-slate-300">Australian servers only</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-[#5371CA]/20 via-purple-600/20 to-[#5371CA]/20 rounded-2xl p-8 border border-[#5371CA]/30"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-[#5371CA] hidden sm:block flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Ready to get started?</h3>
                    <p className="text-slate-400 text-sm">Try Abby free for 14 days. No credit card required.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link
                    href="/faq"
                    className="text-slate-400 hover:text-white transition-colors px-4 py-2 text-sm"
                  >
                    FAQ
                  </Link>
                  <a
                    href="https://app.abby.clinic/login?m=signup"
                    className="inline-flex items-center justify-center gap-2 bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-[#5371CA]/30 whitespace-nowrap"
                  >
                    Start free trial
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
