interface docType {
    id: string
    title: string
    content: JSON[]
    createdAt: Date
    updatedAt: Date
    shareUrl?: string
}

type allowedToolbarOptions = 'bold' | 'italic' | 'underline' | 'strike' | 'code' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'orderedList' | 'unorderedList'