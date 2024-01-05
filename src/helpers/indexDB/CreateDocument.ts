import useDocumentsStore from "@/stores/DocumentsStore"
import { openDB } from "idb"



const CreateDocument = async (title: string) => {
    const addDocument = useDocumentsStore.getState().addDocument

    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs")

    const item = {
        id: new Date().getTime().toString(),
        title: title,
        content: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const document = await store.put(item)
    const res = await store.get(document)

    addDocument(res)
}

export default CreateDocument