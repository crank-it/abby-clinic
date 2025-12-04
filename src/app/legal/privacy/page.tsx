export const metadata = {
  title: 'Privacy Policy | Abby',
  description: 'Privacy policy for Abby.clinic - AI-powered SMS confirmation for Cliniko.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-slate-400 mb-6">
            Last updated: December 2024
          </p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
              <p>
                Abby.clinic (&quot;Abby&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy.
                This policy explains how we collect, use, and protect information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">What we collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cliniko API key (encrypted at rest)</li>
                <li>Appointment IDs (temporary, purged after 48 hours)</li>
                <li>SMS response text (deleted immediately after interpretation)</li>
                <li>Account email and billing information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">What we don&apos;t collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Patient names or contact details</li>
                <li>Patient health information</li>
                <li>Full appointment details</li>
                <li>Any data beyond what&apos;s needed for SMS interpretation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">How we use your data</h2>
              <p>
                We use your data solely to provide the SMS interpretation service:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Reading SMS responses from Cliniko</li>
                <li>Interpreting patient intent using our AI model</li>
                <li>Posting interpretation results back to Cliniko appointment notes</li>
                <li>Displaying colour-coded status via the Chrome extension</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Data storage & security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data is stored on AWS servers in Sydney, Australia</li>
                <li>Data is encrypted at rest and in transit</li>
                <li>SMS content is deleted immediately after interpretation</li>
                <li>Appointment IDs are purged after 48 hours</li>
                <li>We do not share data with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Our AI model</h2>
              <p>
                Abby uses a proprietary AI model developed in-house. We do not use OpenAI, Google,
                or any other third-party AI service. Your data is never used to train external models.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Your rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access your account data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Revoke Cliniko API access at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
              <p>
                For privacy-related questions, contact us at{' '}
                <a href="mailto:privacy@abby.clinic" className="text-[#7b93db] hover:text-[#a3b5e8]">
                  privacy@abby.clinic
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
