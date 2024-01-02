let Store: IDBObjectStore | null = null;

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
    const promise = new Promise((resolve, reject) => {
        openDB.onsuccess = function () {
            const database = openDB.result
            const transaction = database.transaction("Docs", "readwrite")
            Store = transaction.objectStore("Docs")
            resolve(true)
        }
    })
}

const CreateDocument = (title: string) => {
    if (!Store) return new Error("Store is not initialized")

    const newDoc: docType = {
        id: new Date().getTime().toString(),
        title: title,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    Store.put(newDoc)
}

const GetAllDocuments = () => {
    if (!Store) return new Error("Store is not initialized")

    const docs = Store.getAll()
    let result: docType[] = []

    docs.onerror = function () {
        return new Error("Error getting the item")
    }

    docs.onsuccess = function () {
        result = docs.result
    }

    return result
}

const GetDocument = (id: string) => {
    if (!Store) return new Error("Store is not initialized")

    const doc = Store.get(id)
    doc.onsuccess = function () {
        return doc.result
    }
    doc.onerror = function () {
        return new Error("Error getting the item")
    }
}

const UpdateDocument = (id: string, title: string, content: string) => {
    if (!Store) return new Error("Store is not initialized")

    const doc = Store.get(id)
    doc.onsuccess = function () {
        const docToUpdate = doc.result
        docToUpdate.title = title
        docToUpdate.content = content
        docToUpdate.updatedAt = new Date()
        Store!.put(docToUpdate)
    }
    doc.onerror = function () {
        return new Error("Error getting the item")
    }
}

const DeleteDocument = (id: string) => {
    if (!Store) return new Error("Store is not initialized")
    Store.delete(id)
}


export default InitializeDB;
export { CreateDocument, GetAllDocuments, GetDocument, UpdateDocument, DeleteDocument };