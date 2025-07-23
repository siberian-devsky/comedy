'use client'

import{
    createContext,
    useContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    ReactNode
} from 'react'

import { MOBILE_MENU_THRESHOLD } from '@/lib/config'

type UiContextType = {
    deviceIsMobile: boolean
    setDeviceIsMobile: Dispatch<SetStateAction<boolean>>
    mobileMenuIsOpen: boolean
    setMobileMenuIsOpen: Dispatch<SetStateAction<boolean>>
    sidebarIsOpen: boolean
    setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
    viewportWidth: number
}

const UiContext = createContext<UiContextType | undefined>(undefined)

export function UiContextProvider({ children }: { children: ReactNode }) {
    const [viewportWidth, setViewportWidth] = useState(
		MOBILE_MENU_THRESHOLD + 1
	) // default to desktop
	const [deviceIsMobile, setDeviceIsMobile] = useState(false) 
	const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false) 
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

    // master event handler for responsiveness
    useEffect(() => {
        window.addEventListener('resize', onViewportChange)
        onViewportChange()

        function onViewportChange() {
            const measuredViewportWidth = window.innerWidth
            setViewportWidth(measuredViewportWidth)

            //! this should only be set here
            setDeviceIsMobile(viewportWidth < MOBILE_MENU_THRESHOLD)
            setSidebarIsOpen(viewportWidth > MOBILE_MENU_THRESHOLD)
            console.log(deviceIsMobile, sidebarIsOpen)
        }

        return () => {
            window.removeEventListener('resize', onViewportChange)
        }
    }, [viewportWidth, deviceIsMobile, sidebarIsOpen])

    return (
        <UiContext.Provider
            value={{
                deviceIsMobile,
                setDeviceIsMobile,  
                mobileMenuIsOpen,   
                setMobileMenuIsOpen,    
                sidebarIsOpen,  
                setSidebarIsOpen,
                viewportWidth
            }}  
        >
            {children}
        </UiContext.Provider>
    )
}

export function useUiContext() {
    const context = useContext(UiContext)
    if (!context) {
        throw new Error('useUiContext must be used with this app')
    }
    return context
}