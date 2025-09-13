import { Image } from "@imagekit/react";
import { Plus } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div className="card relative group">
      {/* Full-card overlay */}
      <div className="card-overlay">
        <button className="card-hover" onClick={() => addItem(product)}>
          <Plus className="w-[30px] h-[30px]" color="#6C5DD3" />
        </button>
      </div>

      {/* Original content (unchanged size) */}
      <Image
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL}
        src={product.imageUrl}
        width={88}
        height={100}
        alt={product.name}
      />
      <p className="font-medium text-center line-clamp-2 mt-[10px] poppins">
        {product.name}
      </p>
      {/* <p className="text-sm text-gray-600 mt-1">₹{product.price}</p> */}
    </div>
  );
}
