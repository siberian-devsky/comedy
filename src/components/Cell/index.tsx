'use client'
import clsx from 'clsx'

export default function Cell({
  id,
  name,
  isDarkMode,
  selectCellAndShowModal,
}: {
  id: number
  name: string
  isDarkMode: boolean
  isCellIndexEven: boolean
  selectCellAndShowModal: () => void
}) {
  return (
    <div
      id={id.toString()}
      className={clsx(
        'w-full h-64 rounded-xl flex items-center justify-center',
        'transition-transform hover:scale-[0.98]',
        'mx-2 shadow-sm',
        isDarkMode ? 'shadow-icdb' : 'shadow-slate-800'
      )}
    >
      <button
        onClick={selectCellAndShowModal} // Handle cell selection
        className="
            px-3 sm:px-4 py-2 rounded-md font-extrabold text-slate-800 bg-icdb shadow
            transition-transform hover:scale-[1.02] cursor-pointer
            text-sm sm:text-base md:text-lg" // Responsive text sizing
      >
        {name}
      </button>
    </div>
  )
}
