"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import useDbStore from "@/stores/DbStore"
import GetAllDocuments from "@/helpers/indexDB/GetAllDocuments"
import useDocumentsStore from "@/stores/DocumentsStore"

export default function Home() {

  const database = useDbStore(state => state.database)
  const documents = useDocumentsStore(state => state.documents)

  // const [documents, setDocuments] = useState<docType[]>([])

  useEffect(() => {
    // if (database?.name) getDocuments()
    if (database?.name) GetAllDocuments()
  }, [database])

  // const getDocuments = async () => {
  //   await GetAllDocuments().then((res) => {

  //   }).catch((err) => {
  //     console.error(err)
  //   })

  // }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <main className="h-32 bg-gray-200 text-black">
        <h1>This is home page</h1>
        {documents.map(doc => (
          <p>{doc.title}</p>
        ))}
      </main>
    </motion.div>
  )
}
