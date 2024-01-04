import { openDB } from "idb"


const GetDocumentById = async (id: string) => {
    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs")

    const documents = await store.get(id)
    return documents
}

export default GetDocumentById