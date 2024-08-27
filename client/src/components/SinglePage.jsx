// import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// const SinglePage = () => {
//     const [value, setValue] = useState(2);
//   return (
//     <div className='md:w-9/12 mx-auto my-12 gap-6 w-11/12'>
//       <div className='flex gap-10'>
//         <div className='flex flex-col'>
//             <div className='w-80'>
//                 <img src="./product/prod1.webp" alt="" height={'400px'} />
//             </div>
//             <button className="bg-green-500 py-2 w-full rounded text-white font-semibold mt-5">
//                   Add to Cart
//             </button>
//         </div>

//         <div className='flex flex-col gap-3'>
//             <h1 className="text-2xl font-semibold">Whirlpool 7 kg Magic Clean 5 Star Fully Automatic Top Load Washing Machine</h1>
//             <div className='flex gap-3'>
//                 <Box>
//                     <Rating name="read-only" value={value} readOnly />
//                 </Box>
//                 <p>(120) Review</p>
//             </div>
//             <div className="space-x-2">
//                 <label className="font-bold text-lg">
//                   ₹1200
//                 </label>
//                 <del>₹150</del>
//                 <label className="text-gray-600">(15%)</label>
//             </div>
//             <div>
//                 <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas reprehenderit maiores cumque eum soluta, recusandae, iusto odit inventore beatae reiciendis quis assumenda iure sapiente pariatur laborum numquam optio sint deleniti porro nemo. Harum voluptatem cupiditate omnis reprehenderit, fugit beatae temporibus ducimus at deleniti a mollitia accusamus labore voluptates nulla? Nihil rerum id praesentium quo, quidem debitis qui suscipit facere totam officiis dolorum distinctio quaerat enim magni illo corrupti odit maxime in incidunt. Beatae sed vel ducimus consectetur! Beatae repellat in accusamus iure veritatis eligendi doloribus asperiores minima quibusdam sequi ut quasi, quis, corrupti facilis inventore numquam modi. Omnis, repudiandae voluptatem!</p>
//             </div>
//             <div className="flex gap-3 mt-4">
//                 <div className='flex items-center justify-evenly gap-2 border border-gray-500 rounded p-2 w-40' style={{ height: 'fit-content' }}>
//                     <RemoveIcon
//                     sx={{ backgroundColor: '#b0b7c0', borderRadius: '50px', cursor: 'pointer' }}
//                     />
//                     10
//                     <AddIcon
//                     sx={{ backgroundColor: '#b0b7c0', borderRadius: '50px', cursor: 'pointer' }}
//                     />
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SinglePage



// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// const SinglePage = () => {
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.product.productDetails);  // Access product details from Redux
//   const [quantity, setQuantity] = useState(1);
//   const [value, setValue] = useState(2);

//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart({
//         id: product._id,
//         name: product.name,
//         price: product.discounted_price,
//         quantity: quantity,
//         image: product.prodImage
//       }));
//     }
//   };

//   const handleIncreaseQuantity = () => {
//     if (quantity < 10) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const handleDecreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   return (
//     <div className='md:w-9/12 mx-auto my-12 gap-6 w-11/12'>
//       <div className='flex gap-10'>
//         <div className='flex flex-col'>
//           <div className='w-80'>
//             <img src={product.prodImage} alt={product.name} height={'400px'} />
//           </div>
//           <button 
//             className="bg-green-500 py-2 w-full rounded text-white font-semibold mt-5"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </button>
//         </div>

//         <div className='flex flex-col gap-3'>
//           <h1 className="text-2xl font-semibold">{product.name}</h1>
//           <div className='flex gap-3'>
//             <Box>
//               <Rating name="read-only" value={value} readOnly />
//             </Box>
//             <p>(120) Review</p>
//           </div>
//           <div className="space-x-2">
//             <label className="font-bold text-lg">₹{product.discounted_price}</label>
//             <del>₹{product.price}</del>
//             <label className="text-gray-600">({product.discount}%)</label>
//           </div>
//           <div>
//             <p className='text-gray-500'>{product.description}</p>
//           </div>
//           <div className="flex gap-3 mt-4">
//             <div className='flex items-center justify-evenly gap-2 border border-gray-500 rounded p-2 w-40' style={{ height: 'fit-content' }}>
//               <RemoveIcon
//                 sx={{ backgroundColor: '#b0b7c0', borderRadius: '50px', cursor: 'pointer' }}
//                 onClick={handleDecreaseQuantity}
//               />
//               {quantity}
//               <AddIcon
//                 sx={{ backgroundColor: '#b0b7c0', borderRadius: '50px', cursor: 'pointer' }}
//                 onClick={handleIncreaseQuantity}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SinglePage;



import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SinglePage = () => {
  const { id, name } = useParams();  // Access the URL parameters
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productDetails);  // Access product details from Redux
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState(2);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product._id,
        name: product.name,
        price: product.discounted_price,
        quantity: quantity,
        image: product.prodImage
      }));
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product || product._id !== id) {
    return <p>Product not found</p>;
  }

  return (
    <div className='md:w-9/12 mx-auto my-12 gap-6 w-11/12'>
      <div className='flex gap-10'>
        <div className='flex flex-col'>
          <div className='w-80'>
            <img src={product.prodImage} alt={product.name} height={'400px'} />
          </div>
          <button 
            className="bg-green-500 py-2 w-full rounded text-white font-semibold mt-5"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        <div className='flex flex-col gap-3'>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className='flex gap-3'>
            <Box>
              <Rating name="read-only" value={value} readOnly />
            </Box>
            <p>(120) Review</p>
          </div>
          <div className="space-x-2">
            <label className="font-bold text-lg">₹{product.discounted_price}</label>
            <del>₹{product.price}</del>
            <label className="text-gray-600">({product.discount}%)</label>
          </div>
          <div>
            <p className='text-gray-500'>{product.description}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <div className='flex items-center justify-evenly gap-2 border border-gray-500 rounded p-2 w-40' style={{ height: 'fit-content' }}>
              <RemoveIcon
                sx={{ backgroundColor: '#b0b7c0', borderRadius: '50px', cursor: 'pointer' }}
                onClick={handleDecreaseQuantity}
              />
              {quantity}
              <AddIcon
                sx={{ backgroundColor: '#b0b7c0', borderRadius: '50px', cursor: 'pointer' }}
                onClick={handleIncreaseQuantity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
