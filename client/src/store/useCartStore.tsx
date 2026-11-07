import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      itemStore: [],
      favStore: [],

      reset: () => {
        useCartStore.persist.clearStorage();
      },

      addItem: (newItem: Product) =>
        set((state) => ({
          itemStore: [...state.itemStore, newItem],
        })),
      removeItem: (index: number) =>
        set((state) => ({
          itemStore: state.itemStore.filter((f: Product, i: number) => ( i !== index )),
        })),
      incItem: (index: number) => set(
        state => ({
          itemStore: state.itemStore.map((m: Product, i: number) => i === index ? {...m, quantity: m.quantity + 1} : m)
        })
      ),
      decItem: (index: number) => set(
        state => ({
          itemStore: state.itemStore.map((m: Product, i: number) => i === index ? {...m, quantity: m.quantity - 1} : m)
        })
      ),
      resetItemStore: () => set({itemStore: []}),

      addItemToFav: (newItem: Product) => set(
        state => ({
          favStore: [...state.favStore, newItem]
        }),
      ),
      removeItemFromFav: (id) => set(
        state => ({
          favStore: state.favStore.filter((f: Product) => f.id !== id)
        })
      ),
    }),
    { name: "cart-store" },
  ),
);
