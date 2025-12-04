'use client';

import { FAQAccordion } from '@/components/FAQAccordion';
import { faqContent, quickStart } from '@/lib/data';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Quick Start Guide */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Support
          </h1>
          <p className="text-slate-400 text-lg text-center mb-12">
            Everything you need to get started and stay running smoothly.
          </p>

          <div className="bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-700 mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Quick Start Guide</h2>

            <div className="space-y-6">
              {quickStart.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#5371CA] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <FAQAccordion items={faqContent.setup} title="Setup" />
            <FAQAccordion items={faqContent.howItWorks} title="How it works" />
            <FAQAccordion items={faqContent.security} title="Security & Privacy" />
            <FAQAccordion items={faqContent.billing} title="Billing" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Still have questions?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
              <div className="w-12 h-12 bg-[#5371CA]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#5371CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email us</h3>
              <a
                href="mailto:support@abby.clinic"
                className="text-[#7b93db] hover:text-[#a3b5e8] transition-colors"
              >
                support@abby.clinic
              </a>
              <p className="text-slate-500 text-sm mt-2">
                We typically respond within 1 business day
              </p>
            </div>

            {/* Login */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
              <div className="w-12 h-12 bg-[#5371CA]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#5371CA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Login to Abby</h3>
              <p className="text-slate-400 mb-3">
                Access your dashboard and manage your account.
              </p>
              <a
                href="https://app.abby.clinic/login"
                className="inline-block bg-[#5371CA] hover:bg-[#6381d4] text-white font-medium px-6 py-2 rounded-full transition-colors text-sm"
              >
                Go to login
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
