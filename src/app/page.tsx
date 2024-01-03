"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import useDbStore from "@/stores/DbStore"
import GetAllDocuments from "@/helpers/indexDB/GetAllDocuments"
import useDocumentsStore from "@/stores/DocumentsStore"
import CreateDocument from "@/helpers/indexDB/CreateDocument"

export default function Home() {

  const isInitialized = useDbStore(state => state.isInitialized)
  const documents = useDocumentsStore(state => state.documents)

  useEffect(() => {
    if (isInitialized) GetAllDocuments()
  }, [isInitialized])

  const handleClick = () => {
    CreateDocument("Untitled")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <main className="h-32 bg-gray-200 text-black">
        <h1>This is home page</h1>
        {documents.map(doc => (
          <p key={doc.id}>{doc.title}</p>
        ))}
        <button onClick={handleClick}>add</button>
      </main>
    </motion.div>
  )
}
