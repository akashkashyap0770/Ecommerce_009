// create a context
// Provider 
// consumer => useContext Hook

// Context API and useContext Both are totally different:-
// Context API ke andar hamare pas Consumer (ek section) hai usko hatane ke liye or simplified krne ke liye       useContext Hook ki help li hai.

// * The help of Context API and Axios to get the Data or fetch the Data. *

import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducer/productReducer";

// const AppContext = createContext();

// const AppProvider = ({ children }) => {
//     return <AppContext.Provider value={{myName: "Akash Kashyap"}}>{children}</AppContext.Provider>
// }

// // Custom Hooks

// const useProductContext = () => {
//     return useContext(AppContext);
// }

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";
// console.log("file: ProductContext.js ~ line 29 ~ ProductContext ~ API", API);

const  initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (url) => {

        dispatch({ type: "SET_LOADING" });

        try{
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({ type: "SET_API_DATA", payload: products });
        }catch(error) {
            dispatch({ type: "API_DATA_ERROR" });
        }
        // console.log("~  file: productcontext.js ~ line 12 ~ getProducts ~ products", products);
        // console.log(products);
    };

    // *My second api Call for single product*

    const getSingleProduct = async (url) => {

        dispatch({type: "SET_SINGLE_LOADING"}); 

        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({type: "SET_SINGLE_PRODUCT", payload: singleProduct});
        }catch(error) {
            dispatch({type: "SET_SINGLE_ERROR"});
        }
    }

    useEffect(() => {
        getProducts(API);
    }, [])

    return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>{ children }</AppContext.Provider>
    )
}

    // custom hooks
    const useProductContext = () => {
    return useContext(AppContext);
    }

export { AppProvider, AppContext, useProductContext };