'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Abby vs.", href: "/abby-vs" },
      { label: "FAQ", href: "/faq" },
      { label: "Chrome extension", href: "https://chromewebstore.google.com/detail/abby-for-cliniko/cppckmcdmapbonkfmlfgkhflfjfnhoio" },
      { label: "Cliniko listing", href: "https://www.cliniko.com/connected-apps/abby/" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Thank you Cliniko", href: "/thank-you-cliniko" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-slate-900 relative">
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none transform -translate-y-full">
        <svg
          className="relative block w-full h-8"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40V20C100 30 200 10 300 20C400 30 500 10 600 20C700 30 800 10 900 20C1000 30 1100 10 1200 20V40H0Z"
            className="fill-slate-900"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand with animated server - desktop only */}
          <div className="hidden md:block md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <motion.img
                src="/new-server.png"
                alt="Abby"
                className="h-40 w-auto"
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </Link>
            <p className="text-slate-500 text-sm">
              AI-powered SMS confirmation for Cliniko clinics.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Animated server - mobile only (next to Legal) */}
          <div className="md:hidden flex items-start justify-center">
            <Link href="/">
              <motion.img
                src="/new-server.png"
                alt="Abby"
                className="max-h-28 max-w-full object-contain"
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col items-center gap-2 text-slate-500 text-sm">
            <span>Made with love in</span>
            <a
              href="https://www.dunedinnz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src="/dunedin.svg"
                alt="Dunedin"
                className="h-7 opacity-50"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
