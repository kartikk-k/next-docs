import { create } from "zustand"


interface ToolbarStoreType {
    bold: boolean
    setBold: (bold: boolean) => void

    italic: boolean
    setItalic: (italic: boolean) => void

    underline: boolean
    setUnderline: (underline: boolean) => void

    strike: boolean
    setStrike: (strike: boolean) => void

    code: boolean
    setCode: (code: boolean) => void

    textAlign: 'left' | 'center' | 'right'
    setTextAlign: (textAlign: 'left' | 'center' | 'right') => void

    orderedList: boolean
    setOrderedList: (orderedList: boolean) => void

    unorderedList: boolean
    setUnorderedList: (unorderedList: boolean) => void

    link: string | null
    setLink: (link: string | null) => void
    previousLink: string | null
    setPreviousLink: (previousLink: string | null) => void

    blockType: blockType
    setBlockType: (blockType: blockType) => void
}

const useToolbarStore = create<ToolbarStoreType>((set, get) => ({
    bold: false,
    setBold: (bold: boolean) => set({ bold }),

    italic: false,
    setItalic: (italic: boolean) => set({ italic }),

    underline: false,
    setUnderline: (underline: boolean) => set({ underline }),

    strike: false,
    setStrike: (strike: boolean) => set({ strike }),

    code: false,
    setCode: (code: boolean) => set({ code }),

    textAlign: 'left',
    setTextAlign: (textAlign: 'left' | 'center' | 'right') => set({ textAlign }),

    orderedList: false,
    setOrderedList: (orderedList: boolean) => set({ orderedList }),

    unorderedList: false,
    setUnorderedList: (unorderedList: boolean) => set({ unorderedList }),

    link: null,
    setLink: (link: string | null) => set({ link }),
    previousLink: null,
    setPreviousLink: (previousLink: string | null) => set({ previousLink }),

    blockType: 'paragraph',
    setBlockType: (blockType: blockType) => set({ blockType })
}))

export default useToolbarStore;