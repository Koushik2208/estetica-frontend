import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";

const App = () => {
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
