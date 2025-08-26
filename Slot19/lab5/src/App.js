import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext"; // Import useTheme
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import DishesList from "./pages/DishesList";
import Cart from "./pages/Cart";
import DishDetail from "./pages/DishDetail";
import Favourites from "./pages/Favourites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import dishes from "./data/dishes";
import "./styles.css";

const AppContent = () => {
  const { dark } = useTheme();

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <Header />
      <main className={`content ${dark ? "dark" : "light"}`}>
        <Routes>
          <Route path="/" element={<DishesList dishes={dishes} />} />
          <Route path="/products/:id" element={<DishDetail dishes={dishes} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}