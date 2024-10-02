import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Grid, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'productImage', label: 'Product Image' },
  { id: 'productName', label: 'Product Name' },
  { id: 'price', label: 'Price' },
  { id: 'discount', label: 'Discount' },
  { id: 'category', label: 'Category' },
  { id: 'action', label: 'Action' }
];

const Products = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/products/getAllProducts');
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/v1/products/delete-product/${productId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
  
        if (response.data.success) {
          // Update the products state after deletion
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
          alert("Product deleted successfully");
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      }
    }
  };

  return (
    <div>
      <Grid item xs={12} sx={{ width: 8/12, mx: 'auto', mt: 2 }}>
        <Typography variant="h6">All Products</Typography>
      </Grid>
      <TableContainer component={Paper} sx={{ width: 8/12, mx: 'auto', mt: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#bbdefb' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontSize: '1rem' }}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img 
                    src={product.prodImage || 'fallback-image-url.jpg'}
                    alt={product.name} 
                    style={{ width: 40, height: 40, borderRadius: '5%' }} 
                  />
                </TableCell>
                <TableCell>{product.name.slice(0, 30) || 'N/A'}...</TableCell>
                <TableCell>₹ {product.price || 'N/A'}</TableCell>
                <TableCell>{product.discount || 'N/A'}%</TableCell>
                <TableCell>{product.category?.name || 'N/A'}</TableCell>
                <TableCell sx={{display:'flex', gap:'12px'}}>
                  <IconButton>
                    <EditNoteIcon color="primary"/>
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product._id)}>
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Products;