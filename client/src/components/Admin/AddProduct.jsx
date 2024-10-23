import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Grid, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { productId } = useParams(); // Get productId from the route
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    discount: "",
    discounted_price: "",
    prodImage: null,
  });

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-backend-bv1o.onrender.com/api/v1/categories/getAllCategories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();

    // If productId exists, fetch the product details for editing
    if (productId) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(
            `https://ecommerce-backend-bv1o.onrender.com/api/v1/products/getproductbyid/${productId}`
          );
          const productData = response.data.product;
          setFormData({
            ...productData,
            category: productData.category._id, // Ensure category is set correctly
          });
        } catch (error) {
          toast.error("Failed to load product details");
        }
      };

      fetchProductDetails();
    }
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "price" || name === "discount") {
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

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });

    try {
      if (productId) {
        // Update the product
        const response = await axios.put(
          `https://ecommerce-backend-bv1o.onrender.com/api/v1/products/update-product/${productId}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          toast.success("Product updated successfully");
          navigate("/admin/products"); // Go back to products after updating
        }
      } else {
        // Add a new product
        const response = await axios.post(
          "https://ecommerce-backend-bv1o.onrender.com/api/v1/products/products",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          toast.success("Product created successfully");
          navigate("/admin/products");
        }
      }
    } catch (error) {
      toast.error("Failed to submit product");
    }
  };

  const handleCancel = () => {
    navigate("/admin/products"); // Go back to the product list without saving
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ width: 6 / 12, mx: "auto", mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {productId ? "Update Product" : "Add New Product"}
          </Typography>
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
            sx={{ marginBottom: 2, bgcolor: "gray" }}
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
          <Button variant="contained" color="primary" fullWidth type="submit">
            {productId ? "Update" : "Submit"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddProduct;
