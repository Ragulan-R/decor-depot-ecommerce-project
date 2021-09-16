import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // there is two properties products and filtered products
    // need to use spread operator because its pointing to all products, so if we filter it can't go back to the default since they are both stored in the same spot in the memory
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    }
  }
  // toggling values and return specific states
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
