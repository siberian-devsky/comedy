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
    <div
      id={id.toString()}
      className={clsx(
        'w-3/4 h-96 rounded-xl flex items-center',
        isCellIndexEven
            ? 'justify-start ps-6 bg-gradient-to-r border-l-4 border-l-imdb'
            : 'justify-end pe-6 bg-gradient-to-l border-r-4 border-r-imdb translate-x-1/4',
        isDarkMode
            ? 'from-black to-imdb'
            : 'from-imdb to-black'
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
  )
}
