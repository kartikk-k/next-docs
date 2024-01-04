import React, { useEffect } from 'react'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import InitialContent from '../data/initialData.json'
import UpdateDocument from '@/helpers/indexDB/UpdateDocument'
import GetDocumentById from '@/helpers/indexDB/GetDocumentById'
import { useParams } from 'next/navigation'

function Editor() {

    const [content, setContent] = React.useState<JSONContent>({})
    const [docData, setDocData] = React.useState<docType>()

    const params = useParams()
    const id = params.id

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        // @ts-ignore
        await GetDocumentById(id).then(res => {
            console.log(res)
            setDocData(res)
        })
    }

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        autofocus: true,
        content: content,
        onUpdate: (data => {
            console.log(data.editor.getJSON())
            handleContent()
        })
    })

    const handleContent = () => {
        UpdateDocument(docData)
    }


    return (
        <div className='p-4 md:p-6 lg:p-8'>
            <EditorContent
                editor={editor}
                className='max-w-4xl'
            />
        </div>
    )
}

export default Editor