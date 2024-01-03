"use client"

import { motion } from "framer-motion"
import useDocumentsStore from "@/stores/DocumentsStore"
import { useEffect } from "react"

export default function Home() {

  // const documents = useDocumentsStore(state => state.documents)

  // useEffect(() => {
  //   console.log(documents)
  // }, [documents])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <main className="h-32 bg-gray-200 text-black">
        <h1>This is home page</h1>
        {/* {documents.map(doc => (
          <p>{doc.title}</p>
        ))} */}
      </main>
    </motion.div>
  )
}
