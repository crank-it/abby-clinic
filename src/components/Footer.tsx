import Link from 'next/link';
import { AbbyLogo } from './AbbyLogo';

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Abby vs.", href: "/abby-vs" },
      { label: "Chrome extension", href: "https://chromewebstore.google.com/detail/abby-for-cliniko/cppckmcdmapbonkfmlfgkhflfjfnhoio", external: true },
      { label: "Cliniko listing", href: "https://www.cliniko.com/connected-apps/abby/", external: true }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Thank you Cliniko ❤️", href: "/thank-you-cliniko" }
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
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand - hidden on mobile to avoid logo doubling */}
          <div className="hidden md:block md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <AbbyLogo className="h-9" />
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
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
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
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm text-center">
            © 2025 Abby.clinic
          </p>
          <p className="text-slate-600 text-sm text-center mt-2">
            Made with love in Otago, New Zealand
          </p>
        </div>
      </div>
    </footer>
  );
}
