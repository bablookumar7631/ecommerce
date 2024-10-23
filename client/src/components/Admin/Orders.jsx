// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//   Grid, Typography, TablePagination, Select, MenuItem
// } from '@mui/material';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import OrderDetail from './OrderDetail'; // Assuming OrderDetail is in the same directory

// const columns = [
//   { id: 'customerName', label: 'Customer Name' },
//   { id: 'product', label: 'Product' },
//   { id: 'quantity', label: 'Quantity' },
//   { id: 'total', label: 'Total' },
//   { id: 'orderDate', label: 'Order Date' },
//   { id: 'delivery', label: 'Delivery' },
//   { id: 'location', label: 'Location' },
//   { id: 'view', label: 'View' },
//   { id: 'status', label: 'Status' }
// ];

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // Fetch orders from the API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/payments/get-all-orders', {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         });
//         setOrders(response.data.orders); // Assuming the response data has an 'orders' field
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Handle status change
//   const handleStatusChange = async (event, orderId) => {
//     const newStatus = event.target.value;
//     try {
//       const response = await axios.patch('http://localhost:8000/api/v1/payments/update-status', {
//         orderId,
//         status: newStatus,
//       }, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         const updatedOrders = orders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         );
//         setOrders(updatedOrders);
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleOpenDialog = (order) => {
//     setSelectedOrder(order);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrder(null);
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
//               <TableRow
//                 key={order._id}
//                 sx={{
//                   bgcolor: order.status === 'Delivered' ? '#e8f5e9' : order.status === 'Cancelled' ? '#ffebee' : 'inherit',
//                 }}
//               >
//                 <TableCell>{`${order.customerName.firstName} ${order.customerName.lastName}` || ''}</TableCell>
//                 <TableCell>{order.products.map(product => product.name).join(', ') || ''}</TableCell>
//                 <TableCell>{order.products.reduce((acc, item) => acc + item.quantity, 0) || 0}</TableCell>
//                 <TableCell>₹{order.total || 0}</TableCell>
//                 <TableCell>{new Date(order.date).toLocaleDateString() || ''}</TableCell>
//                 <TableCell>
//                   {order.delivery > 0 ? (
//                     <>₹{order.delivery.toFixed(2)}</>
//                   ) : (
//                     order.delivery
//                   )}
//                 </TableCell>
//                 <TableCell>{order.location || ''}</TableCell>
//                 <TableCell>
//                   <VisibilityOutlinedIcon
//                     sx={{ color: '#83cff7', cursor: 'pointer' }}
//                     onClick={() => handleOpenDialog(order)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Select
//                     value={order.status || ''}
//                     onChange={(event) => handleStatusChange(event, order._id)}
//                     sx={{
//                       border: 'none',
//                       '& fieldset': { border: 'none' },
//                       '& .MuiSelect-select': { padding: '8px 24px' },
//                     }}
//                     displayEmpty
//                   >
//                     <MenuItem value="Pending" sx={{ color: 'orange' }}>Pending</MenuItem>
//                     <MenuItem value="Shipped" sx={{ color: 'blue' }}>Shipped</MenuItem>
//                     <MenuItem value="Delivered" sx={{ color: 'green' }}>Delivered</MenuItem>
//                     <MenuItem value="Cancelled" sx={{ color: 'red' }}>Cancelled</MenuItem>
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
//       {/* Dialog for order details */}
//       {selectedOrder && (
//         <OrderDetail open={openDialog} onClose={handleCloseDialog} order={selectedOrder} />
//       )}
//     </div>
//   );
// };

// export default Orders;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Grid, Typography, TablePagination, Select, MenuItem
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import OrderDetail from './OrderDetail'; // Assuming OrderDetail is in the same directory

const columns = [
  { id: 'customerName', label: 'Customer Name' },
  { id: 'product', label: 'Product' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'total', label: 'Total' },
  { id: 'orderDate', label: 'Order Date' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'location', label: 'Location' },
  { id: 'view', label: 'View' },
  { id: 'status', label: 'Status' },
  { id: 'camcel', label: 'Cancel Request' },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-bv1o.onrender.com/api/v1/payments/get-all-orders', {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data.orders);
        setOrders(response.data.orders); // Assuming the response data has an 'orders' field
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.patch('https://ecommerce-backend-bv1o.onrender.com/api/v1/payments/update-status', {
        orderId,
        status: newStatus,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
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
              <TableRow
                key={order._id}
                sx={{
                  bgcolor: order.status === 'Delivered' ? '#e8f5e9' : order.status === 'Cancelled' ? '#ffebee' : 'inherit',
                }}
              >
                <TableCell>{`${order.customerName.firstName} ${order.customerName.lastName}` || ''}</TableCell>
                <TableCell>{order.products.map(product => product.name).join(', ') || ''}</TableCell>
                <TableCell>{order.products.reduce((acc, item) => acc + item.quantity, 0) || 0}</TableCell>
                <TableCell>₹{order.total || 0}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString() || ''}</TableCell>
                <TableCell>
                  {order.delivery > 0 ? (
                    <>₹{order.delivery.toFixed(2)}</>
                  ) : (
                    order.delivery
                  )}
                </TableCell>
                <TableCell>{order.location || ''}</TableCell>
                <TableCell>
                  <VisibilityOutlinedIcon
                    sx={{ color: '#83cff7', cursor: 'pointer' }}
                    onClick={() => handleOpenDialog(order)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status || ''}
                    onChange={(event) => handleStatusChange(event, order._id)}
                    sx={{
                      border: 'none',
                      '& fieldset': { border: 'none' },
                      '& .MuiSelect-select': { padding: '8px 24px' },
                    }}
                    displayEmpty
                  >
                    <MenuItem value="Pending" sx={{ color: 'orange' }}>Pending</MenuItem>
                    <MenuItem value="Shipped" sx={{ color: 'blue' }}>Shipped</MenuItem>
                    <MenuItem value="Delivered" sx={{ color: 'green' }}>Delivered</MenuItem>
                    <MenuItem value="Cancelled" sx={{ color: 'red' }}>Cancelled</MenuItem>
                  </Select>
                </TableCell>

                {/* Show message if user requested cancellation */}
                {order.cancelRequest && (
                  <TableCell colSpan={9}>
                    <Typography variant="body2" color="red">
                      User wants to cancel the order
                    </Typography>
                  </TableCell>
                )}
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
      {/* Dialog for order details */}
      {selectedOrder && (
        <OrderDetail open={openDialog} onClose={handleCloseDialog} order={selectedOrder} />
      )}
    </div>
  );
};

export default Orders;