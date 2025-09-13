import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import Cart from "../components/Cart";
import { useCartStore } from "../store/cartStore";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);
  const { addItem } = useCartStore();
  const loadCart = useCartStore((s) => s.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products", {
          params: {
            ...(category ? { category } : {}),
            // Always send search, even if it's an empty string
            search: debouncedSearch || "",
          },
        });
        if (!cancelled) setProducts(res.data);
      } catch (err) {
        if (!cancelled) console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [category, debouncedSearch]);

  return (
    <div className="p-6 flex gap-6">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-[30px]">Products</h1>

        {/* Make sure SearchBar is a controlled component */}
        <SearchBar value={search} onChange={setSearch} />

        <CategoryFilter selected={category} onSelect={setCategory} />

        {loading && <p className="text-center mt-4">Loading…</p>}

        <div className="flex justify-between gap-[17px]">
          <ProductGrid products={products} onAdd={addItem} />
          <Cart />
        </div>
      </div>
    </div>
  );
}
