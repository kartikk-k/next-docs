import { IDBPObjectStore } from "idb";
import { create } from "zustand"

interface DbStoreType {
    isInitialized: boolean;
    setIsInitialized: (value: boolean) => void;

    database: IDBPObjectStore<unknown, ["Docs"], "Docs", "readwrite"> | null;
    setDatabase: (value: IDBPObjectStore<unknown, ["Docs"], "Docs", "readwrite">) => void;
}


const useDbStore = create<DbStoreType>((set, get) => ({
    isInitialized: false,
    setIsInitialized: (value: boolean) => set({ isInitialized: value }),

    database: null,
    setDatabase: (value: IDBPObjectStore<unknown, ["Docs"], "Docs", "readwrite">) => set({ database: value })
}))


export default useDbStore;