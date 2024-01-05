import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'

function FileHeader() {
    return (
        <div className='flex items-center shrink-0 justify-between gap-4 p-4 bg-white border-b h-18'>
            <div className='flex items-center gap-4 select-none'>

                <button title='Back' className='h-9 w-9 flex items-center justify-center text-gray-500 bg-gray-200 rounded-full'>
                    <ArrowLeftIcon size={18} />
                </button>

                <div>
                    <p className='p-0 font-semibold text-gray-700 bg-transparent border-none focus:bg-transparent'>Development process</p>
                    <p className='text-xs text-gray-500'>Created on 23 Mar 2023</p>
                </div>

            </div>

            <div className='flex items-center gap-4'>

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

                <div>
                    <button className='w-8 h-8 text-sm text-gray-600 bg-gray-400 rounded-full'>

                    </button>
                </div>

            </div>
        </div>
    )
}

export default FileHeader