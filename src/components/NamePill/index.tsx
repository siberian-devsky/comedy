import { Comic } from "@/types"
import { useComicContext } from "@/context/ComicContext"
import clsx from 'clsx'

export default function NamePill( {comic}: {comic: Comic} ) {
    const {setonStage} = useComicContext()

    const handleClick = (comic: Comic) => {
        setonStage(comic)
        sessionStorage.setItem('latest', JSON.stringify(comic))
    }

    return (
        <li className={clsx('flex flex-row cursor-pointer')}
            onClick={() => handleClick(comic)}
        >
        	<span className={clsx('min-w-[75px] pr-[3px] text-slate-800 bg-pyellow pl-4 flex justify-end rounded-l-md')}>
        		{comic.firstName}
        	</span>
        	<span className={clsx('min-w-[75px] pl-[3px] text-pyellow bg-slate-800 pr-4 rounded-r-md')}>
        		{comic.lastName}
        	</span>
        </li>
    )
}