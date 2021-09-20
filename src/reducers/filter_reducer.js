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
  // there is two properties products and filtered products
  // need to use spread operator because its pointing to all products, so if we filter it can't go back to the default since they are both stored in the same spot in the memory
  if (action.type === LOAD_PRODUCTS) {
    // min, max, price based on user selected
    // p is product
    let maxPrice = action.payload.map((p) => p.price)
    // cant math max on array and need spread
    maxPrice = Math.max(...maxPrice)
    console.log(maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
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
  if (action.type === UPDATE_FILTERS) {
    // destructure both from the payload since passing as object
    const { name, value } = action.payload
    // update those values
    // setting up dynamic properties since filters is an object
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    // need an array that holds the results of filter products
    // also need all products - base of all the data types
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters
    // before we filter anything, starting with a fresh copy of all products

    // ALWAYS START FROM SCRATCH
    let tempProducts = [...all_products]
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
        // passing text coming from state
      })
    }
    // category ( filter only if category not "ALL")
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }
    // company filtering
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      )
    }

    // color filtering(colors is an array so need another callback)
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.color.find((c) => c === color)
      })
    }

    // price filtering
    tempProducts = tempProducts.filter((product) => product.price <= price)

    // shipping filtering
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }

    // once done filtering, setting filtered products to temp products
    return { ...state, filtered_products: tempProducts }
  }
  // so min and max price shown as default prices
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        // setting price as default max price
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
