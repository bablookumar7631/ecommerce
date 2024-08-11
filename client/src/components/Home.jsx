import React from 'react'
import Layout from './Layout'
import Carousel from './Carousel'
import CategoryBar from './CategoryBar'
import ProductItems from './ProductItems'

const Home = () => {
  return (
    <Layout>
      <CategoryBar/>
      <Carousel/>
      <ProductItems/>
    </Layout>
  )
}

export default Home
