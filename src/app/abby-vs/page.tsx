import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Abby vs. Other Cliniko SMS Applications | Abby',
  description: 'Compare Abby to other Cliniko SMS applications like Peptalkr, Clinic Apps, and more. Find out which SMS interpretation tool is right for your clinic.',
  keywords: ['Cliniko SMS applications', 'Clinic Apps', 'Peptalkr', 'Cliniko tools', 'SMS interpretation', 'appointment reminders'],
};

export default function AbbyVsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Abby vs. Other Cliniko Tools
        </h1>
        <p className="text-slate-400 mb-8">
          A guide to comparing Cliniko SMS applications
        </p>

        <div className="mb-10 rounded-xl overflow-hidden">
          <Image
            src="/Cliniko-SMS-Applications.jpeg"
            alt="Cliniko SMS Applications comparison"
            width={800}
            height={450}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-10 text-slate-300">
            {/* Intro */}
            <section>
              <p className="text-lg leading-relaxed">
                At Abby, we think everyone building solutions for the healthcare industry is an absolute legend. Seriously. This isn&apos;t an article to say we&apos;re better than anyone else.
              </p>
              <p className="leading-relaxed mt-4">
                But we do get asked a lot: <em>&quot;How does Abby compare to [insert tool here]?&quot;</em>
              </p>
              <p className="leading-relaxed mt-4">
                Often, the tools we&apos;re being compared to aren&apos;t really comparable at all—they&apos;re solving completely different problems. So we&apos;ve put together this quick guide to help you compare apples with apples when making your decision.
              </p>
            </section>

            {/* What Abby Actually Does */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                What Abby Actually Does
              </h2>
              <p className="leading-relaxed">
                Let&apos;s start here, because this is where the confusion usually begins.
              </p>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">Abby does one thing:</strong> We interpret patient SMS replies to your existing Cliniko appointment reminders and show you the result with colour-coded appointments.
              </p>
              <p className="leading-relaxed mt-4">
                That&apos;s it. We don&apos;t send messages. We don&apos;t manage your marketing. We don&apos;t replace Cliniko. We just read the replies that are already sitting in your communication log and tell you what they mean—so you don&apos;t have to.
              </p>
            </section>

            {/* Abby vs. Peptalkr */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                Abby vs. Peptalkr
              </h2>
              <p className="leading-relaxed">
                <strong className="text-white">Peptalkr</strong> is brilliant for patient communication and marketing automation. It helps you send targeted emails and SMS campaigns, reactivate lapsed patients, and nurture relationships over time.
              </p>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">The difference:</strong> Peptalkr is about <em>outbound</em> communication—getting messages out to patients. Abby is about <em>inbound</em> interpretation—understanding what patients say when they reply.
              </p>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">Use both?</strong> Absolutely. They solve different problems entirely.
              </p>
            </section>

            {/* Abby vs. Clinic Apps */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                Abby vs. Clinic Apps
              </h2>
              <p className="leading-relaxed">
                <strong className="text-white">Clinic Apps</strong> is an all-in-one platform with a huge feature set: calendar optimisation, digital forms, call insights, KPI dashboards, and much more.
              </p>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">The difference:</strong> Clinic Apps is a comprehensive practice growth platform. If you want one tool to do everything, that&apos;s their lane. Abby is purposefully focused—we solve one specific problem and solve it well.
              </p>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">Something to consider:</strong> All-in-one solutions require significant setup and configuration. If you just want SMS replies interpreted without overhauling your workflows, Abby takes about 5 minutes to set up.
              </p>
            </section>

            {/* Abby vs. General Appointment Reminder Tools */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                Abby vs. General Appointment Reminder Tools
              </h2>
              <p className="leading-relaxed">
                Tools like <strong className="text-white">Apptoto</strong>, <strong className="text-white">Dialog Health</strong>, or <strong className="text-white">Curogram</strong> are appointment reminder and communication platforms in their own right.
              </p>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">The difference:</strong> These are standalone systems, often designed to replace or work alongside your existing reminder setup. Abby doesn&apos;t send reminders at all—we work with the reminders Cliniko already sends, interpreting the replies that come back.
              </p>
              <p className="leading-relaxed mt-4">
                If you&apos;re happy with Cliniko&apos;s built-in SMS reminders and just want help processing the responses, that&apos;s exactly what Abby is for.
              </p>
            </section>

            {/* Abby vs. Switching PMS */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                Abby vs. Switching to Another Practice Management System
              </h2>
              <p className="leading-relaxed">
                Some clinics consider moving to platforms like <strong className="text-white">Zanda Health</strong> (formerly Power Diary) which have two-way SMS built in.
              </p>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">The difference:</strong> That&apos;s a big decision involving data migration, team retraining, and workflow changes. Abby lets you keep everything exactly as it is—same Cliniko setup, same processes—and just adds intelligent reply interpretation on top.
              </p>
            </section>

            {/* What's Abby Best For */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                So, What&apos;s Abby Best For?
              </h2>
              <p className="leading-relaxed mb-4">
                Abby is the right choice if you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Already use Cliniko and you&apos;re happy with it</li>
                <li>Use Cliniko&apos;s built-in SMS appointment reminders</li>
                <li>Spend time each day manually checking patient SMS replies</li>
                <li>Want a simple, focused tool that does one job brilliantly</li>
                <li>Value data privacy (Australian servers, no third-party AI)</li>
                <li>Don&apos;t want to overhaul your existing systems</li>
              </ul>
              <p className="leading-relaxed mt-6">
                If that sounds like you,{' '}
                <Link 
                  href="/pricing" 
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  start your free 14-day trial
                </Link>
                —no credit card required, setup takes 5 minutes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

