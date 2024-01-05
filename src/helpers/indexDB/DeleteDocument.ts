import useDocumentsStore from "@/stores/DocumentsStore"
import { openDB } from "idb"


const DeleteDocument = async (id: string) => {
    const removeDocument = useDocumentsStore.getState().removeDocument

    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs")

    const documents = await store.delete(id)
    removeDocument(id)
}

export default DeleteDocument