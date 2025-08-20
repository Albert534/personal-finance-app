import {create} from 'zustand'


export const useAuthenticationStore = create((set) => ({
    authenticated: false,
    setAuthenticated: (authenticated: boolean) => set({authenticated})
}))