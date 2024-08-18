import './globals.css';
import { type Metadata } from 'next';
import { Mulish } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';
import Providers from '@/app/providers';
import PlausibleProvider from 'next-plausible';
import { env } from '@/env';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <PlausibleProvider
          domain={env.APP_URL}
          enabled={true}
          selfHosted={true}
          scriptProps={{ 'data-api': env.PLAUSIBLE_URL } as any}
        />
      </head>
      <body className={cn(mulish.className, 'min-h-screen bg-background')}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <div className="m-auto max-w-[1336px]">{children}</div>
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
