import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  // invoke the filtercontext hook, giving filtered products alias of products
  const { filtered_products: products } = useFilterContext()
  return <GridView products={products}>product list</GridView>
}

export default ProductList
