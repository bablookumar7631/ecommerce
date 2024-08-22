import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/categories/getAllCategories');
        // Access the categories array from the response object
        setCategories(response.data.categories || []);
      } catch (error) {
        setError('Error fetching categories');
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='bg-white flex gap-16 justify-center items-center py-2 pt-4'>
      {categories.length > 0 ? (
        categories.map((cat) => (
          <div key={cat._id} className='flex flex-col justify-center items-center cursor-pointer' onClick={() => handleCategoryClick(cat.name)}>
            <img src={cat.categoryImage} alt={cat.name} className='w-12 h-12' />
            <p className='flex items-center justify-center pt-1 font-bold text-sm'>{cat.name}</p>
          </div>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
}

export default CategoryBar;




