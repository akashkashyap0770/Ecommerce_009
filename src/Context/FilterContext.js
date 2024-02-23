import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../Reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {

  const { products } = useProductContext();
  // console.log("file: FilterContext.js ~ line 10 ~ FilterContext ~ FilterContextProvider", products);

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function 
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({type: "GET_SORT_VALUE",payload: userValue });
    // console.log("file: FilterContext.js ~ line 43 ~ FilterCOntext ~ sorting", sorting);
  }

  // Update the FilterSection Value
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    return dispatch({type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  }

  // FilterSection to clear the filter
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  }

  // useEffect sorting_value
  useEffect(() => {
    // console.log("hi...");
    dispatch({type: "FILTER_PRODUCTS"});
    dispatch({type: "SORTING_PRODUCTS"});
  }, [products,state.sorting_value, state.filters])

  // useEffect products
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};