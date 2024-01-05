import React, { useEffect } from 'react'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import InitialContent from '../data/initialData.json'
import UpdateDocument from '@/helpers/indexDB/UpdateDocument'
import GetDocumentById from '@/helpers/indexDB/GetDocumentById'
import { useParams } from 'next/navigation'
import useDebounce from './hooks/useDebounce'
import { Loader2 } from 'lucide-react'

function Editor() {

    const [content, setContent] = React.useState<JSONContent | undefined>(undefined)
    const [docData, setDocData] = React.useState<any>()
    const debouncedDocData = useDebounce(docData, 1000)

    const params = useParams()
    const id = params.id

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

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        autofocus: true,
        content: content,
        onUpdate: (data => {
            handleContent(data.editor.getJSON())
        })
    })

    useEffect(() => {
        if (!content) return
        editor?.commands.setContent(content)
    }, [content])

    const handleContent = (content: JSONContent) => {
        setDocData({
            // @ts-ignore
            ...docData,
            content: content
        })
    }

    useEffect(() => {
        if (debouncedDocData) {
            UpdateDocument(debouncedDocData, 'content')
        }
    }, [debouncedDocData])

    return (
        <div className='p-4 md:p-6 lg:p-8 h-full pb-20'>
            {content ? (
                <EditorContent
                    editor={editor}
                    className='max-w-4xl h-full'
                />
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
        </div>
    )
}

export default Editor