import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
// importing product reducer to pass into products provider
import reducer from '../reducers/products_reducer'
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
const initialState = {
  isSidebarOpen: false,
}

const ProductsContext = React.createContext()

// wrap whole app in products provide an use useReducer
// intial state is just an empty object
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // we need 1 function that dispatches that action (1 that opens and 1 closes)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

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
