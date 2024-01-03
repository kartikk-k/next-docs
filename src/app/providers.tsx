"use client"

import React, { useEffect } from 'react'
import useDbStore from '@/stores/DbStore'
import InitializeDB from '@/helpers/indexDB'


function Providers({ children }: { children: React.ReactNode }) {

    const Database = useDbStore(state => state.database)

    /* used to initialize the database if it hasn't been initialized yet. */
    useEffect(() => {
        if (!window) return
        if (!Database?.name) InitializeDB()
    }, [window, Database])

    return (
        <div>
            {children}
        </div>
    )
}

export default Providers