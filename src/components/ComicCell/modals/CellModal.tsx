import { SetStateAction } from 'react'
import { ComicData } from '@/types'
import CloseButton from './CloseButton'

type CellModalProps = {
	selectedComic: ComicData
	setShowModal: React.Dispatch<SetStateAction<boolean>>
}

export default function CellModal({
	selectedComic,
	setShowModal,
}: CellModalProps) {
	if (!selectedComic) return null // Don't render if no cell selected

	return (
		<div
			className='relative w-[280px] sm:w-[300px] md:w-[350px] h-[350px] sm:h-[400px] md:h-[450px] border-4 border-emerald-400 rounded-2xl
                bg-slate-800 flex flex-col items-center justify-center mx-4 sm:mx-0' // Responsive modal sizing
		>
			<CloseButton setShowModal={setShowModal} />
			{/* Form fields for editing cell data */}
			<div className='w-full flex flex-col items-center justify-center gap-3 sm:gap-4 grow-0 shrink-0 px-4 sm:px-6'>
				<h1 className='tracking-wider text-emerald-400 font-bold text-xl sm:text-2xl md:text-3xl text-center'>
					{selectedComic.name} {/* Display selected cell name */}
				</h1>
				<input
					defaultValue={selectedComic?.name} // Pre-fill with current name
					name='cellName'
					type='text'
					className='w-full sm:w-3/4 h-8 sm:h-10 border-[3px] px-3 sm:px-4 border-pink-800 rounded-full text-sm sm:text-base'
					placeholder='pick a number...'
				/>
				<input
					defaultValue={selectedComic?.hometown} // Pre-fill with current hometown
					name='icon'
					type='text'
					className='w-full sm:w-3/4 h-8 sm:h-10 border-[3px] px-3 sm:px-4 border-pink-800 rounded-full text-sm sm:text-base'
					placeholder='Add an icon or emoji'
				/>
				<input
					defaultValue={selectedComic?.imdbProfile} // Pre-fill with current icdb profile
					name='iconCode'
					type='text'
					className='w-full sm:w-3/4 h-8 sm:h-10 border-[3px] px-3 sm:px-4 border-pink-800 rounded-full text-sm sm:text-base'
					placeholder='Now add its code'
				/>
			</div>
		</div>
	)
}
