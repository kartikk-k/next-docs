"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import useDbStore from "@/stores/DbStore"
import GetAllDocuments from "@/helpers/indexDB/GetAllDocuments"
import useDocumentsStore from "@/stores/DocumentsStore"
import CreateDocument from "@/helpers/indexDB/CreateDocument"
import Link from "next/link"
import Image from "next/image"
import Logo from './logo.svg'
import { ArrowRight, Trash } from "lucide-react"
import DeleteDocument from "@/helpers/indexDB/DeleteDocument"
import moment from "moment"

export default function Home() {

  const isInitialized = useDbStore(state => state.isInitialized)
  const documents = useDocumentsStore(state => state.documents)

  useEffect(() => {
    if (isInitialized) GetAllDocuments()
  }, [isInitialized])

  const handleClick = () => {
    CreateDocument("Untitled")
  }


  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    await DeleteDocument(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center flex-col min-h-screen py-12"
    >
      <main className="space-y-8 w-full sm:w-auto p-4">
        {/* header */}
        <div className="text-gray-700 font-semibold text-lg space-y-2 flex flex-col items-center">
          <Image src={Logo} alt="next-docs" width={62} height={62} />
          <h1>Next Docs</h1>
        </div>

        <button onClick={handleClick} className="bg-gray-200 flex items-center gap-1 rounded-xl mx-auto text-gray-500 text-sm p-2 px-4">
          Create new document
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>

        <div className="space-y-2">
          <p className="text-xs text-gray-400 text-center">Open existing document</p>

          {/* list of docs */}
          {documents.length > 0 && (
            <div className="py-2 px-4 space-y-4 rounded-xl bg-gray-100 sm:min-w-96">
              {documents.map(doc => (
                <motion.div
                  layout
                  key={doc.id}
                  className={"py-2"}
                >
                  <Link href={`/file/${doc.id}`}>
                    <div className="flex items-center w-full text-gray-700 font-medium justify-between">
                      <div>
                        <p className="text-sm">{doc.title}</p>
                        {/* <p className="text-xs text-gray-500">a day ago</p> */}
                        <p className="text-xs text-gray-500">{moment(doc.updatedAt).fromNow()}</p>
                      </div>

                      <div>
                        <button onClick={e => handleDelete(e, doc.id)} className="text-gray-500">
                          <Trash size={18} />
                        </button>
                        {/* <button className="py-1.5 px-3 rounded-lg bg-gray-200 text-gray-600 font-semibold text-sm">Open</button> */}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* creator */}
      <Link
        target="_blank"
        href="https://github.com/kartikk-k"
        className="fixed text-xs top-2 right-2  rounded-md text-gray-400 font-medium"
      >
        Created by&nbsp;
        <span className="text-gray-600 underline">
          Kartik
        </span>
      </Link>

    </motion.div>
  )
}
