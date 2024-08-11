import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Product from './components/Product';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/sign-in' element={<Signin/>} />
        <Route path='/sign-up' element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

