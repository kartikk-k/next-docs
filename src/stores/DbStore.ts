import { create } from "zustand"

interface DbStoreType {
    isInitialized: boolean;
    setIsInitialized: (value: boolean) => void;

    database: IDBObjectStore | null;
    setDatabase: (value: IDBObjectStore) => void;
}


const useDbStore = create<DbStoreType>((set, get) => ({
    isInitialized: false,
    setIsInitialized: (value: boolean) => set({ isInitialized: value }),

    database: null,
    setDatabase: (value: IDBObjectStore) => set({ database: value })
}))


export default useDbStore;