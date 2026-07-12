import { Coda, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { RouteExperience } from '@/components/layout/RouteExperience';
import { site } from '@/data/site';
import { JsonLd } from '@/lib/seo';

import type { Metadata, Viewport } from 'next';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const coda = Coda({
  variable: '--font-coda',
  subsets: ['latin'],
  weight: ['400', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'Obuli Sai Naren — Frontend Engineer · osnaren',
    template: '%s · osnaren',
  },
  description: site.description,
  alternates: { canonical: site.domain },
  keywords: [
    'Obuli Sai Naren',
    'osnaren',
    'frontend developer',
    'React',
    'TypeScript',
    'ecommerce',
    'accessibility',
    'ShadySide',
  ],
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  openGraph: {
    type: 'website',
    url: site.domain,
    siteName: site.handle,
    title: 'Obuli Sai Naren — Frontend Engineer',
    description: site.description,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@osnaren',
    title: 'Obuli Sai Naren — Frontend Engineer',
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/favicon/web-app-manifest-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#14151a' },
  ],
};

/** Runs before paint so the persisted/system theme never flashes. */
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="OS" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${plexMono.variable} ${coda.variable} bg-well text-ink min-h-screen font-sans antialiased`}
      >
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'ProfilePage',
              '@id': `${site.domain}/#profile`,
              url: site.domain,
              name: `${site.name} — Frontend Engineer`,
              description: site.description,
              mainEntity: { '@id': `${site.domain}/#person` },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': `${site.domain}/#person`,
              name: site.name,
              alternateName: site.handle,
              url: site.domain,
              jobTitle: site.role,
              homeLocation: { '@type': 'Place', name: site.location },
              sameAs: Object.values(site.links),
              knowsAbout: [
                'Frontend engineering',
                'React',
                'TypeScript',
                'Web accessibility',
                'User experience',
                'Ecommerce',
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${site.domain}/#website`,
              url: site.domain,
              name: site.handle,
              description: site.description,
              inLanguage: 'en-IN',
              publisher: { '@id': `${site.domain}/#person` },
            },
          ]}
        />
        <RouteExperience />
        <a
          href="#content"
          className="bg-ink text-paper focus:outline-accent sr-only z-50 rounded-md px-4 py-2 font-mono text-xs focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        {/* main is opaque, raised, and at least full-screen so the sticky footer
            reads as a subsurface layer revealed by the page lifting away */}
        <main
          id="content"
          tabIndex={-1}
          className="bg-paper relative z-10 min-h-screen pb-20 shadow-[0_30px_54px_-22px_rgb(0_0_0/0.42)]"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
