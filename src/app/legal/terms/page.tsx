export const metadata = {
  title: 'Terms of Service | Abby',
  description: 'Terms of service for Abby.clinic - AI-powered SMS confirmation for Cliniko.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-slate-400 mb-6">
            Last updated: December 2024
          </p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Service Description</h2>
              <p>
                Abby.clinic provides an AI-powered SMS interpretation service that works exclusively
                with Cliniko practice management software. The service reads patient SMS responses
                to appointment reminders and interprets their intent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Eligibility</h2>
              <p>
                To use Abby, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Have an active Cliniko account</li>
                <li>Be authorised to connect third-party services to your Cliniko account</li>
                <li>Use Google Chrome browser for the calendar overlay feature</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Free Trial</h2>
              <p>
                New accounts receive a 14-day free trial with full access to all features.
                No credit card is required during the trial period. The trial ends automatically
                after 14 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Billing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Subscription fees are billed monthly or annually in advance</li>
                <li>Payments are processed securely via Stripe</li>
                <li>Prices are displayed in AUD, NZD, or GBP based on your region</li>
                <li>We do not offer pro-rated refunds for unused time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Cancellation</h2>
              <p>
                You may cancel your subscription at any time. Upon cancellation:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access continues until the end of your current billing period</li>
                <li>No further charges will be made</li>
                <li>Account data is deleted within 30 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Service Limitations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maximum of 24 practitioners per account</li>
                <li>English language SMS only</li>
                <li>Standard appointments only (one-off SMS not supported)</li>
                <li>98% interpretation accuracy on single-intent messages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Accuracy & Liability</h2>
              <p>
                While we strive for high accuracy, Abby is an assistive tool and should not
                replace human judgement. Users remain responsible for verifying appointment
                statuses and following up with patients as needed. We are not liable for
                missed appointments or miscommunication resulting from AI interpretation errors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Data & Privacy</h2>
              <p>
                Your use of Abby is subject to our{' '}
                <a href="/legal/privacy" className="text-[#7b93db] hover:text-[#a3b5e8]">
                  Privacy Policy
                </a>
                . By using the service, you consent to the collection and processing of data
                as described therein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Changes to Terms</h2>
              <p>
                We may update these terms from time to time. Material changes will be
                communicated via email. Continued use of the service after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Contact</h2>
              <p>
                For questions about these terms, contact us at{' '}
                <a href="mailto:legal@abby.clinic" className="text-[#7b93db] hover:text-[#a3b5e8]">
                  legal@abby.clinic
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
