import useDocumentsStore from "@/stores/DocumentsStore"
import { openDB } from "idb"


const GetAllDocuments = async () => {
    const setDocuments = useDocumentsStore.getState().setDocuments

    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs")

    const documents = await store.getAll()
    setDocuments(documents)
}

export default GetAllDocuments