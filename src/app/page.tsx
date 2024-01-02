"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CreateDocument, GetAllDocuments } from "@/helpers/indexDB"

export default function Home() {

  const [documents, setDocuments] = useState<docType[]>([])

  // useEffect(() => {
  //   const data = GetAllDocuments()
  //   if (data instanceof Error) {

  //   } else setDocuments(data)
  // }, [])

  // useEffect(() => {

  //   CreateDocument("useMemo")
  //   CreateDocument("useContext")
  //   CreateDocument("useState")
  // }, [])

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
