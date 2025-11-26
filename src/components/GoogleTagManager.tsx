'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleTagManagerProps {
  gtmId: string;
}

/**
 * Google Tag Manager component for Next.js
 *
 * This component initializes GTM and sets up the dataLayer.
 * It should be added to the root layout of your Next.js application.
 *
 * @param gtmId - Your Google Tag Manager ID (e.g., 'GTM-XXXXXXX')
 */
export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  // Initialize dataLayer on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.dataLayer) {
      window.dataLayer = [];
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager - Head Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Google Tag Manager - NoScript Fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
