import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      itemStore: [],
      favItem: [],

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
    }),
    { name: "cart-store" },
  ),
);
