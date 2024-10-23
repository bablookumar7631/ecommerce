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
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../redux/notificationSlice';

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  console.log(cartItems);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // const gst = 20.00;
  const gstRate = 0.18; // GST rate of 18%
  // Calculate GST based on totalPrice
  const gst = Number((totalPrice * gstRate).toFixed(2));

  const shippingCharge = 12.00; // Example shipping charge value
  
  const deliveryCharge = totalPrice < 500 ? 25 : 0;
  const totalAmount = (totalPrice + gst + shippingCharge + deliveryCharge).toFixed(2);


  // payment integratiopn
  const makePayment = async () => {
    if(!user){
      navigate('/sign-in');
      return;
    }

    if(!user.address || user.address === '' || !user.pincode || user.pincode === '' || !user.state || user.state === ''){
      navigate('/user-profile');
      dispatch(showNotification('Add your delivery address'));
      return;
    }


    try {
      const stripe = await loadStripe('pk_test_51Q6p3wHWr6tD3md2CLrV5zWSpTSVxIEVh678I1BnrrLwscdLObkNjYxteHoZFOUArvDFX035tOgPNA1pIfetKicH00H2H69KEi');

      // Prepare the request body
      const body = {
        products: cartItems,
        user: user,
        totalAmount: totalAmount*100,
        gst: parseFloat(gst),
        shippingCharge: shippingCharge,
        deliveryCharge: deliveryCharge
      };

      const res = await axios.post('https://ecommerce-backend-bv1o.onrender.com/api/v1/payments/create-checkout-session', body, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const session = res.data;

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId, // Using session.sessionId here
      });

      if (result.error) {
        console.error(result.error.message);
      }else{
        localStorage.setItem('paymentAmount', totalAmount);
        navigate('/payment-successful');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };
  

  return (
    <div className='md:w-10/12 mx-auto my-12 md:flex gap-6 w-11/12'>
      <div className='md:w-3/5 bg-[#F0F8FF] rounded-md p-5'>
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
          <p className='border border-gray-500 rounded-md py-12 text-2xl justify-center text-center text-gray-400'>Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className='h-60 md:w-2/5 bg-[#F0F8FF] rounded-md p-5 md:mt-0 mt-8'>
        <div className='flex justify-between'>
            <p>Total Price: </p>
            <p>₹{totalPrice.toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
            <p>GST(18%): </p>
            <p>₹{gst.toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
            <p>shipping charge: </p>
            <p>₹{shippingCharge.toFixed(2)}</p>
        </div>

        <div className='flex justify-between'>
            <p>delivery charge: </p>
            <p>₹{deliveryCharge.toFixed(2)}</p>
        </div>

        <hr style={{ backgroundColor: 'gray', height: '1px', border: 'none', marginTop: '8px' }} />

        <div className='flex justify-between pt-2 font-semibold text-slate-600'>
            <p>Total Amount: </p>
            <p>₹{totalAmount}</p>
        </div>

        <button className='w-full bg-green-500 py-2 mt-6 rounded-md text-white text-lg font-semibold hover:bg-green-400' onClick={makePayment}>Make Payment</button>
      </div>
      ) : (
        <div className='md:w-2/5 rounded-md p-5 md:mt-0 mt-8 mb-8'>
          <div className="flex justify-center items-center h-full">
            <img className="w-8/12 opacity-85" src="./images/emptyCart.png" alt="emptyCart png" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;



