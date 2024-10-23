// import React from "react";

// const ProductItems = () => {
//   const products = [
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 50,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 15,
//       thumbnail: "./product/prod1.webp",
//     },
//     {
//       title: "New blue shirts mens",
//       price: 1200,
//       discount: 16,
//       thumbnail: "./product/prod1.webp",
//     },
//   ];

//   return (
//     <div className="md:w-10/12 mx-auto my-12">
//       <div className="flex flex-col justify-center items-center">
//         <h1 className="text-3xl font-bold text-center">Products</h1>
//         <p className="text-center mx-auto text-gray-600 md:w-7/12 mt-2 mb-16">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
//           illum officia eum expedita recusandae! Nisi, eveniet vitae! Dicta,
//           optio quos. Architecto animi alias amet iste libero, officiis
//           dignissimos dolorum reiciendis.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-4 gap-8">
//         {
//             products.map((item, index) => {
//             return (
//                 <div key={index} className="bg-white rounded-md overflow-hidden shadow-lg">
//                 <img
//                     src="./product/prod1.webp"
//                     alt=""
//                     className="object-fill h-48 w-96"
//                 />
//                 <div className="px-5 pt-2 pb-3">
//                     <h1 className="text-lg font-semibold">{item.title}</h1>
//                     <p className="text-slate-500">
//                     utility to display an element’s content at its original size
//                     ignoring the container size.
//                     </p>
//                     <div className="space-x-2">
//                     <label className="font-bold text-lg">
//                         ₹{item.price - (item.price * item.discount) / 100}
//                     </label>
//                     <del>₹{item.price}</del>
//                     <label className="text-gray-600">({item.discount}%)</label>
//                     </div>
//                     <div className="flex gap-2">
//                     <button className="text-green-500 border border-green-500 py-2 w-full rounded  font-semibold mt-4">
//                         details
//                     </button>
//                     <button className="bg-green-500 py-2 w-full rounded text-white font-semibold mt-4">
//                         add to cart
//                     </button>
//                     </div>
//                 </div>
//                 </div>
//             );
//             })
//         }

//       </div>
//     </div>
//   );
// };

// export default ProductItems;




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/cartSlice';
import { setProductDetails } from '../redux/productSlice';
import { showNotification } from "../redux/notificationSlice";

const ProductItems = () => {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-bv1o.onrender.com/api/v1/products/getAllProducts');
        setProducts(response.data.products || []);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="md:w-10/12 mx-auto my-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Products</h1>
        <p className="text-center mx-auto text-gray-600 md:w-7/12 mt-2 mb-16">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          illum officia eum expedita recusandae! Nisi, eveniet vitae! Dicta,
          optio quos. Architecto animi alias amet iste libero, officiis
          dignissimos dolorum reiciendis.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {products.map((item) => (
          <div key={item._id} className="bg-white rounded-md overflow-hidden shadow-lg">
            <img
              src={item.prodImage}
              alt={item.name}
              className="object-fill h-48 w-full" // Ensure the image fits the container
            />
            <div className="px-5 pt-2 pb-3">
              <h1 className="text-lg font-semibold">{item.name}</h1>
              <p className="text-slate-500 text-sm mt-2 mb-4">
                  {item.description.slice(0, 60) || 'No description available.'}...
              </p>
              <div className="space-x-2">
                <label className="font-bold text-lg">
                  ₹{item.discounted_price}
                </label>
                <del>₹{item.price}</del>
                <label className="text-gray-600">({item.discount}%)</label>
              </div>
              <div className="flex gap-2 mt-4">
                <Link to={`/product/${item._id}/${item.name.replace(/\s+/g, '-').toLowerCase()}`} 
                onClick={() => dispatch(setProductDetails(item))}
                className="text-green-500 border border-green-500 py-2 w-full rounded font-semibold text-center block">
                    Details
                </Link>

                <button onClick={()=>{
                  dispatch(addToCart({
                    id: item._id,
                    name: item.name,
                    price: item.discounted_price,
                    quantity: 1,
                    image: item.prodImage
                    }),
                    dispatch(showNotification('Item has been added to your shopping cart.'))
                  );
                }} className="bg-green-500 py-2 w-full rounded text-white font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductItems;


