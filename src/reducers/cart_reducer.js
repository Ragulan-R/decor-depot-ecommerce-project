import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

// if item is not in cart create a new one
// if already in cart, iterate over the cart, check where the item is via id and color, increase the amount
// if it doesnt match, dont do anything and return to array
// if amount bigger than max, set to max amount

const cart_reducer = (state, action) => {
  // handle add to cart action
  if (action.type === ADD_TO_CART) {
    // get values from the payload
    const { id, color, amount, product } = action.payload
    // need to check if item is already in the cart
    // same item but maybe different colors
    const tempItem = state.cart.find((i) => i.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          // need to confim the stock quantity, so if user keeps adding more of the same it will cap off at 6
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
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
