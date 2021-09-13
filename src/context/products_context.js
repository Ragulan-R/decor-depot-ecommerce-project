import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
// importing product reducer to pass into products provider
import reducer from '../reducers/products_reducer'
// passing url and just renaming it
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

// hot reload issue with react 17, update react, react-dom, react-scripts in package.json, delete node modules and reinstall
// creating that intial property
// need to handle loading(single product, and all products), errors
const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  // will be pulled out from the actual reducer, 1) get all products, pass in as payload, and in reducer i can pull them out
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

// wrap whole app in products provide an use useReducer
// intial state is just an empty object
// setup useEffect in products context to fetch once instead of home page and product page
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // we need 1 function that dispatches that action (1 that opens and 1 closes)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  // dispatch loading and need to setup if function in the products reducer
  // handle an error
  // handle successful loading
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url)
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  // fetching single product information from
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(url)
      const singleProduct = response.data
      // payload will be the variable that was just setup
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts(url)
  }, [])

  // invoking function with useEffect
  // useEffect(() => {
  //   openSidebar()
  // }, [])

  // passing function and state, because we need to know if sidebar is open or closed
  // get into js world and then object
  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
