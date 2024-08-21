// import React from 'react'
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import {useSelector} from 'react-redux';

// const CartItems = () => {

//     const cartItems = useSelector((state) => state.cart.cart);
//     console.log(cartItems);

//   return (
//     <div className='w-10/12 mx-auto my-12 flex gap-6'>
//       <div className='w-3/5 bg-[#F0F8FF] rounded-md p-5'>
//         <h1 className='text-2xl font-bold pb-5'>Your shopping cart</h1>
        
//         <div className='flex gap-5 p-5 bg-slate-300 rounded-md justify-between shadow-md mb-5'>
//             <div className='flex gap-2'>
//                 <img src="./product/prod1.webp" alt="cart-item" width={50} height={50}/>
//                 <div>
//                     <h2 className='text-xl font-semibold'>HP Victus Intel Core i5 12th Gen</h2>
//                     <p className='text-gray-600'>₹140.00 / per item</p>
//                 </div>
//             </div>
//             <div className='flex items-center gap-2 border border-gray-500 rounded p-2' style={{ height: 'fit-content' }}>
//                 <RemoveIcon sx={{backgroundColor: 'gray', borderRadius: '50px', cursor: 'pointer'}}/>
//                     12
//                 <AddIcon sx={{backgroundColor: 'gray', borderRadius: '50px', cursor: 'pointer'}}/>
//             </div>
//             <div>
//                 <button className='border border-gray-500 px-3 rounded text-red-400'>Remove</button>
//                 <p className='text-base font-medium mt-2'>₹1680.00</p>
//             </div>
//         </div>
        
        
//       </div>

//       <div className='w-2/5 bg-slate-500'>
//         helo
//       </div>
//     </div>
//   )
// }

// export default CartItems


import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div className='w-10/12 mx-auto my-12 flex gap-6'>
      <div className='w-3/5 bg-[#F0F8FF] rounded-md p-5'>
        <h1 className='text-2xl font-bold pb-5'>Your shopping cart</h1>
        
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className='flex gap-5 p-5 bg-slate-300 rounded-md justify-between shadow-md mb-5'>
              <div className='flex gap-2'>
                <img src={item.image} alt={item.name} width={50} height={50} />
                <div>
                  <h2 className='text-xl font-semibold'>{item.name}</h2>
                  <p className='text-gray-600'>₹{item.price} / per item</p>
                </div>
              </div>
              <div className='flex items-center gap-2 border border-gray-500 rounded p-2' style={{ height: 'fit-content' }}>
                <RemoveIcon
                  sx={{ backgroundColor: 'gray', borderRadius: '50px', cursor: 'pointer' }}
                  onClick={() => dispatch(removeFromCart({ id: item.id, removeComplete: false }))} // Decrease item quantity
                />
                {item.quantity}
                <AddIcon
                  sx={{ backgroundColor: 'gray', borderRadius: '50px', cursor: 'pointer' }}
                  onClick={() => {
                    if (item.quantity < 10) {
                      dispatch(addToCart({ ...item, quantity: 1 }));
                    }
                  }} // Increase item quantity if less than 10
                />
              </div>
              <div>
                <button
                  className='border border-gray-500 px-3 rounded text-red-400'
                  onClick={() => dispatch(removeFromCart({ id: item.id, removeComplete: true }))}
                >
                  Remove
                </button>
                <p className='text-base font-medium mt-2'>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
            <p className='border border-gray-500 rounded-md py-10 text-2xl justify-center text-center text-gray-400'>Your cart is empty.</p>
        )}
      </div>

      <div className='w-2/5 bg-slate-500'>
        {/* You can add a summary or checkout component here */}
      </div>
    </div>
  );
};

export default CartItems;




