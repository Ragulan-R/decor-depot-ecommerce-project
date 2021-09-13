import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  // begin, success and error for all products
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  // begin, success and error for single products
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  // to catch any intial bugs on function being onvoked

  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // since products are coming in the payload
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    )
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    }
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: true, products_error: true }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
