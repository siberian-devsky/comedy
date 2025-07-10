import React, { SetStateAction } from "react";
import clsx from "clsx";
import { CellData } from "@/types";

type buttonProps = {
    showDeleteBoxes: boolean;
    setShowDeleteBoxes: React.Dispatch<React.SetStateAction<boolean>>;
    numCellsChecked: number;
    resetAllCellStates: () => void;
    cellsToDelete: string[];
    setCells: React.Dispatch<SetStateAction<CellData[]>>
};

export default function AnimatedButton({
    showDeleteBoxes,
    setShowDeleteBoxes,
    numCellsChecked,
    resetAllCellStates,
    cellsToDelete,
    setCells
}: buttonProps) {
    function handleDeleteClick() {
        if (
            !cellsToDelete ||
            (cellsToDelete.length === 1 && cellsToDelete[0] === null) // only initialized
        ) {
            return;
        }

        const deleteCells = async () => {
            try {
                const resp = await fetch(
                    `http://localhost:8080/api/v1/cells/deletemany`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ data: cellsToDelete }),
                    }
                );
                
                const { data, message }: { data: string[], message: string } = await resp.json() // cells: string[]
                // filter data and rerender cells
                setCells( (prev) => prev.filter( (cell) => !data.includes(cell.name)) )

                console.log(data, message);
            } catch (err) {
                console.log(err);
            } finally {
                resetAllCellStates();
                //! this shouldn't at all be necessary. it ought to fit in reset func.
                setShowDeleteBoxes((prev) => !prev);
            }
        };
        deleteCells();
    }
    return (
        // two stacked buttons
        <div>
            <div className="relative">
                {/* mark for delete or cancel, depending on context */}
                <button
                    onClick={() => {
                        if (showDeleteBoxes) {
                            // If we're cancelling, reset all cell states
                            resetAllCellStates();
                        }
                        setShowDeleteBoxes((prev) => !prev);
                    }}
                    className={clsx(
                        "relative z-10 left-0 top-0 text-sm p-2 rounded-2xl border-white min-w-[120px] cursor-pointer",
                        {
                            "bg-white text-black": !showDeleteBoxes,
                            "bg-yellow-400 text-black": showDeleteBoxes,
                        }
                    )}
                >   
                    {showDeleteBoxes ? "Cancel" : "Mark Cells"}
                </button>
                {/* confirm delete */}
                <button
                    className={clsx(
                        "absolute left-0 top-0 min-w-[120px] text-sm p-2 rounded-2xl bg-red-500 cursor-pointer",
                        showDeleteBoxes 
                            && numCellsChecked > 0 
                            && "translate-x-[110%] duration-200 ease-linear",
                        showDeleteBoxes
                            && numCellsChecked === 0
                            && "trnaslate-x-0 duration-200 ease-in",
                        !showDeleteBoxes && "trnaslate-x-0 duration-200 ease-in"
                    )}
                    onClick={() => handleDeleteClick()}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}
