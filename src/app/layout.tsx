import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '@/styles/style.css';

const geistSans = localFont({
  src: '/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  openGraph: {
    type: 'website',
    url: 'https://bodyguide.co.kr/',
    title: '바디가이드',
    description: '운동인을 위한 스포츠 영양 분석 서비스',
    siteName: '바디가이드',
    images: [
      {
        url: '/icon.png',
      },
    ],
  },
  title: '바디가이드',
  description: '운동인을 위한 스포츠 영양 분석 서비스',
  icons: {
    icon: '/icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: '바디가이드',
    description: '운동인을 위한 스포츠 영양 분석 서비스',
    images: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
