import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import Header from "./components/Header";
import "./styles.css"; 

const dishes = [
  {
    id: 0, name: "Uthappizza", image: "images/uthappizza.png", price: "4.99",
    description: "Kết hợp độc đáo giữa Uthappam Ấn Độ và pizza Ý."
  },
  {
    id: 1, name: "Zucchipakoda", image: "images/zucchipakoda.jpg", price: "1.99",
    description: "Bí ngòi chiên bột đậu gà giòn rụm."
  },
  {
    id: 2, name: "Vadonut", image: "images/vadonut.png", price: "1.99",
    description: "Pha trộn giữa vada và donut."
  },
  {
    id: 3, name: "ElaiCheese Cake", image: "images/elaicheesecake.jpg", price: "2.99",
    description: "Cheesecake kiểu New York thêm thảo quả Ấn Độ."
  },
];

export default function App() {
  const [dark, setDark] = useState(false);
  
  const toggleTheme = () => {
    setDark(prevDark => !prevDark);
  };
  
  const rootClass = useMemo(() => (dark ? "app dark" : "app"), [dark]);

  return (
    <CartProvider>
      <BrowserRouter>

        <div className={rootClass} data-bs-theme={dark ? "dark" : "light"}>

          <Header dark={dark} onToggleTheme={toggleTheme} />
          
          <main className="content">
            <Routes>
              <Route path="/" element={<DishesList dishes={dishes} dark={dark} />} />
              <Route path="/cart" element={<Cart dark={dark} />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}