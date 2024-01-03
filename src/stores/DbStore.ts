import { create } from "zustand";

interface DbStoreType {
    isInitialized: boolean;
    setIsInitialized: (value: boolean) => void;
}


const useDbStore = create<DbStoreType>((set, get) => ({
    isInitialized: false,
    setIsInitialized: (value: boolean) => set({ isInitialized: value }),
}))


export default useDbStore;