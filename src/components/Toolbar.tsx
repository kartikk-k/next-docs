"use client"

import { Toggle } from './ui/Toggle'
import { AlignCenter, AlignLeft, AlignRight, Bold, Code, Italic, Link2, List, ListOrdered, Strikethrough, Underline } from 'lucide-react'
import Separator from './ui/Separator'
import useToolbarStore from '@/stores/ToolbarStore'
import AddLink from './AddLink'
import ElementDropdown from './ElementDropdown'

const ICON_SIZE = 16
const ICON_STROKE_WIDTH = 2.5

function Toolbar() {
    const { bold, setBold, italic, setItalic, underline, setUnderline, code, setCode, strike, setStrike, textAlign, setTextAlign, orderedList, setOrderedList, unorderedList, setUnorderedList }
        = useToolbarStore()

    return (
        <div className='px-4 py-2 sticky border-b top-0 z-10 flex shrink-0 items-center gap-2 bg-gray-100 w-full overflow-y-hidden overflow-x-auto light-scrollbar'>
            <ElementDropdown />

            <Separator />

            <Toggle pressed={bold} onClick={() => setBold(!bold)}>
                <Bold size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>
            <Toggle pressed={underline} onClick={() => setUnderline(!underline)}>
                <Underline size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>
            <Toggle pressed={italic} onClick={() => setItalic(!italic)}>
                <Italic size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>
            <Toggle pressed={strike} onClick={() => setStrike(!strike)}>
                <Strikethrough size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>
            <Toggle pressed={code} onClick={() => setCode(!code)}>
                <Code size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>

            <Separator />

            <Toggle pressed={textAlign == 'left'} onClick={() => setTextAlign('left')}>
                <AlignLeft size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>
            <Toggle pressed={textAlign == 'center'} onClick={() => setTextAlign('center')}>
                <AlignCenter size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>
            <Toggle pressed={textAlign == 'right'} onClick={() => setTextAlign('right')}>
                <AlignRight size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>

            <Separator />

            <Toggle pressed={unorderedList} onClick={() => setUnorderedList(!unorderedList)}>
                <List size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>
            <Toggle pressed={orderedList} onClick={() => setOrderedList(!orderedList)}>
                <ListOrdered size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            </Toggle>

            <Separator />

            {/* <Toggle><Link2 size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle> */}
            <AddLink ICON_SIZE={ICON_SIZE} ICON_STROKE_WIDTH={ICON_STROKE_WIDTH} />
        </div>
    )
}

export default Toolbar