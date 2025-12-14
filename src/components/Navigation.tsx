'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AbbyLogo } from './AbbyLogo';

const navItems = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Solid backdrop to prevent content bleed-through */}
            <div className="absolute inset-0 bg-slate-900" />
            
            {/* Background image - fully visible with gentle pan animation */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.img
                src="/dunedun1.webp"
                alt=""
                className="w-full h-[120%] object-cover"
                initial={{ y: 0 }}
                animate={{ y: "-15%" }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>

            {/* Close button - top right */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 z-20 p-2 text-white hover:text-slate-200 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu content - centered */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
              {/* Centered Logo */}
              <div className="mb-8">
                <AbbyLogo className="h-12" />
              </div>

              <ul className="space-y-4 text-center">
                {mobileNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        handleNavClick();
                        setMobileMenuOpen(false);
                      }}
                      className="inline-block text-3xl font-heading font-semibold text-white bg-black px-3 py-1 hover:bg-[#5371CA] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-4 w-full max-w-xs">
                <Link
                  href="/pricing"
                  onClick={() => {
                    handleNavClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold text-lg px-6 py-3 rounded-full transition-colors text-center"
                >
                  Start free trial
                </Link>
                <a
                  href="https://app.abby.clinic/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-slate-200 font-medium text-center py-2 transition-colors"
                >
                  Log in
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
