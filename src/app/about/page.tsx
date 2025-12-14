import { trustSignals } from '@/lib/data';
import Link from 'next/link';
import { YoonetLogo } from '@/components/YoonetLogo';
import { Server, Shield, Trash2, Bot } from 'lucide-react';

// Map trust signal titles to Feather icons
const trustSignalIcons: Record<string, React.ReactNode> = {
  "Australian hosted": <Server className="w-7 h-7 text-slate-300" />,
  "Privacy first": <Shield className="w-7 h-7 text-slate-300" />,
  "Auto-delete": <Trash2 className="w-7 h-7 text-slate-300" />,
  "Our own AI": <Bot className="w-7 h-7 text-slate-300" />,
};

export const metadata = {
  title: 'About | Abby',
  description: 'Meet the team behind Abby - AI-powered SMS confirmation for Cliniko clinics.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Founder Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            We built Abby because we lived the problem
          </h1>

          <div className="bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-700">
            {/* Desktop/tablet image - hidden on mobile */}
            <div className="hidden md:block w-full rounded-xl overflow-hidden mb-6">
              <img
                src="/ben-and-gav.jpeg"
                alt="Ben and Gav - founders of Yoonet and Abby"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Mobile-only collage image */}
            <div className="md:hidden w-full rounded-xl overflow-hidden mb-6">
              <img
                src="/mobile-about.jpeg"
                alt="Ben and Gav through the years - from under 9s football to summer 2025"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                We&apos;re Ben and Gav, founders of Yoonet – a company that&apos;s spent years helping
                allied health clinics with their admin.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                We watched clinic staff spend hours every day doing the same thing: checking
                SMS replies, opening Cliniko, finding the appointment, updating the notes,
                moving on to the next one. Repeat, repeat, repeat.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                It wasn&apos;t hard work. It was tedious work. The kind that drains good people
                and adds no real value.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                So we built Abby.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                Not a complex platform. Not an AI that tries to do everything. Just one
                thing, done properly: interpret patient SMS replies and update your calendar
                automatically.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                We&apos;re based in New Zealand, our servers are in Australia, and we only work
                with Cliniko because that&apos;s what we know inside out.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                If you&apos;ve got questions, we&apos;ll answer them personally.
              </p>
              <p className="text-white font-semibold mt-6">
                — Ben & Gav
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Built for trust
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {trustSignals.map((signal, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{trustSignalIcons[signal.title]}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{signal.title}</h3>
                    <p className="text-slate-400">{signal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yoonet */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-500 mb-4">An official product from</p>
          <a
            href="https://yoonet.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-slate-800 rounded-xl px-6 py-4 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-300 group"
          >
            <YoonetLogo className="w-8 h-14" />
            <div className="text-left">
              <p className="text-white font-semibold group-hover:text-[#8A9EFF] transition-colors">Yoonet</p>
              <p className="text-slate-400 text-sm">Allied health admin solutions</p>
            </div>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to try Abby?
          </h2>
          <p className="text-slate-400 mb-8">
            14-day free trial. No credit card required.
          </p>
          <a
            href="https://app.abby.clinic/login?m=signup"
            className="inline-block bg-[#5371CA] hover:bg-[#6381d4] text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Start your free trial
          </a>
        </div>
      </section>
    </div>
  );
}
