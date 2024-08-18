import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Grid, Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    discount: '',
    discounted_price: '',
    prodImage: null,
  });

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/categories/getAllCategories');
        setCategories(response.data.categories);
      } catch (error) {
        toast.error("Error fetching categories")
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // Calculate the discounted price whenever price or discount changes
    if (name === 'price' || name === 'discount') {
      const price = parseFloat(updatedData.price) || 0;
      const discount = parseFloat(updatedData.discount) || 0;
      const discounted_price = price - (price * discount) / 100;
      updatedData.discounted_price = discounted_price.toFixed(2);
    }

    setFormData(updatedData);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, prodImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post('http://localhost:8000/api/v1/products/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // reset the form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          discount: '',
          discounted_price: '',
          prodImage: null,
        });
      }
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ width: 6 / 12, mx: 'auto', mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Add New Product</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            required
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            required
            value={formData.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            required
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Discount (%)"
            name="discount"
            type="number"
            fullWidth
            value={formData.discount}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Discounted Price"
            name="discounted_price"
            type="number"
            fullWidth
            value={formData.discounted_price}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginBottom: 2, bgcolor: 'gray' }}
          >
            Upload Product Image
            <input
              type="file"
              name="prodImage"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddProduct;


