import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("akashCart");
  if(localCartData == []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
}

const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // increment and decrement the product
  const setDecrease = (id) => {
    dispatch({type: "SET_DECREASE", payload: id});
  }

  const setIncrease = (id) => {
    dispatch({type: "SET_INCREASE", payload: id});
  }

  // To remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // To clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  }

  // Add the Data to Local Storage
  // get vs set
  useEffect(() => {
    // dispatch({type: "CART_TOTAL_ITEM"});
    // dispatch({type: "CART_TOTAL_PRICE"});
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("akashCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };