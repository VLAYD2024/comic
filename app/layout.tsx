import type { Metadata } from 'next';
import Link from 'next/link';
import { LangSwitcher } from '@/components/LangSwitcher';
import { dictionaries } from '@/i18n/dictionaries';
import { LocaleProvider } from '@/i18n/client';
import { getLocale } from '@/i18n/server';
import './globals.css';

export const metadata: Metadata = {
  title: 'SakhaTale',
  description: 'SakhaTale — comic collection with tags and a flipping reader.'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const dict = dictionaries[locale];

  return (
    <html lang={locale}>
      <body className="min-h-screen halftone">
        <LocaleProvider locale={locale} dict={dict}>
          <header className="border-b border-ink/10 bg-paper/70 backdrop-blur sticky top-0 z-20">
            <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
              <Link
                href="/"
                className="font-display text-3xl tracking-tight font-bold leading-none shrink-0"
              >
                <span className="text-ink">Sakha</span>
                <span className="text-accent">Tale</span>
              </Link>
              <nav className="text-sm text-ink/70 flex items-center gap-4 md:gap-5">
                <Link href="/" className="hover:text-ink transition">
                  {dict['header.catalog']}
                </Link>
                <Link href="/admin" className="hover:text-ink transition">
                  {dict['header.admin']}
                </Link>
                <LangSwitcher />
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
          <footer className="mx-auto max-w-6xl px-5 py-10 text-xs text-ink/40">
            {dict['footer.demo']}
          </footer>
        </LocaleProvider>
      </body>
    </html>
  );
}
