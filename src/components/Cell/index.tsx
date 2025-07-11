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
        {'justify-end': !isCellIndexEven} // hack for getting alternating justification
        )}>
        <div
          id={id.toString()}
          className={clsx(
            'w-3/4 h-96 rounded-xl flex items-center transition-transform hover:scale-[0.98]',
            isCellIndexEven
                ? 'justify-start ps-6 bg-gradient-to-r border-l-4 border-l-imdb'
                : 'justify-end pe-6 bg-gradient-to-l border-r-4 border-r-imdb',
            isDarkMode
                // ? 'from-imdb via-80% via-[#121212] to-[#121212]'
                ? 'from-imdb via-80% via-transparent to-transparent'
                : 'from-imdb via-80% via-transparent to-transparent'
          )}
        >
          <button
            onClick={selectCellAndShowModal}
            className="
                px-4 py-2 rounded-md font-extrabold text-slate-800 bg-imdb shadow
                transition-transform hover:scale-[1.02] cursor-pointer"
          >
            {name}
          </button>
        </div>
    </div>
  )
}
