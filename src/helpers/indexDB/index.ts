import { openDB } from "idb";
import useDbStore from "@/stores/DbStore";


const InitializeDB = async () => {
    // const setDatabase = useDbStore.getState().setDatabase
    const setIsInitialized = useDbStore.getState().setIsInitialized

    const db = await openDB('NEXT-Docs-DB', 1, {
        upgrade(database, oldVersion, newVersion, transaction, event) {
            const store = database.createObjectStore("Docs", { keyPath: "id" })

            store.createIndex("title", "title")
            store.createIndex("content", "content")
            store.createIndex("createdAt", "createdAt")
            store.createIndex("updatedAt", "updatedAt")
            store.createIndex("shareUrl", "shareUrl")
        },
    })

    setIsInitialized(true)
}

export default InitializeDB;
