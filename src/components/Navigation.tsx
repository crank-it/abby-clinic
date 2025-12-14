'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { AbbyLogo } from './AbbyLogo';
import { MenuShapesBackground } from './ui/shape-landing-hero';

const navItems = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

const mobileNavItems = [
  { label: "Home", href: "/", icon: "/menu/Home.png" },
  { label: "How it works", href: "/how-it-works", icon: "/menu/How It Works.png" },
  { label: "Pricing", href: "/pricing", icon: "/menu/Pricing.png" },
  { label: "FAQ", href: "/faq", icon: "/menu/FAQ.png" },
  { label: "About us", href: "/about", icon: "/menu/About Us.png" },
  { label: "Contact", href: "/contact", icon: "/menu/Contact.png" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

            {/* Elegant floating shapes background */}
            <MenuShapesBackground />

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
                              ? 'border-2 border-[#5371CA] text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white border-2 border-transparent'
                          }`}
                        >
                          <img
                            src={item.icon}
                            alt=""
                            className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          <span>{item.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

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
