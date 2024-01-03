import { openDB } from "idb";
import useDbStore from "@/stores/DbStore";


const InitializeDB = async () => {
    const setDatabase = useDbStore.getState().setDatabase

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
    setDatabase(store)
}



export default InitializeDB;
