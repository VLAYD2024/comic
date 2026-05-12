import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'SakhaTale — сборник комиксов',
  description: 'Лёгкий быстрый сборник комиксов с тегами и перелистыванием.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen halftone">
        <header className="border-b border-ink/10 bg-paper/70 backdrop-blur sticky top-0 z-20">
          <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-3xl tracking-tight font-bold leading-none"
            >
              <span className="text-ink">Sakha</span>
              <span className="text-accent">Tale</span>
            </Link>
            <nav className="text-sm text-ink/70 flex gap-5">
              <Link href="/" className="hover:text-ink transition">
                Каталог
              </Link>
              <Link href="/admin" className="hover:text-ink transition">
                Админка
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-5 py-10 text-xs text-ink/40">
          Демо · Next.js + Tailwind
        </footer>
      </body>
    </html>
  );
}
