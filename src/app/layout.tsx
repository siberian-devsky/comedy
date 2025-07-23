import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import KeyHandler from '@/components/Theme/ThemeToggleHotkeyHandler'
import { ComicContextProvider } from '@/context/ComicContext'
import { UiContextProvider } from '@/context/UiContext'
import './globals.css'

export const metadata: Metadata = {
	title: 'fffAnnny cooMMmmmics',
	icons: 'favicon.ico'
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className='max-w-screen flex flex-col items-center justify-center'>
				<ThemeProvider attribute='class'>
					<KeyHandler />
					<UiContextProvider>
						<ComicContextProvider>{children}</ComicContextProvider>
					</UiContextProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
