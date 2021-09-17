export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

// accepts all products and string type
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  console.log(unique)
  // color is an array in the api
  if (type === 'colors') {
    unique = unique.flat()
    // get array instead of array of arrays
  }

  // create new array with property of all:, spread it out,set - data type that gets me unique values/ categories
  return ['all', ...new Set(unique)]
}
