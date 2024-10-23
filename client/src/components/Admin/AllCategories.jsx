import React, { useState, useEffect } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    IconButton,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import UpdateCategory from './UpdateCategory'; // Import the UpdateCategory component

const columns = [
    { id: 'categoryImage', label: 'Category Image' },
    { id: 'category', label: 'Category' },
    { id: 'action', label: 'Action' }
];

const AllCategories = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCategory, setSelectedCategory] = useState(null); // To track the category for editing
    const [openDialog, setOpenDialog] = useState(false); // To control the dialog open state

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://ecommerce-backend-bv1o.onrender.com/api/v1/categories/getAllCategories');
                if (response.data && response.data.categories) {
                    setRows(response.data.categories);
                } else {
                    console.error("Unexpected data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Function to delete a category
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const response = await axios.delete(`https://ecommerce-backend-bv1o.onrender.com/api/v1/categories/deleteCategory/${categoryId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (response.data.success) {
                    setRows((prevRows) => prevRows.filter((row) => row._id !== categoryId));
                    alert("Category deleted successfully");
                } else {
                    alert("Failed to delete category");
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Error deleting category");
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category); // Set the selected category for editing
        setOpenDialog(true); // Open the dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
        setSelectedCategory(null); // Clear the selected category
    };

    // Function to update a category in the local state
    const updateCategory = (updatedCategory) => {
        setRows((prevRows) => 
            prevRows.map((row) => 
                row._id === updatedCategory._id ? updatedCategory : row
            )
        );
    };

    return (
        <div className='mb-12 mt-8'>
            <Grid item xs={12} sx={{ width: '66.60%', mx: 'auto', mt: 2 }}>
                <Typography variant="h6">All Categories</Typography>
            </Grid>
            <TableContainer component={Paper} sx={{ width: '66.60%', mx: 'auto', mt: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#bbdefb' }}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} sx={{ fontSize: '1rem' }}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>
                                    {row.categoryImage ? (
                                        <img src={row.categoryImage} alt={row.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                    ) : 'No Image'}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell sx={{ display: 'flex', gap: '12px' }}>
                                    <IconButton onClick={() => handleEditCategory(row)}>
                                        <EditNoteIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteCategory(row._id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Dialog for UpdateCategory */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Update Category</DialogTitle>
                <DialogContent>
                    {selectedCategory && (
                        <UpdateCategory 
                            category={selectedCategory} 
                            onClose={handleCloseDialog} 
                            updateCategory={updateCategory} // Pass the update function
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllCategories;


