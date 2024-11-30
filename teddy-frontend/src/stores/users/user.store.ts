import { create } from 'zustand'

interface IUserStore {
    isAuthenticated: boolean;
    username: string,
    login: (name: string) => void,
    logout: () => void
    authenticate: () => void;
}

export const userStore = create<IUserStore>((set) => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
    username: localStorage.getItem('username') || '',
    login: (name: string) => set({ username: name }),
    logout: () => set({ username: '' }),
    authenticate: () => set({ isAuthenticated: true })
}))