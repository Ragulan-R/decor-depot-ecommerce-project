import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  // handle add to cart action
  if (action.type === ADD_TO_CART) {
    // get values from the payload
    const { id, color, amount, product } = action.payload
    // need to check if item is already in the cart
    // same item but maybe different colors
    const tempItem = state.cart.find((i) => i.id === id + color)
    if (tempItem) {
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      }
      // overwrite the cart and add new item
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
