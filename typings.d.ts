interface docType {
    id: string
    title: string
    content: JSON[]
    createdAt: Date
    updatedAt: Date
    shareUrl?: string
}

type allowedToolbarOptions = 'bold' | 'italic' | 'underline' | 'strike' | 'code' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'orderedList' | 'unorderedList'
type blockType = 'heading_1' | 'heading_2' | 'heading_3' | 'paragraph' | 'blockquote' | 'code_block'
