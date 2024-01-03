import useDbStore from "@/stores/DbStore"
import useDocumentsStore from "@/stores/DocumentsStore"


const GetAllDocuments = async () => {
    const Database = useDbStore.getState().database
    const setDocuments = useDocumentsStore.getState().setDocuments

    if (!Database?.name) throw new Error("Database not initialized")
    console.log("Getting all documents from database...")
    const documents = await Database.getAll()
    setDocuments(documents)
}

export default GetAllDocuments