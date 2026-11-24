import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Spectral } from 'next/font/google';
import './globals.css';
import { SpaDemoProvider } from '@/lib/demo-store';
import ThemePaletteSwitcher from '@/components/layout/ThemePaletteSwitcher';

const spectral = Spectral({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mai Đinh Spa | Chăm Sóc Da Chuyên Sâu & Trị Liệu Dưỡng Sinh',
    template: '%s | Mai Đinh Spa',
  },
  description:
    'Không gian chăm sóc da chuẩn y khoa, gội đầu dưỡng sinh thảo mộc và trị liệu cổ vai gáy tại Mai Đinh Spa. Đặt lịch giữ chỗ miễn phí & tích điểm hạng thành viên thân thiết.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${spectral.variable} ${beVietnamPro.variable}`}>
      <body className="min-h-screen antialiased">
        <SpaDemoProvider>
          {children}
          <ThemePaletteSwitcher />
        </SpaDemoProvider>
      </body>
    </html>
  );
}
