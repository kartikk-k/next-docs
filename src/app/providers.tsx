"use client"

import React, { useEffect } from 'react'
import useDbStore from '@/stores/DbStore'
import InitializeDB from '@/helpers/indexDB'


function Providers({ children }: { children: React.ReactNode }) {

    const isInitialized = useDbStore(state => state.isInitialized)

    /* used to initialize the database if it hasn't been initialized yet. */
    useEffect(() => {
        if (!isInitialized) InitializeDB()
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default Providers