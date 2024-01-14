"use client"

import { motion } from 'framer-motion'
import Editor from '@/components/Editor'
import FileHeader from '@/components/FileHeader'
import Toolbar from '@/components/Toolbar'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import GetDocumentById from '@/helpers/indexDB/GetDocumentById'
import { JSONContent } from '@tiptap/react'
import { Loader2 } from 'lucide-react'

function Page() {
    const params = useParams()
    const id = params.id

    const [content, setContent] = useState<JSONContent | undefined>(undefined)
    const [docData, setDocData] = useState<docType | null | undefined>(undefined)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await GetDocumentById(id.toString()).then(res => {
            if (!res) return setDocData(null)
            setDocData(res)
            setContent(res.content)
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex flex-col'
        >
            <FileHeader docData={docData} />
            <Toolbar />

            {content ? (
                <Editor content={content} initialData={docData} />
            ) : (
                <div className='h-full flex items-center justify-center text-gray-400'>
                    {docData ? (
                        <Loader2 className='animate-spin' strokeWidth={1.5} />
                    ) : (
                        <div className='text-center'>
                            <p className='animate-bounce'>404</p>
                            <p>Document not found</p>
                        </div>
                    )}
                </div>
            )}

        </motion.div>
    )
}

export default Page