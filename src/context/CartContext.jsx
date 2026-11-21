import { createContext, useContext, useReducer, useCallback } from "react";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id
              ? { ...i, qty: action.payload.qty }
              : i
          )
          .filter((i) => i.qty > 0),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback(
    (plant) => dispatch({ type: "ADD_ITEM", payload: plant }),
    []
  );
  const removeItem = useCallback(
    (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
    []
  );
  const updateQty = useCallback(
    (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const cartCount = state.items.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
