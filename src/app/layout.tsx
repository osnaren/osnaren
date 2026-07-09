import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { site } from '@/data/site';

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

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'Obuli Sai Naren — Frontend Engineer · osnaren',
    template: '%s · osnaren',
  },
  description: site.description,
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
    siteName: 'osnaren.lab',
    title: 'Obuli Sai Naren — Frontend Engineer',
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@osnaren',
    title: 'Obuli Sai Naren — Frontend Engineer',
    description: site.description,
  },
  robots: { index: true, follow: true },
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
        className={`${spaceGrotesk.variable} ${plexMono.variable} bg-paper text-ink min-h-screen font-sans antialiased`}
      >
        <a
          href="#content"
          className="bg-ink text-paper focus:outline-accent sr-only z-50 rounded-md px-4 py-2 font-mono text-xs focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        {/* main stays opaque and above the footer so the "subsurface lab" reveal reads as the page lifting away */}
        <main id="content" className="bg-paper relative z-10 pb-16 shadow-[0_28px_44px_-20px_rgb(0_0_0/0.35)]">
          {children}
        </main>
        {/* zero-height sentinel: the footer reads its reveal progress from this point in the flow */}
        <div id="footer-reveal-sentinel" aria-hidden="true" className="h-px w-full" />
        <Footer />
      </body>
    </html>
  );
}
