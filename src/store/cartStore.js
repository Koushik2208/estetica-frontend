import { create } from "zustand";
import api from "../api/axios"; // your axios instance

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  // Load cart from API on app start
  loadCart: async () => {
    try {
      const res = await api.get("/cart");
      const items = res.data.items.map((item) => ({
        _id: item.product._id || item._id,
        name: item.product.name,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
        quantity: item.quantity,
      }));
      const total = res.data.total || 0;

      set({ items, total });
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  },

  // Add item locally + POST to API
  addItem: async (product) => {
    const { items } = get();
    const id = product._id || product.id;
    const exists = items.find((i) => (i._id || i.id) === id);
    const updatedItems = exists
      ? items.map((i) =>
          (i._id || i.id) === id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...items, { ...product, quantity: 1 }];

    set({ items: updatedItems });

    try {
      const res = await api.post("/cart", { productId: id, quantity: 1 });
      set({ total: res.data.total });
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  },

  increment: async (id) => {
    const { items } = get();
    const item = items.find((i) => (i._id || i.id) === id);
    if (!item) return;

    const newQty = item.quantity + 1;

    set((state) => ({
      items: state.items.map((i) =>
        (i._id || i.id) === id ? { ...i, quantity: newQty } : i
      ),
    }));

    try {
      const res = await api.post(`/cart`, { productId: id, quantity: newQty });
      set({ total: res.data.total });
    } catch (err) {
      console.error("Increment failed:", err);

      set((state) => ({
        items: state.items.map((i) =>
          (i._id || i.id) === id ? { ...i, quantity: item.quantity } : i
        ),
      }));
    }
  },

  decrement: async (id) => {
    const { items } = get();
    const item = items.find((i) => (i._id || i.id) === id);
    if (!item) return;

    const newQuantity = item.quantity - 1;

    if (newQuantity <= 0) {
      set((state) => ({
        items: state.items.filter((i) => (i._id || i.id) !== id),
        total: state.total - item.price * item.quantity,
      }));
      try {
        await api.delete(`/cart/${id}`);
      } catch (err) {
        console.error("Delete failed:", err);
        set({ items });
      }
    } else {
      const updatedItems = items.map((i) =>
        (i._id || i.id) === id ? { ...i, quantity: newQuantity } : i
      );
      set({ items: updatedItems });

      try {
        const res = await api.post(`/cart/`, {
          productId: id,
          quantity: newQuantity,
        });
        set({ total: res.data.total });
      } catch (err) {
        console.error("Decrement failed:", err);
        set({ items }); // rollback
      }
    }
  },

  removeItem: async (id) => {
    set((state) => ({
      items: state.items.filter((i) => (i._id || i.id) !== id),
    }));
    try {
      await api.delete(`/cart/${id}`);
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  },

  emptyCart: async () => {
    set({ items: [], total: 0 });
    try {
      await api.delete("/cart"); // clear cart server-side
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  },
}));
