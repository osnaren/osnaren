import { SiteChrome } from '@/components/site/site-chrome';
import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://osnaren.com'),
  title: {
    default: 'Obuli Sai Naren | Frontend systems and useful tools',
    template: '%s | Obuli Sai Naren',
  },
  description:
    'Portfolio of Obuli Sai Naren, a frontend web developer building React ecommerce experiences, product tools, and useful side projects.',
  openGraph: {
    title: 'Obuli Sai Naren | Frontend systems and useful tools',
    description:
      'React ecommerce work, product lab projects, academic notes, and story-driven portfolio of Obuli Sai Naren.',
    url: 'https://osnaren.com',
    siteName: 'osnaren',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-title" content="OS" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
