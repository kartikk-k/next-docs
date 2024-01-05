"use client"

import React from 'react'
import { Toggle } from './ui/Toggle'
import { AlignCenter, AlignLeft, AlignRight, Bold, Code, Italic, Link2, List, ListOrdered, Strikethrough, Underline } from 'lucide-react'
import Separator from './ui/Separator'

const ICON_SIZE = 16
const ICON_STROKE_WIDTH = 2.5

function Toolbar() {

    const [collobrativeMode, setCollobrativeMode] = React.useState<boolean>(false)

    return (
        <div className='px-4 py-2 sticky border-b top-0 z-10 flex shrink-0 items-center gap-2 bg-gray-100 w-full overflow-y-hidden overflow-x-auto light-scrollbar'>
            <Toggle><Bold size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
            <Toggle><Underline size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
            <Toggle><Italic size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
            <Toggle><Strikethrough size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
            <Toggle><Code size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>

            <Separator />

            <Toggle><AlignLeft size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
            <Toggle><AlignCenter size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
            <Toggle><AlignRight size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>

            <Separator />

            <Toggle><List size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
            <Toggle><ListOrdered size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>

            <Separator />

            <Toggle><Link2 size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /></Toggle>
        </div>
    )
}

export default Toolbar