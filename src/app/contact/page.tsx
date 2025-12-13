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
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-4" style={{ marginTop: '15vh' }}>
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-black mb-6 font-heading"
          >
            <span className="bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm">Let's connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl lg:text-2xl max-w-2xl mx-auto text-black"
          >
            <span className="bg-white/80 px-4 py-1 rounded-lg backdrop-blur-sm inline-block">We're passionate about our solutions and are here to make things better for you.</span>
          </motion.p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <div className="w-14 h-14 bg-[#5371CA]/30 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7 text-[#7b93db]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Email us</h3>
              <a
                href="mailto:support@abby.clinic"
                className="text-[#7b93db] hover:text-[#a3b5e8] transition-colors text-lg"
              >
                support@abby.clinic
              </a>
              <p className="text-slate-400 text-sm mt-3">
                We typically respond within 1 business day
              </p>
            </motion.div>

            {/* Mailing address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <div className="w-14 h-14 bg-[#5371CA]/30 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-[#7b93db]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Mailing address</h3>
              <p className="text-slate-300">
                Abby<br />
                309 Princes Street<br />
                Dunedin 9016, New Zealand
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 font-heading">
              <span className="bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm">Our story</span>
            </h2>
            <p className="text-base md:text-lg text-black">
              <span className="bg-white/80 px-3 py-1 rounded-lg backdrop-blur-sm inline-block">The people behind Abby</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="mb-8">
              <h3 className="text-white font-semibold text-lg">Husbands. Fathers. Builders.</h3>
              <p className="text-slate-400 text-sm">40+ years combined business experience</p>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
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
                We operate <a href="https://outeredge.nz" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-[#7b93db] transition-colors">Outer Edge</a> as a consultancy here in New Zealand,
                with <a href="https://yournet.io" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-[#7b93db] transition-colors">Yoonet</a> as our main staple business. And in 2026, we're
                launching <span className="text-white font-medium">Allied Flow</span> - a significant product that will transform
                efficiency and operations, filling critical scarcity gaps for Cliniko users across Australia and New Zealand.
              </p>

              <p className="text-slate-400 italic pt-6 border-t border-white/10">
                We appreciate you visiting our site and look forward to helping your business thrive.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Information */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 font-heading">
              <span className="bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm">Company information</span>
            </h2>
            <p className="text-base md:text-lg text-black">
              <span className="bg-white/80 px-3 py-1 rounded-lg backdrop-blur-sm inline-block">Transparency matters to us</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Billing Entity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Billing entity</h3>
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
                <div>
                  <p className="text-slate-500">Entity type</p>
                  <p className="text-slate-300">NZ Limited Company</p>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
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
            </motion.div>

            {/* Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Infrastructure</h3>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom padding for fixed CTA */}
      <div className="h-40" />

      {/* Fixed CTA at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-black/90 backdrop-blur-md border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#5371CA] hidden sm:block" />
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-semibold">Ready to get started?</h3>
                  <p className="text-slate-400 text-sm">Try Abby free for 14 days. No credit card required.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/faq"
                  className="text-slate-400 hover:text-white transition-colors px-4 py-2 text-sm"
                >
                  FAQ
                </Link>
                <a
                  href="https://app.abby.clinic/login?m=signup"
                  className="inline-flex items-center justify-center gap-2 bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-[#5371CA]/30"
                >
                  Start free trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
