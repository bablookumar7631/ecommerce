import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { setProductDetails } from '../redux/productSlice';
import { showNotification } from '../redux/notificationSlice';

const Category = () => {

  const dispatch = useDispatch();

  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await axios.get(`https://ecommerce-backend-bv1o.onrender.com/api/v1/products/category/${categoryName}/products`);
        setItems(response.data.items || []);
      } catch (error) {
        setError('Error fetching items');
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryItems();
  }, [categoryName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="md:w-10/12 mx-auto my-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          All Products related to {categoryName}
        </h1>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="bg-white rounded-md overflow-hidden shadow-lg">
              <img
                src={item.prodImage || './product/default.webp'} // use default image if none exists
                alt={item.name}
                className="object-fill h-48 w-96"
              />
              <div className="px-5 pt-2 pb-3">
                <h1 className="text-lg font-semibold">{item.name}</h1>
                <p className="text-slate-500">
                  {item.description.slice(0, 50) || 'No description available.'}...
                </p>
                <div className="space-x-2">
                  <label className="font-bold text-lg">₹{item.discounted_price}</label>
                  <del>₹{item.price}</del>
                  <label className="text-gray-600">({item.discount}%)</label>
                </div>
                <div className="flex gap-2">
                  <Link to={`/product/${item._id}/${item.name.replace(/\s+/g, '-').toLowerCase()}`} 
                    onClick={() => dispatch(setProductDetails(item))}
                    className="text-green-500 border border-green-500 py-2 w-full rounded font-semibold mt-4 text-center">
                        Details
                  </Link>
                  <button onClick={() => {
                    dispatch(addToCart({
                      id: item._id,
                      name: item.name,
                      price: item.discounted_price,
                      quantity: 1,
                      image: item.prodImage
                    }),
                    dispatch(showNotification('Item has been added to your shopping cart.')),
                    );
                  }}
                   className="bg-green-500 py-2 w-full rounded text-white font-semibold mt-4">
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items available for this category</p>
        )}
      </div>
    </div>
  );
};

export default Category;










