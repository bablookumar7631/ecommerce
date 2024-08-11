import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav className='bg-gray-200 p-2 px-10'>
        <div className='flex justify-between'>
        <Link to={'/'}><img src="./images/ecommerce.png" alt="website-logo" className='w-12 h-12'/></Link>
        <ul className='flex items-center gap-6 md:text-[17px]'>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/product'}>Product</Link></li>
            <li><Link to={'sign-in'}><Button variant="outlined">SignIn</Button></Link></li>
            <li><Link to={'sign-up'}><Button variant="contained">SignUp</Button></Link></li>
        </ul>
        </div>
      </nav>
    </div>
  )
}

export default Layout
