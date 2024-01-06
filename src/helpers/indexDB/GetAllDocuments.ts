import useDocumentsStore from "@/stores/DocumentsStore"
import { openDB } from "idb"


const GetAllDocuments = async () => {
    const setDocuments = useDocumentsStore.getState().setDocuments

    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs")

    const documents = await (await store.getAll()).sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
    setDocuments(documents)
}

export default GetAllDocuments