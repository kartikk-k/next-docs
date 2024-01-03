import { create } from "zustand"

interface DocumentsStoreType {
    documents: docType[]
    setDocuments: (value: docType[]) => void
}

const useDocumentsStore = create<DocumentsStoreType>((set, get) => ({
    documents: [],
    setDocuments: (value: docType[]) => set({ documents: value })
}))

export default useDocumentsStore;