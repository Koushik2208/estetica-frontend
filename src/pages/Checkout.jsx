import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import api from "../api/axios";

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const navigate = useNavigate();

  const handleAppointment = async () => {
    try {
      const productsUsed = items.map((item) => ({
        product: item._id || item.id,
        quantity: item.quantity,
      }));

      const res = await api.post("/appointments", { productsUsed });

      console.log(res.data);
      alert("appointment created");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

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
                <div className="border rounded-lg p-4 flex justify-between items-center poppins">
                  <div className="flex-1">
                    <p className="font-medium mb-[16px]">{item.name}</p>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-[10px]">
                        <span>Quantity</span>
                        <span className="font-semibold">{item.quantity}</span>
                      </div>
                      <div className="flex flex-col gap-[10px]">
                        <span>Unit Price</span>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                      <div className="flex flex-col gap-[10px]">
                        <span>Total</span>
                        <span className="font-semibold">
                          ₹{Number(item.quantity) * Number(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
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
              <span>₹{total}</span>
            </div>

            <button
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium py-2 rounded-lg hover:opacity-90"
              onClick={handleAppointment}
            >
              Complete Payment
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
