import type { Metadata } from "next";
import { Open_Sans, Montserrat, Vollkorn } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QualificationBot } from "@/components/QualificationBot";
import { TrackingScripts } from "@/components/TrackingScripts";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  variable: "--font-vollkorn",
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
      <body className={`${openSans.variable} ${montserrat.variable} ${vollkorn.variable} font-sans bg-slate-900 text-white antialiased`}>
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
