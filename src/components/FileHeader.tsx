import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import useDebounce from './hooks/useDebounce'
import moment from 'moment'

interface props {
    docData: docType | null | undefined
    onChange: (title: string) => void
}

function FileHeader({ docData, onChange }: props) {

    const [title, setTitle] = React.useState<string | undefined>(docData?.title)
    const debouncedTitle = useDebounce(title, 500)

    useEffect(() => {
        if (!debouncedTitle || !docData) return console.log("not updated")
        onChange(debouncedTitle)
    }, [debouncedTitle])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <div className='flex items-center shrink-0 justify-between gap-4 p-4 bg-white border-b h-18'>
            <div className='flex items-center gap-4 select-none'>

                <Link href={'/'} title='Back' className='h-9 w-9 flex items-center justify-center text-gray-500 bg-gray-200 rounded-full'>
                    <ArrowLeftIcon size={18} />
                </Link>

                <div>
                    <input
                        defaultValue={docData?.title}
                        onChange={handleChange}
                        className='p-0 outline-none w-full font-semibold text-gray-700 bg-transparent border-none focus:bg-transparent'
                    />
                    <p className='text-xs text-gray-500'>Created on {moment(docData?.createdAt).format('DD MMM YYYY')}</p>
                </div>

            </div>

            <div className='flex items-center gap-4 shrink-0'>

                {/* <div className='flex items-center gap-1 text-sm text-gray-600'> */}
                {/* <Toggle pressed={collobrativeMode} onClick={() => collobrativeModeHandler()}>
                <RadioTowerIcon size={18} strokeWidth={1.5} />
            </Toggle> */}
                {/* </div> */}

                {/* <button className='items-center hidden gap-2 px-4 py-2 text-sm text-white duration-200 rounded-xl hover:bg-primary/90 sm:flex bg-primary'>
                <LockIcon size={16} />
                Share
            </button> */}

                {/* <ShareAccess /> */}

                <button className='w-8 h-8 text-sm text-gray-600 bg-gray-400 rounded-full'>
                </button>

            </div>
        </div>
    )
}

export default FileHeader