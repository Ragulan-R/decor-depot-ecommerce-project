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
// handle add to cart action
// get values from the payload
// need to check if item is already in the cart
// same item but maybe different colors
// need to confim the stock quantity, so if user keeps adding more of the same it will cap off at 6

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((i) => i.id === id + color)
    if (tempItem) {
      // new array
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
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
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      // overwrite the cart and add new item
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  // if id we pass in doesnt match leave it in cart, if it matches remove it
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      // id is already id + color at this point
      if (item.id === id) {
        // either value increase or decrease
        if (value === 'inc') {
          let newAmount = item.amount + 1
          // new to make sure in stock
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          // new to make sure in stock
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      } else {
        return item
      }
    })
    return { ...state, cart: tempCart }
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
