import { CellModalProps } from "@/types"

type CloseButtonProps = Pick<CellModalProps, 'setShowModal'>

export default function CloseButton({ setShowModal }: CloseButtonProps) {
    return (
        <div className="min-w-20 absolute top-3 left-3 group flex flex-row gap-1 items-center ">
            <button
                className="w-6 h-6 bg-pink-500 text-black cursor-pointer
                           flex items-center justify-center opacity-80 rounded-full"
                onClick={() => setShowModal(false)}
            >
                X
            </button>
            <div
                className="text-xs text-pink-400 opacity-80"
            >
                esc
            </div>
        </div>
    )
}
