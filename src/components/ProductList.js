import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  // invoke the filtercontext hook, giving filtered products alias of products
  const { filtered_products: products, grid_view } = useFilterContext()
  // if empty array then none found msg
  if (products.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry, no products found</h5>
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <GridView products={products}>product list</GridView>
}

export default ProductList
