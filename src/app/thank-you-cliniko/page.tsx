import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Choose Cliniko | A Love Letter from Abby.clinic',
  description: 'Why we built Abby exclusively for Cliniko: Joel Friedlaender\'s vision, ethical business practices, robust API, carbon neutrality, and a culture that proves you can build a profitable company without sacrificing your soul.',
};

export default function ThankYouClinikoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Thank You, Joel
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            A Love Letter to Cliniko from the Team at Abby.clinic
          </p>
          
          {/* Hero Image */}
          <div className="w-full rounded-xl overflow-hidden border border-slate-700">
            <img
              src="/Why-Choose-Cliniko.jpeg"
              alt="Why Choose Cliniko - Illustration of the Cliniko team"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-slate-300">
            <p className="text-lg">
              Some companies are built to be acquired. Others are built to impress investors. 
              Cliniko was built differently—it was built to matter.
            </p>

            <p>
              When we set out to build Abby, an AI-powered SMS confirmation tool for healthcare 
              practices, we had options. We could have tried to integrate with every practice 
              management system under the sun. Instead, we chose to focus entirely on Cliniko. 
              This wasn&apos;t a business decision—it was a values decision.
            </p>

            {/* Finding Kindred Spirits */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mt-12 mb-4">
                Finding Kindred Spirits
              </h2>
              <p>
                We first discovered Joel Friedlaender&apos;s philosophy through his{' '}
                <a 
                  href="https://www.cliniko.com/blog/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  blog posts
                </a>. 
                Here was a founder who openly admits he dislikes getting up early—so he built 
                a company with flexible hours. A founder who hates meetings—so his team of 57 
                people across the globe operates with barely any. A founder who believes that 
                if you hire the best people, you should get out of their way.
              </p>
              <p>
                As Joel himself wrote: <em>&quot;It&apos;s just business&quot; is possibly my most hated 
                phrase. It&apos;s an excuse for bad integrity and to do wrong by people. The funny 
                thing is, no matter how hard we pretend, it&apos;s not just business. We&apos;re real 
                people, dealing with other real people.</em>
              </p>
              <p>
                Reading those words, we knew we&apos;d found our platform.
              </p>
            </section>

            {/* The Courage to Say No */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mt-12 mb-4">
                The Courage to Say No
              </h2>
              <p>
                Cliniko is proudly bootstrapped. Joel and his partner Liora famously took out 
                a home renovation loan to start the company—except they built software instead 
                of a kitchen. Over the years, venture capitalists have come knocking with offers 
                of investment. The answer has always been the same: no thanks.
              </p>
              <p>
                As Joel explained: <em>&quot;We don&apos;t want money from an investor who wants fast 
                growth at all costs. We want it to come from our customers who use Cliniko. 
                In order to do right by our customers, our motives need to be aligned with them.&quot;</em>
              </p>
              <p>
                This is radical in an industry obsessed with growth metrics and exit strategies. 
                It takes courage to choose sustainability over speed, integrity over investment.
              </p>
            </section>

            {/* Recognition That Matters */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mt-12 mb-4">
                Recognition That Matters
              </h2>
              <p>
                The world has noticed. In 2025, Cliniko was named to the Australian Financial 
                Review BOSS Best Places to Work list. In 2023, SmartCompany featured Cliniko 
                in their Smart50 Workplaces awards, highlighting their unlimited annual leave, 
                flexible hours, and no-meetings culture. Red Guava (the company behind Cliniko) 
                received the Australian Enterprise Award in 2019.
              </p>
              <p>
                But perhaps the most telling recognition is this: when Cliniko posts a job opening, 
                they receive over 5,000 applications. People don&apos;t just want to use Cliniko—they 
                want to be Cliniko.
              </p>
            </section>

            {/* More Than Carbon Neutral */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mt-12 mb-4">
                More Than Carbon Neutral
              </h2>
              <p>
                Since 2021, Cliniko has been 100% carbon neutral. For a fully remote company 
                with team members scattered across the globe, this wasn&apos;t simple. They measured 
                every laptop, every monitor, every air conditioner, every flight to team meetups. 
                They partnered with{' '}
                <a 
                  href="https://carbonneutral.com.au/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  Carbon Neutral Australia
                </a>{' '}
                to offset 482.4 tonnes of CO₂ annually—the equivalent of three Boeing Dreamliners.
              </p>
              <p>
                And then there&apos;s the giving. Cliniko donates a minimum of 2% of all customer 
                subscription revenue to charity—not profit, revenue. That&apos;s a commitment that 
                doesn&apos;t waiver with market conditions. To date, they&apos;ve donated over AU$2.7 
                million to causes including{' '}
                <a 
                  href="https://www.beyondtheorphanage.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  Beyond the Orphanage
                </a>{' '}
                (supporting vulnerable children in Kenya and Nepal) and{' '}
                <a 
                  href="https://seashepherd.org.au/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  Sea Shepherd
                </a>{' '}
                (protecting our oceans).
              </p>
            </section>

            {/* The API That Made Abby Possible */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mt-12 mb-4">
                The API That Made Abby Possible
              </h2>
              <p>
                Now we come to the reason we can even exist. Cliniko maintains a robust, 
                well-documented,{' '}
                <a 
                  href="https://github.com/redguava/cliniko-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  public API
                </a>{' '}
                that enables developers like us to build tools that extend and enhance the 
                platform. This wasn&apos;t an afterthought—it was a strategic choice to empower 
                an entire ecosystem.
              </p>
              <p>
                As they wrote on their blog: <em>&quot;The possibilities of our Public API are only 
                limited to two things: what we allow, and your imagination.&quot;</em>
              </p>
              <p>
                That imagination has flourished. Today, dozens of{' '}
                <a 
                  href="https://www.cliniko.com/connected-apps/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  connected apps
                </a>—from 
                telehealth solutions to AI-powered documentation tools—integrate with Cliniko. 
                Abby is proud to be among them, helping over 65,000 healthcare professionals 
                save time on appointment confirmations.
              </p>
              <p>
                The API is clean. The documentation is thorough. The support is responsive. 
                These things matter when you&apos;re building a business on top of another company&apos;s 
                platform. Joel and the team at Cliniko clearly understand that their success 
                is intertwined with ours.
              </p>
            </section>

            {/* The Ripple Effect */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mt-12 mb-4">
                The Ripple Effect
              </h2>
              <p>
                Here&apos;s what Joel might not fully appreciate: the impact of his decisions extends 
                far beyond Cliniko&apos;s 65,000+ users. Every clinic that runs more efficiently 
                because of Cliniko treats more patients. Every practitioner who spends less time 
                on admin has more energy for care. Every integration partner who builds on the 
                API creates additional value.
              </p>
              <p>
                When we confirm an appointment through Abby, we&apos;re standing on foundations Joel 
                laid. When a patient shows up on time because of a reminder we processed, that&apos;s 
                Joel&apos;s vision in action. When a physio doesn&apos;t have to chase confirmation calls 
                and can focus on treatment—Joel made that possible.
              </p>
              <p>
                One person&apos;s risk. One person&apos;s vision. One decision to do things differently. 
                And now, healthcare systems across Australia, New Zealand, the UK, and 70+ 
                countries worldwide are better for it.
              </p>
            </section>

            {/* A Simple Thank You */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mt-12 mb-4">
                A Simple Thank You
              </h2>
              <p>
                Joel, we don&apos;t know if you&apos;ll ever read this. But we wanted you to know that 
                your philosophy matters. Your commitment to building something ethical, sustainable, 
                and genuinely useful has created ripples you can&apos;t see.
              </p>
              <p>
                Thank you for proving that you can build a profitable company without sacrificing 
                your soul.
              </p>
              <p>
                Thank you for maintaining an API that enables partners like us to exist.
              </p>
              <p>
                Thank you for showing that no meetings, no managers, no investors isn&apos;t just 
                possible—it&apos;s preferable.
              </p>
              <p>
                Thank you for the team you&apos;ve assembled, the culture you&apos;ve created, and the 
                platform you&apos;ve built.
              </p>
              <p>
                Most of all, thank you for reminding us that there&apos;s another way to do business.
              </p>
              <p className="mt-8">
                From everyone at Abby.clinic—we&apos;re proud to build for Cliniko. We&apos;re grateful 
                to build with Cliniko. And we&apos;re inspired every day by the example you&apos;ve set.
              </p>
            </section>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-slate-700">
              <p className="text-white font-semibold">
                With deep appreciation,
              </p>
              <p className="text-white font-semibold mt-2">
                Ben Carter and Gavin Hodges
              </p>
              <p className="text-slate-400 text-base">
                Co-founders, Abby.clinic
              </p>
              <p className="text-slate-500 text-sm mt-2">
                A Yoonet Product
              </p>
            </div>

            {/* Links */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                Learn more:{' '}
                <a 
                  href="https://abby.clinic" 
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  abby.clinic
                </a>
                {' | '}
                <a 
                  href="https://www.cliniko.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7b93db] hover:text-[#a3b5e8] underline"
                >
                  cliniko.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

