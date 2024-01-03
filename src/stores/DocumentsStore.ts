import { create } from "zustand"

interface DocumentsStoreType {
    documents: docType[]
    setDocuments: (value: docType[]) => void

    addDocument: (value: docType) => void
    removeDocument: (value: docType) => void
}

const useDocumentsStore = create<DocumentsStoreType>((set, get) => ({
    documents: [],
    setDocuments: (value: docType[]) => set({ documents: value }),

    addDocument: (value: docType) => set({ documents: [value, ...get().documents] }),
    removeDocument: (value: docType) => set({ documents: get().documents.filter((doc) => doc.id !== value.id) }),
}))

export default useDocumentsStore;