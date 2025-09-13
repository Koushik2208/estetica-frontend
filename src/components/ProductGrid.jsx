import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    // <div className="flex flex-wrap gap-6 mt-6">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[9px] mt-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
