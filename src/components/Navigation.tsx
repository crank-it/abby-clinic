'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { AbbyLogo } from './AbbyLogo';

const navItems = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

const mobileNavItems = [
  { label: "Home", href: "/", emoji: "🏠" },
  { label: "How it works", href: "/how-it-works", emoji: "⚡" },
  { label: "Pricing", href: "/pricing", emoji: "💎" },
  { label: "FAQ", href: "/faq", emoji: "💬" },
  { label: "About us", href: "/about", emoji: "👋" },
  { label: "Contact", href: "/contact", emoji: "📧" },
];

// Robot images for different pages
const pageRobots: Record<string, string> = {
  '/': '/hiw1.png',
  '/how-it-works': '/abby-sends.png',
  '/pricing': '/hiw1.png',
  '/faq': '/interpritation.png',
  '/about': '/hiw1.png',
  '/contact': '/server.png',
};

// Testimonials
const testimonials = [
  { quote: "Since using Abby, we've kept all of our key staff. Game changer!", author: "Practice Manager" },
  { quote: "Abby took 5 minutes to set up and saves us hours every day.", author: "Clinic Owner" },
  { quote: "Our no-show rate dropped by 40% in the first month.", author: "Healthcare Admin" },
  { quote: "Finally, a solution that actually understands patient replies!", author: "Reception Lead" },
  { quote: "I used to dread Monday mornings. Now Abby handles everything.", author: "Front Desk Staff" },
  { quote: "Best investment we've made for our clinic this year.", author: "Practice Director" },
];

// Confetti component
function MenuConfetti({ count = 50 }: { count?: number }) {
  const colors = ['#10b981', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#5371CA'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const color = colors[i % colors.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 2;
        const size = 6 + Math.random() * 6;

        return (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: '100vh',
              opacity: [0, 1, 1, 0],
              rotate: Math.random() * 720,
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration,
              delay,
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

// Streamers component
function MenuStreamers({ count = 20 }: { count?: number }) {
  const colors = ['#10b981', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#5371CA'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const color = colors[i % colors.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.3;

        return (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0, scaleY: 0 }}
            animate={{
              y: '120vh',
              opacity: [0, 0.7, 0.7, 0],
              scaleY: 1,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: `${left}%`,
              width: 3,
              height: 80 + Math.random() * 60,
              background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
              borderRadius: '4px',
            }}
          />
        );
      })}
    </div>
  );
}

// Sparkle particles
function MenuSparkles({ count = 30 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)',
            }}
          />
        );
      })}
    </div>
  );
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const pathname = usePathname();

  // Random effect type when menu opens
  const effectType = useMemo(() => {
    const effects = ['confetti', 'streamers', 'sparkles'] as const;
    return effects[Math.floor(Math.random() * effects.length)];
  }, [mobileMenuOpen]);

  // Get robot for current page
  const currentRobot = pageRobots[pathname] || '/hiw1.png';

  // Rotate testimonials
  useEffect(() => {
    if (mobileMenuOpen) {
      const interval = setInterval(() => {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Scroll to top handler
  const handleNavClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" onClick={handleNavClick} className="flex items-center">
              <AbbyLogo className="h-9" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://app.abby.clinic/login"
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                Log in
              </a>
              <Link
                href="/pricing"
                className="bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-5 py-2 rounded-full transition-colors text-sm"
              >
                Try free
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white p-2 relative z-[60]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Epic Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Animated glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 0.8 }}
                className="absolute top-10 -left-20 w-64 h-64 bg-[#5371CA]/40 rounded-full blur-[80px]"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-20 -right-20 w-72 h-72 bg-emerald-500/30 rounded-full blur-[100px]"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]"
              />
            </div>

            {/* Random effect */}
            {effectType === 'confetti' && <MenuConfetti count={60} />}
            {effectType === 'streamers' && <MenuStreamers count={25} />}
            {effectType === 'sparkles' && <MenuSparkles count={40} />}

            {/* Floating robot image - positioned based on page */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="absolute top-20 right-4 z-[100]"
            >
              <motion.img
                src={currentRobot}
                alt="Abby"
                className="w-28 h-28 object-contain drop-shadow-2xl"
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 left-5 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Menu content */}
            <div className="relative z-10 flex flex-col min-h-screen px-6 pt-20 pb-8">
              {/* Logo */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <AbbyLogo className="h-10" />
              </motion.div>

              {/* Nav items - staggered */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {mobileNavItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.08,
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => {
                            handleNavClick();
                            setMobileMenuOpen(false);
                          }}
                          className={`group flex items-center gap-3 text-2xl font-semibold py-3 px-4 rounded-2xl transition-all ${
                            isActive
                              ? 'bg-[#5371CA] text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                            {item.emoji}
                          </span>
                          <span>{item.label}</span>
                          {isActive && (
                            <motion.span
                              layoutId="activeIndicator"
                              className="ml-auto text-white/60"
                            >
                              ●
                            </motion.span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Testimonial quote */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white/90 text-sm italic mb-2">
                      "{testimonials[testimonialIndex].quote}"
                    </p>
                    <p className="text-[#5371CA] text-xs font-medium">
                      — {testimonials[testimonialIndex].author}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Dots indicator */}
                <div className="flex gap-1 mt-3 justify-center">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === testimonialIndex ? 'bg-[#5371CA]' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <Link
                  href="/pricing"
                  onClick={() => {
                    handleNavClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold text-lg px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start free trial</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
                <a
                  href="https://app.abby.clinic/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/70 hover:text-white font-medium text-center py-3 transition-colors"
                >
                  Already have an account? Log in
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
