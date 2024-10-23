import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { setProductDetails } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { showNotification } from '../redux/notificationSlice';

const SearchResults = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.product.productDetails);
    const location = useLocation(); // To track URL changes

    const query = new URLSearchParams(location.search).get('q'); // Get the search query

    useEffect(() => {
        const fetchProducts = async () => {
            if (!query) return;

            try {
                setLoading(true);
                const response = await axios.get(`https://ecommerce-backend-bv1o.onrender.com/api/v1/products/search?query=${query}`);
                if (response.data.success) {
                    dispatch(setProductDetails(response.data.products));
                } else {
                    setError('No products found');
                }
            } catch (err) {
                setError('Error fetching products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query, dispatch]); // Re-run the effect when the query changes

    if (error) return <p>{error}</p>;

    return (
        <div className="md:w-10/12 mx-auto my-12">
            {query && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold">
                        Your search for <span className="text-green-500">"{query}"</span>
                    </h2>
                    <p className="text-gray-500">Here are the products related to your search:</p>
                </div>
            )}
            
            <Grid container spacing={4}>
                {loading ? (
                    Array.from(new Array(8)).map((_, index) => (
                        <Grid item key={index} xs={12} sm={6} md={3}>
                            <Skeleton variant="rectangular" width="100%" height={200} />
                            <Box pt={0.5}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    productDetails && productDetails.length > 0 ? (
                        productDetails.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={3}>
                                <Box className="bg-white rounded-md overflow-hidden shadow-lg">
                                    <img
                                        src={product.prodImage}
                                        alt={product.name}
                                        className="object-fill h-48 w-full"
                                    />
                                    <div className="px-5 pt-2 pb-3">
                                        <h1 className="text-lg font-semibold">{product.name}</h1>
                                        <p className="text-slate-500 text-sm mt-2 mb-4">
                                            {product.description.slice(0, 60) || 'No description available.'}...
                                        </p>
                                        <div className="space-x-2">
                                            <label className="font-bold text-lg">
                                                ₹{product.discounted_price}
                                            </label>
                                            <del>₹{product.price}</del>
                                            <label className="text-gray-600">({product.discount}%)</label>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <Link to={`/product/${product._id}/${product.name.replace(/\s+/g, '-').toLowerCase()}`} 
                                                onClick={() => dispatch(setProductDetails(product))}
                                                className="text-green-500 border border-green-500 py-2 w-full rounded font-semibold text-center block">
                                                Details
                                            </Link>
                                            <button onClick={() => {
                                                dispatch(addToCart({
                                                    id: product._id,
                                                    name: product.name,
                                                    price: product.discounted_price,
                                                    quantity: 1,
                                                    image: product.prodImage
                                                }),
                                                dispatch(showNotification('Item has been added to your shopping cart.')),
                                                );
                                            }} className="bg-green-500 py-2 w-full rounded text-white font-semibold">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <div className='w-full mx-auto my-12'>
                            <p className='border border-gray-500 rounded-md py-10 text-2xl justify-center text-center text-gray-400'>
                                No products found for "{query}"
                            </p>
                        </div>
                    )
                )}
            </Grid>
        </div>
    );
};

export default SearchResults;

