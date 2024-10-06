// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper,Grid,Typography } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// const rows = [
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA',  },
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
//   { name: 'John Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', profilePhoto: 'https://via.placeholder.com/40', state: 'CA' },
// ];

// const columns = [
//   { id: 'profilePhoto', label: 'Profile Photo' },
//   { id: 'name', label: 'Name' },
//   { id: 'phoneNumber', label: 'Phone Number' },
//   { id: 'email', label: 'Email' },
//   { id: 'state', label: 'State' },
//   { id: 'action', label: 'Action' }
// ];

// const Customers = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div>
//       <Grid item xs={12} sx={{ width: 8/12, mx: 'auto', mt: 2 }}>
//         <Typography variant="h6">Customers</Typography>
//       </Grid>
//       <TableContainer component={Paper} sx={{ width: 8/12, mx: 'auto', mt: 2 }}>
//       <Table>
//         <TableHead sx={{bgcolor: '#bbdefb'}}>
//           <TableRow>
//             {columns.map((column) => (
//               <TableCell key={column.id} sx={{ fontSize: '1rem' }}>{column.label}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <img src={row.profilePhoto} alt={row.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
//               </TableCell>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.phoneNumber}</TableCell>
//               <TableCell>{row.email}</TableCell>
//               <TableCell>{row.state}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       </TableContainer>
//     </div>
//   );
// };

// export default Customers;


import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Grid, Typography, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const columns = [
  { id: 'profilePhoto', label: 'Profile Photo' },
  { id: 'name', label: 'Name' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'email', label: 'Email' },
  { id: 'state', label: 'State' },
  { id: 'action', label: 'Action' }
];

const Customers = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/getAllUsers', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setRows(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/v1/users/deleteUser/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (response.data.success) {
          setRows((prevRows) => prevRows.filter((row) => row._id !== userId));
          alert("User deleted successfully");
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user");
      }
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div>
      <Grid item xs={12} sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', mt: 2 }}>
        <Typography variant="h6" gutterBottom>Customers</Typography>
      </Grid>
      <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', mt: 2 }}>
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
                  <img src={row.profilePhoto} alt={row.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                </TableCell>
                <TableCell>{row.firstName} {row.lastName}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteUser(row._id)}>
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

export default Customers;