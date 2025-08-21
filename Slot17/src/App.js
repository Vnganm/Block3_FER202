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
  // 1. Tạo state để theo dõi chế độ dark mode
  const [dark, setDark] = useState(false);
  
  // 2. Tạo hàm để chuyển đổi giữa light và dark mode
  const toggleTheme = () => {
    setDark(prevDark => !prevDark);
  };
  
  // 3. Sử dụng useMemo để tạo class conditionally
  const rootClass = useMemo(() => (dark ? "app dark" : "app"), [dark]);

  return (
    <CartProvider>
      <BrowserRouter>
        {/* 4. Thêm data-bs-theme để Bootstrap nhận biết theme */}
        <div className={rootClass} data-bs-theme={dark ? "dark" : "light"}>
          {/* 5. Truyền state và hàm xuống các component cần thiết */}
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