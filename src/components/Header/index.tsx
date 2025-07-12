"use client";
import clsx from 'clsx'
import ThemeSlider from "../Theme/ThemeSlider";

export default function Header() {    
    return (
        <header
        className="fixed top-0 left-0 z-50 bg-black/50
                w-screen h-16 flex flex-row items-center justify-between
                px-8 py-2"
        >   
            {/* Left side navigation buttons */}
            <div className="flex flex-row gap-8 h-full w-auto items-center">
                <button className={clsx(
                    'cursor-pointer min-w-16 h-8 rounded-lg text-imdb border-2 border-imdb'
                )}
                >
                    home
                </button>
                <button className={clsx(
                    'cursor-pointer min-w-16 h-8 rounded-lg text-imdb border-2 border-imdb'
                )}
                >
                    about
                </button>
            </div>
            {/* Right side search and theme controls */}
            <div className='flex flex-row gap-8'>
                <form action="/api/v1/cells" onSubmit={ () => {}}>
                    <button
                    type='submit'
                    className={clsx(
                        'cursor-pointer min-w-16 h-8 rounded-lg text-imdb border-2 border-imdb'
                    )}
                    >
                        search
                    </button>
                    <input
                        type='text'
                        className='w-64 h-8 ml-4 px-2 rounded-lg border border-imdb
                        focus:outline-none focus:ring-2 focus:ring-imdb focus:bg-imdb/25'/>
                </form>
                <ThemeSlider />
            </div>
        </header>
    );
}
