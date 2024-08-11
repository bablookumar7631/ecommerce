import React from 'react'
import Layout from './Layout'
import Carousel from './Carousel'
import CategoryBar from './CategoryBar'

const Home = () => {
  return (
    <Layout>
      <CategoryBar/>
      <Carousel/>
    </Layout>
  )
}

export default Home
