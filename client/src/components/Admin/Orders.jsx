// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Grid, Typography, IconButton } from '@mui/material';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';

// const columns = [
//   { id: 'orderId', label: 'Order ID' },
//   { id: 'customerName', label: 'Customer Name' },
//   { id: 'product', label: 'Product' },
//   { id: 'quantity', label: 'Quantity' },
//   { id: 'total', label: 'Total' },
//   { id: 'status', label: 'Status' },
//   { id: 'date', label: 'Date' },       // Added Date column
//   { id: 'delivery', label: 'Delivery' }, // Added Delivery column (Free or N/A)
//   { id: 'location', label: 'Location' }, // Added Location column
//   { id: 'action', label: 'Action' }
// ];

// // Static order data
// const orders = [
//   { _id: '1', customerName: 'John Doe', product: 'Laptop', quantity: 1, total: 800, status: 'Shipped', date: '2024-10-01', delivery: 'Free', location: 'New York' },
//   { _id: '2', customerName: 'Jane Smith', product: 'Phone', quantity: 2, total: 1200, status: 'Delivered', date: '2024-09-29', delivery: 'N/A', location: 'Los Angeles' },
//   { _id: '3', customerName: 'Alice Johnson', product: 'Headphones', quantity: 3, total: 150, status: 'Processing', date: '2024-10-02', delivery: 'Free', location: 'Chicago' },
//   { _id: '4', customerName: 'Michael Brown', product: 'Monitor', quantity: 1, total: 300, status: 'Cancelled', date: '2024-09-30', delivery: 'N/A', location: 'Houston' },
//   { _id: '5', customerName: 'Chris Green', product: 'Keyboard', quantity: 2, total: 100, status: 'Delivered', date: '2024-09-28', delivery: 'Free', location: 'Phoenix' },
//   { _id: '6', customerName: 'Emily White', product: 'Mouse', quantity: 1, total: 50, status: 'Shipped', date: '2024-10-03', delivery: 'N/A', location: 'San Francisco' }
// ];

// const Orders = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page when rows per page change
//   };

//   const handleEditOrder = (orderId) => {
//     alert(`Edit order ${orderId}`);
//   };

//   const handleDeleteOrder = (orderId) => {
//     if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
//       alert(`Order ${orderId} deleted successfully.`);
//     }
//   };

//   return (
//     <div>
//       <Grid item xs={12} sx={{ width: 8 / 12, mx: 'auto', mt: 2 }}>
//         <Typography variant="h6">All Orders</Typography>
//       </Grid>
//       <TableContainer component={Paper} sx={{ width: 8 / 12, mx: 'auto', mt: 2 }}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#bbdefb' }}>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} sx={{ fontSize: '1rem' }}>{column.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order._id}</TableCell>
//                 <TableCell>{order.customerName}</TableCell>
//                 <TableCell>{order.product}</TableCell>
//                 <TableCell>{order.quantity}</TableCell>
//                 <TableCell>₹ {order.total}</TableCell>
//                 <TableCell>{order.status}</TableCell>
//                 <TableCell>{order.date}</TableCell> {/* Date field */}
//                 <TableCell>{order.delivery}</TableCell> {/* Delivery field */}
//                 <TableCell>{order.location}</TableCell> {/* Location field */}
//                 <TableCell sx={{ display: 'flex', gap: '12px' }}>
//                   <IconButton onClick={() => handleEditOrder(order._id)}>
//                     <EditNoteIcon color="primary" />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteOrder(order._id)}>
//                     <DeleteIcon color="error" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={orders.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </div>
//   );
// };

// export default Orders;


// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, Select, MenuItem } from '@mui/material';

// const columns = [
//   { id: 'orderId', label: 'Order ID' },
//   { id: 'customerName', label: 'Customer Name' },
//   { id: 'product', label: 'Product' },
//   { id: 'quantity', label: 'Quantity' },
//   { id: 'total', label: 'Total' },
//   { id: 'orderDate', label: 'Order Date' },
//   { id: 'delivery', label: 'Delivery' },
//   { id: 'location', label: 'Location' },
//   { id: 'status', label: 'Status' } // Status column
// ];

// const Orders = () => {
//   const [orders, setOrders] = useState([
//     {
//       _id: '1',
//       orderId: 'ORD001',
//       customerName: 'John Doe',
//       product: 'Laptop',
//       quantity: 2,
//       total: 1500,
//       date: '2024-09-30',
//       delivery: 'Free',
//       location: 'New York',
//       status: 'Pending'
//     },
//     {
//       _id: '2',
//       orderId: 'ORD002',
//       customerName: 'Jane Smith',
//       product: 'Headphones',
//       quantity: 1,
//       total: 200,
//       date: '2024-10-01',
//       delivery: 'N/A',
//       location: 'Los Angeles',
//       status: 'Shipped'
//     }
//   ]); // Static data for demonstration

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleStatusChange = (event, orderId) => {
//     const updatedOrders = orders.map((order) =>
//       order._id === orderId ? { ...order, status: event.target.value } : order
//     );
//     setOrders(updatedOrders);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div>
//       <Grid item xs={12} sx={{ width: 8 / 12, mx: 'auto', mt: 2 }}>
//         <Typography variant="h6">All Orders</Typography>
//       </Grid>
//       <TableContainer component={Paper} sx={{ width: 8 / 12, mx: 'auto', mt: 2 }}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#bbdefb' }}>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} sx={{ fontSize: '1rem' }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order.orderId}</TableCell>
//                 <TableCell>{order.customerName}</TableCell>
//                 <TableCell>{order.product}</TableCell>
//                 <TableCell>{order.quantity}</TableCell>
//                 <TableCell>₹{order.total}</TableCell>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.delivery}</TableCell>
//                 <TableCell>{order.location}</TableCell>
//                 <TableCell>
//                   <Select
//                     value={order.status}
//                     onChange={(event) => handleStatusChange(event, order._id)}
//                   >
//                     <MenuItem value="Pending">Pending</MenuItem>
//                     <MenuItem value="Shipped">Shipped</MenuItem>
//                     <MenuItem value="Delivered">Delivered</MenuItem>
//                     <MenuItem value="Cancelled">Cancelled</MenuItem>
//                   </Select>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={orders.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </div>
//   );
// };

// export default Orders;



import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, Select, MenuItem } from '@mui/material';

const columns = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'customerName', label: 'Customer Name' },
  { id: 'product', label: 'Product' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'total', label: 'Total' },
  { id: 'orderDate', label: 'Order Date' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'location', label: 'Location' },
  { id: 'status', label: 'Status' } // Status column
];

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      _id: '1',
      orderId: 'ORD001',
      customerName: 'John Doe',
      product: 'Laptop',
      quantity: 2,
      total: 1500,
      date: '2024-09-30',
      delivery: 'Free',
      location: 'New York',
      status: 'Pending'
    },
    {
      _id: '2',
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      product: 'Headphones',
      quantity: 1,
      total: 200,
      date: '2024-10-01',
      delivery: 'N/A',
      location: 'Los Angeles',
      status: 'Shipped'
    },
    {
      _id: '3',
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      product: 'Headphones',
      quantity: 1,
      total: 200,
      date: '2024-10-01',
      delivery: 'N/A',
      location: 'Los Angeles',
      status: 'Shipped'
    },
    {
      _id: '4',
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      product: 'Headphones',
      quantity: 1,
      total: 200,
      date: '2024-10-01',
      delivery: 'N/A',
      location: 'Los Angeles',
      status: 'Shipped'
    },
    {
      _id: '5',
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      product: 'Headphones',
      quantity: 1,
      total: 200,
      date: '2024-10-01',
      delivery: 'N/A',
      location: 'Los Angeles',
      status: 'Shipped'
    },
    {
      _id: '6',
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      product: 'Headphones',
      quantity: 1,
      total: 200,
      date: '2024-10-01',
      delivery: 'N/A',
      location: 'Los Angeles',
      status: 'Shipped'
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleStatusChange = (event, orderId) => {
    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, status: event.target.value } : order
    );
    setOrders(updatedOrders);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Grid item xs={12} sx={{ width: 8 / 12, mx: 'auto', mt: 2 }}>
        <Typography variant="h6">All Orders</Typography>
      </Grid>
      <TableContainer component={Paper} sx={{ width: 8 / 12, mx: 'auto', mt: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#bbdefb' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontSize: '1rem' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.delivery}</TableCell>
                <TableCell>{order.location}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(event) => handleStatusChange(event, order._id)}
                    sx={{
                      border: 'none', // Completely remove the border
                      '& fieldset': { border: 'none' }, // No border around the select input
                      '& .MuiSelect-select': { padding: '8px 24px' }, // Padding adjustment
                    }}
                    displayEmpty
                  >
                    <MenuItem value="Pending" sx={{ color: 'orange' }}>
                      Pending
                    </MenuItem>
                    <MenuItem value="Shipped" sx={{ color: 'blue' }}>
                      Shipped
                    </MenuItem>
                    <MenuItem value="Delivered" sx={{ color: 'green' }}>
                      Delivered
                    </MenuItem>
                    <MenuItem value="Cancelled" sx={{ color: 'red' }}>
                      Cancelled
                    </MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Orders;

