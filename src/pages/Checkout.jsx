import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f0f6ff] p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Appointment Completion</h1>
        <p className="text-sm text-gray-500">Booking Summary – APT-001</p>
      </div>

      <div className="flex gap-6">
        <main className="flex-1">
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Products Used</h2>

            {items.map((item) => {
              return (
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{Number(item.quantity) * Number(item.price)}
                  </p>
                </div>
              );
            })}

            <button
              onClick={() => navigate("/")}
              className="w-full mt-2 border rounded-lg py-2 text-sm hover:bg-gray-50"
            >
              + Add Extra Products
            </button>
          </div>
        </main>

        <aside className="w-[30vw] flex-shrink-0">
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">Billing Summary</h2>

            <div className="flex justify-between text-sm">
              <span>Service Total</span>
              <span>₹1800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Product Total</span>
              <span>₹500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Order Discount (%)</span>
              <input
                type="number"
                defaultValue={0}
                className="w-16 border rounded px-1 text-right text-sm"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (18%)</span>
              <span>₹414.00</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Final Total</span>
              <span>₹2714.00</span>
            </div>

            <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium py-2 rounded-lg hover:opacity-90">
              Complete Payment
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
