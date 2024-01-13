import React, { useEffect, useState } from 'react'
import { Check, Link2 } from 'lucide-react'
import { Toggle } from './ui/Toggle'
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover'
import useToolbarStore from '@/stores/ToolbarStore'

interface props {
    ICON_SIZE: number,
    ICON_STROKE_WIDTH: number
}

function AddLink({ ICON_SIZE, ICON_STROKE_WIDTH }: props) {

    const setLink = useToolbarStore(state => state.setLink)
    const previousLink = useToolbarStore(state => state.previousLink)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [url, setUrl] = useState<string>('')

    useEffect(() => {
        setUrl(previousLink || '')
    }, [previousLink])

    const handleClick = () => {
        if (!url.trim()) {
            setLink(null)
        }
        else {
            setLink(url)
        }

        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <Toggle pressed={isOpen || !!previousLink}>
                    <Link2 size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
                </Toggle>
            </PopoverTrigger>
            <PopoverContent className='flex gap-2 p-0 overflow-hidden outline-gray-200'>
                <input
                    type="url"
                    autoFocus={false}
                    value={url}
                    onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className='outline-none w-full px-2 h-8'
                />
                <button
                    onClick={handleClick}
                    className='w-8 h-8 disabled:text-gray-400 duration-200 shrink-0 bg-gray-200 flex items-center justify-center'
                >
                    <Check size={16} strokeWidth={ICON_STROKE_WIDTH} />
                </button>
            </PopoverContent>
        </Popover>
    )
}

export default AddLink