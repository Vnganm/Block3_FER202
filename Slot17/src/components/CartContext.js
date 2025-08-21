import React, { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // [{ id, name, price, image, description, quantity }]

  // Thêm 1 đơn vị vào giỏ. Nếu đã có thì tăng quantity
  const addToCart = (dish) =>
    setCartItems((previousItems) => {
      const index = previousItems.findIndex((item) => item.id === dish.id);
      if (index !== -1) {
        const updated = [...previousItems];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + 1,
        };
        return updated;
      }
      return [...previousItems, { ...dish, quantity: 1 }];
    });

  // Giảm 1 đơn vị. Nếu về 0 thì xóa dòng đó
  const removeFromCart = (id) => {
    setCartItems((previousItems) => {
      const index = previousItems.findIndex((item) => item.id === id);
      if (index === -1) return previousItems;
      const updated = [...previousItems];
      const current = updated[index];
      if (current.quantity <= 1) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...current, quantity: current.quantity - 1 };
      }
      return updated;
    });
  };

  // Xóa hẳn 1 dòng item khỏi giỏ
  const removeItem = (id) => {
    setCartItems((previousItems) => previousItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalValue = useMemo(() => {
    const sum = cartItems.reduce(
      (accumulator, item) =>
        accumulator + parseFloat(item.price) * (item.quantity || 1),
      0
    );
    return sum.toFixed(2);
  }, [cartItems]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((accumulator, item) => accumulator + (item.quantity || 1), 0);
  }, [cartItems]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems"));
    if (Array.isArray(saved)) {
      // Chuẩn hóa dữ liệu cũ (danh sách trùng lặp) thành dạng có quantity
      if (saved.length > 0 && saved[0] && saved[0].quantity == null) {
        const map = new Map();
        for (const it of saved) {
          const prev = map.get(it.id);
          if (prev) {
            map.set(it.id, { ...prev, quantity: (prev.quantity || 1) + 1 });
          } else {
            map.set(it.id, { ...it, quantity: 1 });
          }
        }
        setCartItems(Array.from(map.values()));
      } else {
        setCartItems(saved);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, removeItem, clearCart, totalValue, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
};