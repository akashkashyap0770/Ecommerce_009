const filterReducer = (state, action) => {

    switch (action.type) {

      // FilterContext useEffect products Code
      case "LOAD_FILTER_PRODUCTS":

      let priceArr = action.payload.map((curElem) => curElem.price);
      // console.log("file: filterReducer.js ~ line 9 ~ filterReducer ~ priceArr", priceArr);

      // console.log(Math.max.apply(null,priceArr));

      // let maxPrice = priceArr.reduce((initialVal, curElem) => 
      // Math.max(initialVal, curElem), 0);
      // console.log("file: filterReducer.js ~ line 9 ~ filterReducer ~ maxPrice", maxPrice);

      let maxPrice  = Math.max(...priceArr);
      console.log("file: filterReducer.js ~ line 9 ~ filterReducer ~ maxPrice", maxPrice);


        return {
          ...state,
          filter_products: [...action.payload],
          all_products: [...action.payload],
          filters: {...state.filters, maxPrice, price: maxPrice},
        };
  
      // FilterContext setGridView Code
      case "SET_GRID_VIEW":
        return {
          ...state,
          grid_view: true,
        };

      // FilterContext setListView Code  
      case "SET_LIST_VIEW":
          return {
          ...state,
          grid_view: false,
        };
        
      // FilterContext sorting function Code 
      case "GET_SORT_VALUE":
        // let userSortValue = document.getElementById("sort");
        // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
        // console.log(sort_value);
        return {
          ...state,
          sorting_value: action.payload,
        } 

       // filterContext useEffect sorting_products code 
       case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

        // filterContext UPDATE_FILTER_VALUE code
        case "UPDATE_FILTERS_VALUE":
          const { name, value } = action.payload;

          return {
            ...state,
            filters: {
            ...state.filters, 
            [name]: value,
            }
          }

          // filterContext useEffect FILTER_PRODUCTS code
          case "FILTER_PRODUCTS":
            let { all_products } = state;
            let tempFilterProduct = [...all_products];

            const { text, category, company, color, price } = state.filters;

            // FilterSection Input Tag name="text" code
            if (text) {
              tempFilterProduct = tempFilterProduct.filter((curElem) => {
                return curElem.name.toLowerCase().includes(text);
              });
            }

            // FilterSection button Tag name="category" code
            if (category !== "all") {
              tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.category === category);
            }

            // FilterSection Option Tag name="company" code
            if (company !== "all") {
              tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.company.toLowerCase() === company.toLowerCase());
            }

            // FilterSection Option Tag name="color" code
            if(color !== "all") {
              tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.colors.includes(color) );
            }

            if (price === 0) {
              tempFilterProduct = tempFilterProduct.filter(
                (curElem) => curElem.price == price
              );
            } else {
              tempFilterProduct = tempFilterProduct.filter(
                (curElem) => curElem.price <= price
              );
            }

            return {
              ...state,
              filter_products: tempFilterProduct,
            }
  
          // FilterContext clearFilters code
          case "CLEAR_FILTERS":
            return {
              ...state,
              filters: {
                ...state.filters,
                text: "",
                category: "all",
                company: "all",
                color: "all",
                maxPrice: 0,
                price: state.filters.maxPrice,
                minPrice: state.filters.maxPrice,
              },
            }



      default:
        return state;
    }
  };
  
  export default filterReducer;