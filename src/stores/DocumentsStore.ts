import { create } from "zustand"

interface DocumentsStoreType {
    documents: docType[]
    setDocuments: (value: docType[]) => void

    addDocument: (value: docType) => void
    removeDocument: (id: string) => void

    toolbarOptions: {
        bold: boolean
        italic: boolean
        underline: boolean
        strike: boolean
    }

    updateToolbarOptions: (item: allowedToolbarOptions, value: boolean) => void
}

const useDocumentsStore = create<DocumentsStoreType>((set, get) => ({
    documents: [],
    setDocuments: (value: docType[]) => set({ documents: value }),

    addDocument: (value: docType) => set({ documents: [value, ...get().documents] }),
    removeDocument: (id: string) => set({ documents: get().documents.filter((doc) => doc.id !== id) }),

    toolbarOptions: {
        bold: false,
        italic: false,
        underline: false,
        strike: false,
    },

    updateToolbarOptions: (item: allowedToolbarOptions, value: boolean) =>
        set({
            toolbarOptions: {
                ...get().toolbarOptions, [item]: value
            }
        })
}))

export default useDocumentsStore;