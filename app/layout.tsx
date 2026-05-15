import './globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import React from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kercson G. Didal | Portfolio",
  description: 'Information Technology Graduate specializing in full-stack web development and high-fidelity interfaces.',
  icons: {
    icon: [
      { url: '/icon.png', sizes: 'any', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* Favicon */}
        <link
          rel="icon"
          href="/icon.png"
          type="image/png"
          sizes="any"
        />
        <link
          rel="alternate icon"
          href="/favicon.ico"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/icon.png"
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
