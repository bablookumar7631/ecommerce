import React, { useState } from 'react';
import { TextField, Button, Box, Avatar } from '@mui/material';
import axios from 'axios';

const UpdateCategory = ({ category, onClose, updateCategory }) => {
    const [name, setName] = useState(category.name);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(category.categoryImage);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    };

    // Function to update the category
    const handleUpdateCategory = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('categoryImage', image); // Append the selected image only if one is selected
        }

        try {
            const response = await axios.put(
                `https://ecommerce-backend-bv1o.onrender.com/api/v1/categories/categories/updateCategory/${category._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                alert('Category updated successfully');
                // Update the local state in the parent component
                updateCategory({ ...category, name, categoryImage: previewImage }); 
                onClose(); // Close the dialog after updating
            } else {
                alert('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Error updating category');
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <TextField
                label="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* Image Preview */}
            <Avatar src={previewImage} alt={category.name} sx={{ width: 100, height: 100, mb: 2 }} />

            {/* File Input for Image Selection */}
            <Button variant="contained" component="label" color="primary">
                Select Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
                    Update
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default UpdateCategory;






