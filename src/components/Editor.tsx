import React, { useEffect } from 'react'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import InitialContent from '../data/initialData.json'
import UpdateDocument from '@/helpers/indexDB/UpdateDocument'
import GetDocumentById from '@/helpers/indexDB/GetDocumentById'
import { useParams } from 'next/navigation'
import useDebounce from './hooks/useDebounce'
import { Loader2 } from 'lucide-react'


interface props {
    content: JSONContent | undefined,
    initialData: any
}

function Editor({ content, initialData }: props) {

    const [docData, setDocData] = React.useState<any>(initialData)
    const debouncedDocData = useDebounce(docData, 1000)

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
            <EditorContent
                editor={editor}
                className='max-w-4xl h-full'
            />
        </div>
    )
}

export default Editor