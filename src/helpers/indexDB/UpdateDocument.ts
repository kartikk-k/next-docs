import { openDB } from "idb"


const UpdateDocument = async (doc: docType | undefined, field: 'title' | 'content' | 'updatedAt' | 'shareUrl') => {
    if (!doc) return
    const db = await openDB('NEXT-Docs-DB')
    const store = db.transaction("Docs", "readwrite").objectStore("Docs",)

    await store.put({
        id: doc.id,
        content: doc.content,
        title: doc.title,
        createdAt: doc.createdAt,
        updatedAt: new Date(),
        shareUrl: doc.shareUrl,
    })
}

export default UpdateDocument