import { Barriecito } from 'next/font/google'

// viewport width at which header collapses
export const MOBILE_MENU_THRESHOLD = 500

// further collapse mobile menu to colums on tiny devices
export const MOBILE_DEVICE_SM = 360

// fonts
export const myBarricieto = Barriecito({
	weight: '400',
	style: 'normal',
	subsets: ['latin'],
	display: 'swap',
})

export const BarricietoFontClass = myBarricieto.className
