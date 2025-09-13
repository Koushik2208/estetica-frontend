import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const id = product._id || product.id;
      const exists = state.items.find((i) => (i._id || i.id) === id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            (i._id || i.id) === id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i._id !== id),
    })),

  increment: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i._id === id ? { ...i, qty: i.qty + 1 } : i
      ),
    })),

  decrement: (id) =>
    set((state) => ({
      items: state.items
        .map((i) => (i._id === id ? { ...i, qty: Math.max(i.qty - 1, 0) } : i))
        .filter((i) => i.qty > 0),
    })),

  emptyCart: () => set({ items: [] }),
}));
