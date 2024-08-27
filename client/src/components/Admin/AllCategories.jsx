import React, { useState, useEffect } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const columns = [
    { id: 'categoryImage', label: 'Category Image' },
    { id: 'name', label: 'Name' },
    { id: 'action', label: 'Action' }
];

const AllCategories = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/categories/getAllCategories');
                if (response.data && response.data.categories) {
                    setRows(response.data.categories); // Update this line to access the categories array
                } else {
                    console.error("Unexpected data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                                <TableCell>
                                    <IconButton>
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
        </div>
    );
};

export default AllCategories;



