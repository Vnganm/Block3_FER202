import React, { createContext, useReducer, useContext, useEffect } from "react";

const FavouritesContext = createContext();

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      if (state.some((item) => item.id === action.payload.id)) return state;
      return [...state, { ...action.payload, quantity: 1 }];
    case "REMOVE_FROM_FAVOURITES":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR_FAVOURITES":
      return [];
    default:
      return state;
  }
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(favouritesReducer, [], () => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const totalCount = favourites.length;

  return (
    <FavouritesContext.Provider value={{ favourites, dispatch, totalCount }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);