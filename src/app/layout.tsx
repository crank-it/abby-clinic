import type { Metadata } from "next";
import { Open_Sans, Montserrat, Vollkorn } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QualificationBot } from "@/components/QualificationBot";
import { TrackingScripts } from "@/components/TrackingScripts";

const heading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const body = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const accent = Vollkorn({
  subsets: ["latin"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "Abby | AI SMS confirmation for Cliniko",
  description: "Stop manually checking appointment SMS replies. Abby interprets patient responses and updates your Cliniko calendar automatically.",
  keywords: "cliniko, sms, appointment confirmation, ai, automation, healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MQNC7Q9F');`,
          }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable} ${accent.variable} font-body`}>
        <TrackingScripts />
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <QualificationBot />
      </body>
    </html>
  );
}
