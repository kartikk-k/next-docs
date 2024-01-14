import React, { useEffect } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from './ui/Select'
import useToolbarStore from '@/stores/ToolbarStore'

function ElementDropdown() {

    const blockType = useToolbarStore(state => state.blockType)

    const [value, setValue] = React.useState<blockType>(blockType)

    useEffect(() => {
        setValue(blockType)
    }, [value])

    return (
        <Select onValueChange={value => setValue(value as blockType)}>
            <SelectTrigger>Paragraph</SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='paragraph'>Paragraph</SelectItem>
                    <SelectItem value='code_block'>Code block</SelectItem>
                    <SelectItem value='heading_1'>Heading 1</SelectItem>
                    <SelectItem value='heading_2'>Heading 2</SelectItem>
                    <SelectItem value='heading_3'>Heading 3</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default ElementDropdown