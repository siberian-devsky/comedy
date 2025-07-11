"use client";
import clsx from 'clsx'
import ThemeSlider from "../Theme/ThemeSlider";

export default function Header() {    
    return (
        <header
        className="fixed top-0 left-0 z-50 bg-transparent
                w-screen h-16 flex flex-row items-center justify-between
                px-8 py-2"
        >   
            <div className="flex flex-row gap-8 h-full w-auto items-center">
                <button className={clsx(
                    'cursor-pointer min-w-16 h-8 text-imdb rounded-lg'
                )}
                >
                    filler
                </button>
                <button className={clsx(
                    'cursor-pointer min-w-16 h-8 text-imdb rounded-lg'
                )}
                >
                    filler
                </button>
                <button className={clsx(
                    'cursor-pointer min-w-16 h-8 text-imdb rounded-lg'
                )}
                >
                    filler
                </button>
            </div>
            <ThemeSlider />
        </header>
    );
}
