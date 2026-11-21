import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import QuizPage from "./pages/QuizPage";
import GuidesPage from "./pages/GuidesPage";

function ScrollToTop() {
  // Reset scroll on route change
  const { pathname } = window.location;
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
  return null;
}

function AppLayout() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/guides" element={<GuidesPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
