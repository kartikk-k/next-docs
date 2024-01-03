import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import InitialContent from '../data/initialData.json'

function Editor() {

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        autofocus: true,
        content: InitialContent
    })



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