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
  if (action.type === SORT_PRODUCTS) {
    // how its going to be sorted aka sort values and 2nd is the filtered products
    const { sort, filtered_products } = state
    // incase none of them match, some products are displayed
    let tempProducts = [...filtered_products]
    if (sort === 'price-lowest') {
      // comparing the current value and the next value
      // tempProducts = tempProducts.sort((a, b) => {
      //   if (a.price < b.price) {
      //     return -1
      // if negative display a before b
      //   }
      //   if (a.price > b.price) {
      //     return 1
      //   }
      //   return 0
      // })
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
