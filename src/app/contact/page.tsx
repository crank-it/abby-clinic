'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed full-viewport background image */}
      <div className="fixed inset-0" style={{ zIndex: -1 }}>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="/contact-bg.webp"
            alt="Coastal pool aerial view"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content - Single Centered Card */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Main Card */}
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-12">
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
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
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
              </div>

              {/* Mailing Address */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <div className="w-12 h-12 bg-[#5371CA]/20 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#7b93db]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Mailing address</h3>
                <p className="text-slate-300 text-sm">
                  Abby<br />
                  309 Princes Street<br />
                  Dunedin 9016, New Zealand
                </p>
              </div>
            </div>

            {/* Our Story */}
            <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50 mb-8">
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

                <p className="text-slate-400 italic pt-4 border-t border-slate-700">
                  We appreciate you visiting our site and look forward to helping your business thrive.
                </p>
              </div>
            </div>

            {/* Company Information */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heading text-center">
                Company information
              </h2>
              <p className="text-slate-400 text-center mb-8">Transparency matters to us</p>

              <div className="grid sm:grid-cols-3 gap-6">
                {/* Billing Entity */}
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
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
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
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
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
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
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-[#5371CA]/20 to-purple-600/20 rounded-2xl p-8 border border-[#5371CA]/30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <Sparkles className="w-6 h-6 text-[#5371CA] hidden sm:block flex-shrink-0" />
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
                    className="inline-flex items-center justify-center gap-2 bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-[#5371CA]/30 whitespace-nowrap"
                  >
                    Start free trial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
