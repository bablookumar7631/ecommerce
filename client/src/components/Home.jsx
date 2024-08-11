import React from 'react'
import Carousel from './Carousel'
import CategoryBar from './CategoryBar'
import ProductItems from './ProductItems'

const Home = () => {
  return (
    <div>
      <CategoryBar/>
      <Carousel/>
      <ProductItems/>
    </div>
  )
}

export default Home
