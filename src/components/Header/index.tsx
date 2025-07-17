"use client";
import ThemeSlider from "../Theme/ThemeSlider";
import ComicSearchForm from "./ComicSearchForm";
import { SetCellsProps } from "@/types";

export default function Header(
     { setCells }: SetCellsProps
) {    
    return (
        <header
        className="fixed top-0 left-0 z-50 bg-black/50
                w-screen h-16 flex flex-row items-center justify-between
                px-8 py-2 border-b-2 border-b-icdb"
        > 
            <ComicSearchForm setCells={setCells}/>
            <ThemeSlider />
        </header>
    );
}
