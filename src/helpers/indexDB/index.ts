import useDbStore from "@/stores/DbStore";
import useDocumentsStore from "@/stores/DocumentsStore";

// for the database / indexedDB
const setDatabase = useDbStore.getState().setDatabase
const Database = useDbStore.getState().database

// for the documents
const setDocuments = useDocumentsStore.getState().setDocuments

const InitializeDB = async () => {
    console.log("Initializing DB")
    const indexDB =
        window.indexedDB ||
        // @ts-ignore
        window.mozIndexedDB ||
        // @ts-ignore
        window.webkitIndexedDB ||
        // @ts-ignore
        window.msIndexedDB ||
        // @ts-ignore
        window.shimIndexedDB;

    // opens the database; create it if it doesn't exist
    const openDB = indexDB.open("NEXT-Docs-DB", 1);

    // handle errors when opening/creating the database
    openDB.onerror = function (event) {
        return new Error("Error occurred when opening the database", { cause: event });
    }

    // runs when the database is created for the first time or when the version is updated
    openDB.onupgradeneeded = function () {
        const db = openDB.result
        const store = db.createObjectStore("Docs", { keyPath: "id" })

        store.createIndex("title", "title", { unique: false })
        store.createIndex("content", "content", { unique: false })
        store.createIndex("createdAt", "createdAt", { unique: false })
        store.createIndex("updatedAt", "updatedAt", { unique: false })
        store.createIndex("shareUrl", "shareUrl", { unique: true })
    }

    // runs when the database is opened successfully
    openDB.onsuccess = function () {
        const database = openDB.result
        const transaction = database.transaction("Docs", "readwrite")
        // update the store
        setDatabase(transaction.objectStore("Docs"))
    }
}

const CreateDocument = (title: string) => {
    if (!Database) return new Error("Store is not initialized")

    const newDoc: docType = {
        id: new Date().getTime().toString(),
        title: title,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    Database.put(newDoc)
}

const GetAllDocuments = () => {
    // if (Database === null) return console.log("Store is not initialized")
    console.log("Getting all documents")

    const docs = Database!.getAll()

    docs.onerror = function () {
        return console.log("Error getting the item")
    }

    docs.onsuccess = function () {
        setDocuments(docs.result)
    }
}

const GetDocument = (id: string) => {
    if (!Database) return new Error("Store is not initialized")

    const doc = Database.get(id)
    doc.onsuccess = function () {
        return doc.result
    }
    doc.onerror = function () {
        return new Error("Error getting the item")
    }
}

const UpdateDocument = (id: string, title: string, content: string) => {
    if (!Database) return new Error("Store is not initialized")

    const doc = Database.get(id)
    doc.onsuccess = function () {
        const docToUpdate = doc.result
        docToUpdate.title = title
        docToUpdate.content = content
        docToUpdate.updatedAt = new Date()
        Database!.put(docToUpdate)
    }
    doc.onerror = function () {
        return new Error("Error getting the item")
    }
}

const DeleteDocument = (id: string) => {
    if (!Database) return new Error("Store is not initialized")
    Database.delete(id)
}


export default InitializeDB;
export { CreateDocument, GetAllDocuments, GetDocument, UpdateDocument, DeleteDocument };