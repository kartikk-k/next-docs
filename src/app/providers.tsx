"use client"

import React, { useEffect } from 'react'
import useDbStore from '@/stores/DbStore'
// import InitializeDB, { GetAllDocuments } from '@/helpers/indexDB'
import InitializeDB from '@/helpers/indexDB/idbIndex'


function Providers({ children }: { children: React.ReactNode }) {

    const Database = useDbStore(state => state.database)

    /* used to initialize the database if it hasn't been initialized yet. */
    useEffect(() => {
        if (!window) return
        if (!Database?.name) InitializeDB()
    }, [window, Database])

    /* used to fetch all documents from the database when the `Database` variable changes. */
    // useEffect(() => {
    //     if (Database === null) return
    //     console.log('fetching documents', Database)
    //     GetAllDocuments()
    // }, [Database])

    return (
        <div>
            {children}
        </div>
    )
}

export default Providers