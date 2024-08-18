import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper,Grid,Typography } from '@mui/material';

const rows = [
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
  { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
];

const columns = [
  { id: 'profilePhoto', label: 'Profile Photo' },
  { id: 'name', label: 'Name' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'email', label: 'Email' },
  { id: 'state', label: 'State' },
];

const Customers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Grid item xs={12} sx={{ width: 8/12, mx: 'auto', mt: 2 }}>
        <Typography variant="h6">Customers</Typography>
      </Grid>
      <TableContainer component={Paper} sx={{ width: 8/12, mx: 'auto', mt: 2 }}>
      <Table>
        <TableHead sx={{bgcolor: '#bbdefb'}}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} sx={{ fontSize: '1rem' }}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src={row.profilePhoto} alt={row.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.state}</TableCell>
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

export default Customers;


