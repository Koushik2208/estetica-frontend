import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { Image } from "@imagekit/react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, decrement, increment, emptyCart } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) return null;

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <aside className="text-center w-[30vw] shrink-0">
      <div className=" bg-white rounded-xl p-4 h-fit mt-6">
        {console.log(items)}
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Product Cart</h2>
          <Trash2
            color="#FF0000"
            className="w-[24px] h-[24px]"
            onClick={emptyCart}
          />
        </div>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item._id || item.id}
              className="border-b border-[#64748B1A] pb-[18px]"
            >
              <div className="flex gap-[16px] justify-between">
                <div className="p-1 border-[#0000001A]">
                  <Image
                    urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL}
                    src={item.imageUrl}
                    width={83}
                    height={95}
                    alt={item.name}
                  />
                </div>
                <div className="flex-1">
                  <p className="poppins line-clamp-1 font-semibold mb-[12px]">
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {item.qty} × ₹{item.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        className="border border-[#EEEEEE] rounded-xl flex justify-center items-center w-[36px] h-[36px]"
                        onClick={() => decrement(item._id || item.id)}
                      >
                        <Minus color="#000" className="w-[24px] h-[24px]" />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="bg-[#6C5DD3] text-white rounded-xl flex justify-center items-center w-[36px] h-[36px]"
                        onClick={() => increment(item._id || item.id)}
                      >
                        <Plus color="white" className="w-[24px] h-[24px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {items.length > 0 && (
          <p className="mt-4 font-semibold">Total: ₹{total.toFixed(2)}</p>
        )}
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full h-[54px] bg-gradient-to-r from-[#BFA6FF] to-[#6C5DD3] rounded-xl text-white poppins mt-[15px]"
      >
        Checkout
      </button>
    </aside>
  );
}
