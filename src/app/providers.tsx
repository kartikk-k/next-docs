"use client"

import InitializeDB from '@/helpers/indexDB'
import React, { useEffect } from 'react'

function Providers({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        if (!window) return
        console.log("--")
        const db = async () => {
            await InitializeDB().then(() => console.log("DB Initialized"))
        }
    }, [window])

    return (
        <div>
            {children}
        </div>
    )
}

export default Providers