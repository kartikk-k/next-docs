import { openDB } from "idb"


const UpdateDocument = async (doc: docType) => {
    if (!doc) return
    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs",)

    await store.put({
        ...doc
    })
}

export default UpdateDocument