import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// checkmark for the color selected
import { FaCheck } from 'react-icons/fa'
// where add to cart function is coming from
import { useCartContext } from '../context/cart_context'
// the plus and minus buttons
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  // destructure the id, color, stock
  const { id, colors, stock } = product
  console.log(colors)
  // 2 state values, 1 for the amount and 1 for colors
  const [mainColor, setMainColor] = useState(colors[0])

  return (
    <Wrapper>
      <div className='colors'>
        <span>colors :</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                className={`${
                  mainColor === color ? 'color-btn active' : 'color-btn'
                }`}
                key={index}
                // background is now dynamic
                style={{ background: color }}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className='btn-container'></div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
