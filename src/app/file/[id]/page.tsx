"use client"

import { motion } from 'framer-motion'
import Editor from '@/components/Editor'
import FileHeader from '@/components/FileHeader'
import Toolbar from '@/components/Toolbar'

function Page() {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='w-screen'
        >
            <FileHeader />
            <Toolbar />
            <Editor />
        </motion.div>
    )
}

export default Page