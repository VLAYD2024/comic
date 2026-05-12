import { NextRequest, NextResponse } from 'next/server';
import { locales, type Locale } from '@/i18n/dictionaries';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { locale?: Locale };
  if (!body.locale || !locales.includes(body.locale)) {
    return NextResponse.json({ error: 'invalid locale' }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true, locale: body.locale });
  res.cookies.set('locale', body.locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  });
  return res;
}
