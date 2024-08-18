import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        categoryImage: null,
    });

    // Handle text input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input changes
    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            categoryImage: e.target.files[0],
        });
    };

    // Reset the form
    const resetForm = () => {
        setFormData({
            name: '',
            categoryImage: null,
        });
        // Clear the file input field
        document.querySelector('input[name="categoryImage"]').value = ''; 
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('categoryImage', formData.categoryImage);

        try {
            const response = await axios.post('http://localhost:8000/api/v1/categories/categories', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                resetForm(); // Clear the form on successful submission
            } else {
                toast.error('Submission failed');
            }
        } catch (error) {
            console.error('Error uploading category:', error);
            toast.error('Error uploading category');
        }
    };

    return (
        <Grid container spacing={3} sx={{ width: '50%', mx: 'auto', mt: 2 }}>
            <Grid item xs={12}>
                <Typography variant="h6">Add New Category</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ marginBottom: 2, bgcolor: 'gray',
                      '&:hover': {
                          bgcolor: 'silver',
                        },
                    }}
                >
                    Upload Category Image
                    <input
                        type="file"
                        name="categoryImage"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default AddCategory;
