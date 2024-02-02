"use client"

import { motion } from 'framer-motion'
import Editor from '@/components/Editor'
import FileHeader from '@/components/FileHeader'
import Toolbar from '@/components/Toolbar'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import GetDocumentById from '@/helpers/indexDB/GetDocumentById'
import { JSONContent } from '@tiptap/react'
import { Loader2, MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'
import useDebounce from '@/components/hooks/useDebounce'
import UpdateDocument from '@/helpers/indexDB/UpdateDocument'

function Page() {
    const params = useParams()
    const id = params.id

    const [initialContent, setInitialContent] = useState<JSONContent | undefined>(undefined)
    const [docData, setDocData] = useState<docType | null | undefined>(undefined)
    const debouncedDocData = useDebounce(docData, 200)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await GetDocumentById(id.toString()).then(res => {
            if (!res) return setDocData(null)
            setDocData(res)
            setInitialContent(res.content)
        })
    }

    useEffect(() => {
        updateContentInDb()
    }, [debouncedDocData])

    const updateContentInDb = () => {
        UpdateDocument(debouncedDocData as docType)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            {initialContent ? (
                <div className='flex flex-col'>
                    <FileHeader
                        // @ts-ignore
                        onChange={(title: string) => { setDocData({ ...docData, title }) }}
                        docData={docData}
                    />
                    <Toolbar />
                    <Editor
                        // @ts-ignore
                        onChange={val => setDocData({ ...docData, content: val })}
                        initialContent={initialContent}
                        initialData={docData}
                    />
                </div>

            ) : (
                <div className='h-screen flex items-center justify-center text-gray-400'>
                    {docData ? (
                        <Loader2 className='animate-spin' strokeWidth={1.5} />
                    ) : (
                        <div className='text-center py-10'>
                            <p className='animate-bounce'>404</p>
                            <p>Document not found</p>

                            <Link href='/' className='text-primary underline flex justify-center items-center gap-2 py-6'>
                                {/* <MoveLeftIcon size={18} /> */}
                                <span>Back to home</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}

        </motion.div>
    )
}

export default Page