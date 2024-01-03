import { openDB } from 'idb';
import useDbStore from "@/stores/DbStore";
import useDocumentsStore from "@/stores/DocumentsStore";

// for the database / indexedDB
const setDatabase = useDbStore.getState().setDatabase
const Database = useDbStore.getState().database

// for the documents
const setDocuments = useDocumentsStore.getState().setDocuments

const InitializeDB = async () => {
    const db = await openDB('NEXT-Docs-DB', 1, {
        upgrade(database, oldVersion, newVersion, transaction, event) {
            const store = database.createObjectStore("Docs", { keyPath: "id" })

            store.createIndex("title", "title", { unique: false })
            store.createIndex("content", "content", { unique: false })
            store.createIndex("createdAt", "createdAt", { unique: false })
            store.createIndex("updatedAt", "updatedAt", { unique: false })
            store.createIndex("shareUrl", "shareUrl", { unique: true })
        },
    })

    const store = db.transaction("Docs", "readwrite").objectStore("Docs")
    console.log(await store.getAll())
}

export default InitializeDB;