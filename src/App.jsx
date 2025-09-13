import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import { useCartStore } from "./store/cartStore";

const App = () => {
  const loadCart = useCartStore((s) => s.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
