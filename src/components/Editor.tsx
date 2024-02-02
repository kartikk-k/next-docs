import React, { useEffect } from 'react'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UpdateDocument from '@/helpers/indexDB/UpdateDocument'
import useDebounce from './hooks/useDebounce'
import useToolbarStore from '@/stores/ToolbarStore'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import { BubbleMenu as BubbleMenuComponent } from '@tiptap/react'


interface props {
    initialContent: JSONContent | undefined,
    initialData: any
    onChange: (data: JSONContent) => void
}

function ContentEditor({ initialContent, initialData, onChange }: props) {
    const content = initialContent
    const { bold, setBold, italic, setItalic, underline, setUnderline, code, setCode, strike, setStrike, textAlign, setTextAlign, orderedList, setOrderedList, unorderedList, setUnorderedList, link, setPreviousLink, blockType, setBlockType }
        = useToolbarStore()

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Strike,
            Underline,
            Blockquote,
            Code,
            BulletList,
            OrderedList,
            ListItem,
            // BubbleMenu.configure({
            //     element: document.querySelector('.menu') as HTMLElement,
            // }),
            CodeBlock.configure({
                exitOnArrowDown: true,
                exitOnTripleEnter: true,
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            Link.configure({
                openOnClick: true,
                HTMLAttributes: {
                    class: 'custom-link',
                }, autolink: true
            }),
            TextAlign.configure({
                alignments: ['left', 'center', 'right'],
                defaultAlignment: 'center',
                types: ['heading', 'paragraph', 'blockquote', 'codeBlock', 'listItem']
            })
        ],
        autofocus: true,
        enableCoreExtensions: true,
        content: content,
        onUpdate: (data => {
            handleContent(data.editor.getJSON())
        })
    })

    const handleContent = (content: JSONContent) => {
        onChange(content)
    }

    useEffect(() => {
        if (!editor) return

        // basic formatting
        bold ? editor.commands.setBold() : editor.commands.unsetBold()
        italic ? editor.commands.setItalic() : editor.commands.unsetItalic()
        underline ? editor.commands.setUnderline() : editor.commands.unsetUnderline()
        strike ? editor.commands.setStrike() : editor.commands.unsetStrike()
        code ? editor.commands.setCode() : editor.commands.unsetCode()

        // text alignment
        editor.commands.setTextAlign(textAlign)

        // lists
        if (orderedList !== editor?.isActive('orderedList')) editor.commands.toggleOrderedList()
        else if (unorderedList !== editor?.isActive('bulletList')) editor.commands.toggleBulletList()

        if (link?.trim()) {
            editor.commands.setLink({ href: link })
        } else {
            editor.commands.unsetLink()
        }

    }, [bold, italic, underline, code, strike, textAlign, orderedList, unorderedList, link])

    useEffect(() => {
        if (!editor) return
        if (blockType === 'paragraph') editor.commands.setParagraph()
        else if (blockType === 'code_block') editor.commands.setCodeBlock()
        else if (blockType === 'heading_1') editor.commands.setHeading({ level: 1 })
        else if (blockType === 'heading_2') editor.commands.setHeading({ level: 2 })
        else if (blockType === 'heading_3') editor.commands.setHeading({ level: 3 })

    }, [blockType])

    useEffect(() => {
        if (!editor) return

        // basic formatting
        editor.isActive('bold') ? setBold(true) : setBold(false)
        editor.isActive('italic') ? setItalic(true) : setItalic(false)
        editor.isActive('underline') ? setUnderline(true) : setUnderline(false)
        editor.isActive('code') ? setCode(true) : setCode(false)
        editor.isActive('strike') ? setStrike(true) : setStrike(false)

        // text alignment
        setTextAlign(editor?.isActive({ textAlign: "left" }) ? "left" : editor?.isActive({ textAlign: "center" }) ? "center" : editor?.isActive({ textAlign: "right" }) ? "right" : "left")

        // lists
        setOrderedList(editor?.isActive('orderedList') ?? false)
        setUnorderedList(editor?.isActive('bulletList') ?? false)

        if (editor?.getAttributes('link').href) setPreviousLink(editor?.getAttributes('link').href)
        else {
            setPreviousLink(null)
            editor?.commands.unsetLink()
        }

    }, [editor?.isActive('bold'), editor?.getAttributes('link').href, editor?.isActive('italic'), editor?.isActive('underline'), editor?.isActive('code'), editor?.isActive('strike'), editor?.isActive({ textAlign: 'right' }), editor?.isActive({ textAlign: 'left' }), editor?.isActive({ textAlign: 'center' }), editor?.isActive('bulletList'), editor?.isActive('unorderedList')])

    useEffect(() => {
        if (!editor) return

        if (editor.isActive('paragraph')) setBlockType('paragraph')
        else if (editor.isActive('codeBlock')) setBlockType('code_block')
        else if (editor.isActive('heading', { level: 1 })) setBlockType('heading_1')
        else if (editor.isActive('heading', { level: 2 })) setBlockType('heading_2')
        else if (editor.isActive('heading', { level: 3 })) setBlockType('heading_3')

        else if (editor.isActive('blockquote')) setBlockType('blockquote')
    }, [editor?.isActive('codeBlock'), editor?.isActive('heading', { level: 1 }), editor?.isActive('heading', { level: 2 }), editor?.isActive('heading', { level: 3 })])

    return (
        <div className='p-4 md:p-6 lg:p-8 h-full pb-20'>
            <EditorContent
                editor={editor}
                className='max-w-4xl mx-auto h-full'
            />
            {/* branding */}
            <div className='h-32'>
                {/* {editor && <BubbleMenuComponent editor={editor} className='px-2 py-1 rounded-lg bg-white shadow-lg shadow-gray-300 border border-gray-300'>
                    Bubble Menu Pro
                </BubbleMenuComponent>} */}
            </div>
        </div>
    )
}

export default ContentEditor