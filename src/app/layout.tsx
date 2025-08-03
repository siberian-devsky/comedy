import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import KeyHandler from '@/components/Theme/ThemeToggleHotkeyHandler'
import { ComicContextProvider } from '@/context/ComicContext'
import { UiContextProvider } from '@/context/UiContext'
import Header from '@/components/Header'
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
			<body className='max-w-screen h-screen flex flex-col items-center justify-center'>
				<ThemeProvider attribute='class'>
					<KeyHandler />
					<UiContextProvider>
						<ComicContextProvider>
							<header className='fixed top-0 left-0 w-full h-16 z-50'>
								<Header />
							</header>
							<main className='w-screen h-full mt-16 overflow-auto'>
								{children}
							</main>
						</ComicContextProvider>
					</UiContextProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}