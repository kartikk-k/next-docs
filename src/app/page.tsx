"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import useDbStore from "@/stores/DbStore"
import GetAllDocuments from "@/helpers/indexDB/GetAllDocuments"
import useDocumentsStore from "@/stores/DocumentsStore"
import CreateDocument from "@/helpers/indexDB/CreateDocument"
import Link from "next/link"

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
      <main className="">
        <div className="flex gap-12">
          <h1>This is home page</h1>
          <button onClick={handleClick}>add</button>
        </div>
        {documents.map(doc => (
          <Link
            href={`/file/${doc.id}`}
            key={doc.id}
            className="block"
          >
            {doc.title}
          </Link>
        ))}
      </main>
    </motion.div>
  )
}
