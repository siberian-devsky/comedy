'use client'
import clsx from 'clsx'

export default function Cell({
  id,
  name,
  isDarkMode,
  isCellIndexEven,
  selectCellAndShowModal,
}: {
  id: number
  name: string
  isDarkMode: boolean
  isCellIndexEven: boolean
  selectCellAndShowModal: () => void
}) {
  return (
    <div className={clsx(
        'w-full h-full flex flex-row items-center',
        {'justify-end': !isCellIndexEven} // Alternate left/right alignment for visual variety
        )}>
        <div
          id={id.toString()}
          className={clsx(
            'w-full sm:w-4/5 md:w-3/4 h-64 sm:h-80 md:h-96 rounded-xl flex items-center transition-transform hover:scale-[0.98]', // Responsive sizing with hover effect
            'mx-4 sm:mx-8 md:mx-0', // Responsive margins
            isCellIndexEven
                ? 'justify-start ps-4 sm:ps-6 bg-gradient-to-r border-l-4 border-l-imdb' // Left-aligned with right gradient
                : 'justify-end pe-4 sm:pe-6 bg-gradient-to-l border-r-4 border-r-imdb', // Right-aligned with left gradient
            isDarkMode
                ? 'from-imdb via-80% via-transparent to-transparent' // Dark mode gradient
                : 'from-imdb via-80% via-transparent to-transparent' // Light mode gradient
          )}
        >
          <button
            onClick={selectCellAndShowModal} // Handle cell selection
            className="
                px-3 sm:px-4 py-2 rounded-md font-extrabold text-slate-800 bg-imdb shadow
                transition-transform hover:scale-[1.02] cursor-pointer
                text-sm sm:text-base md:text-lg" // Responsive text sizing
          >
            {name}
          </button>
        </div>
    </div>
  )
}
