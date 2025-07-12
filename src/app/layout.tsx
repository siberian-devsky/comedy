import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import KeyHandler from '@/components/Theme/ThemeToggleHotkeyHandler';
import './globals.css';

export const metadata: Metadata = {
  title: "fffAnnny cooMMmmmics"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning> 
      <body className='max-w-screen overflow-x-hidden flex flex-col items-center justify-center'>
        <ThemeProvider attribute='class'>
          <KeyHandler />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}