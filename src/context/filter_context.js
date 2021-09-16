import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  // array that will be always changing
  filtered_products: [],
  // the default array of products
  all_products: [],
  grid_view: true,
  // matching one of the values of the select as default
  sort: 'price-lowest',
}

const FilterContext = React.createContext()

// need to pass info from product context into filter context, cant just send it to filter reducer
// cant just pass products into this state, need useEffect
export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  // as we fetch the products we invoke dispatch with the same thing
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  // run everytime we change the sort parameters to
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort])

  // 2 functions to toggle the grid and list view
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  // function to run when change in the input
  const updateSort = (e) => {
    // const name = e.target.name
    const value = e.target.value
    // console.log(name, value)
    // passing whatever value we get from the select as a payload
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  return (
    // passing the 2 functions down
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
