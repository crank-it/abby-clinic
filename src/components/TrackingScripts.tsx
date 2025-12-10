import Script from 'next/script';
import { readFile } from 'fs/promises';
import path from 'path';

interface MarketingConfig {
  ga4: {
    enabled: boolean;
    measurementId: string;
    snippet: string;
  };
  gtm: {
    enabled: boolean;
    containerId: string;
  };
  googleSearchConsole: {
    enabled: boolean;
    verificationTag: string;
  };
  googleAds: {
    enabled: boolean;
    conversionId: string;
    conversionLabel: string;
    remarketingTag: string;
  };
  metaPixel: {
    enabled: boolean;
    pixelId: string;
    snippet: string;
    advancedMatching: boolean;
  };
}

async function getMarketingConfig(): Promise<MarketingConfig | null> {
  try {
    const configPath = path.join(process.cwd(), 'data', 'marketing-config.json');
    const configData = await readFile(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch {
    return null;
  }
}

export async function TrackingScripts() {
  const config = await getMarketingConfig();

  if (!config) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {config.ga4.enabled && config.ga4.measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.ga4.measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.ga4.measurementId}');
            `}
          </Script>
        </>
      )}

      {/* Google Ads Remarketing */}
      {config.googleAds.enabled && config.googleAds.conversionId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAds.conversionId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.googleAds.conversionId}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {config.metaPixel.enabled && config.metaPixel.pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${config.metaPixel.pixelId}'${config.metaPixel.advancedMatching ? ', {}' : ''});
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Google Tag Manager */}
      {config.gtm?.enabled && config.gtm.containerId && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MQNC7Q9F');`}
          </Script>

          {/* noscript iframe must be present immediately after opening <body> */}
          <noscript dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQNC7Q9F" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }} />
        </>
      )}
    </>
  );
}

// Export function to get verification tag for metadata
export async function getSearchConsoleVerification(): Promise<string | null> {
  const config = await getMarketingConfig();
  if (config?.googleSearchConsole.enabled && config.googleSearchConsole.verificationTag) {
    return config.googleSearchConsole.verificationTag;
  }
  return null;
}
