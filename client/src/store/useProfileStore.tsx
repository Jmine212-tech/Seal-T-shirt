import {create} from "zustand"

export const useProfileStore = create(set => ({
    user: null,

    setUser: (info) => set({user: info}),
}))