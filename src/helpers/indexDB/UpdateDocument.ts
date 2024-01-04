import { JSONContent } from "@tiptap/react"
import { openDB } from "idb"


const UpdateDocument = async (doc: docType | undefined) => {
    console.log("UpdateDocument", doc)
    if (!doc) return
    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs")

    // update existing document
    await store.put(doc, doc.id)
}

export default UpdateDocument