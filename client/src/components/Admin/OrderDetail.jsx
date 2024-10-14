// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//       padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//       padding: theme.spacing(1),
//     },
// }));

// const OrderDetail = () => {
//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open dialog
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Modal title
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={(theme) => ({
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: theme.palette.grey[500],
//           })}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//           </Typography>
//           <Typography gutterBottom>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
//             Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
//           </Typography>
//           <Typography gutterBottom>
//             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
//             magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
//             ullamcorper nulla non metus auctor fringilla.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Save changes
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// }

// export default OrderDetail;

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const OrderDetail = ({ open, onClose, order }) => {
//   return (
//     <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
//       <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//         Order Invoice
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={(theme) => ({
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: theme.palette.grey[500],
//           })}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <div>
//             <p><strong>Order ID:</strong> {order.orderId}</p>
//             <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
//         </div>
//         <div className='mt-3 mb-3'>
//             <h1 className='text-base font-bold text-center'>Billing Address:</h1>
//             <div className='border border-gray-600 rounded p-2'>
//                 <p>{`${order.customerName.firstName} ${order.customerName.lastName}`}</p>
//                 <p>{order.location}</p>
//                 <p>{order.pincode} {order.state}</p>
//                 <p>Phone: {order.phoneNumber}</p>
//             </div>
//         </div>
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                     <th>Product ID</th>
//                     <th>Product</th>
//                     <th>Qty</th>
//                     <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                     <td>{order._id}</td>
//                     <td>{order.name}</td>
//                     <td>{order.quantity}</td>
//                     <td>{order.price}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={onClose}>
//           Close
//         </Button>
//       </DialogActions>
//     </BootstrapDialog>
//   );
// };

// export default OrderDetail;

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const OrderDetail = ({ open, onClose, order }) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Order Invoice
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div>
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-3 mb-3">
          <h1 className="text-base font-bold text-center">Billing Address:</h1>
          <div className="border border-gray-600 rounded p-2">
            <p>{`${order.customerName.firstName || ""} ${
              order.customerName.lastName || ""
            }`}</p>
            <p>{order.location}</p>
            <p>
              {order.pincode} {order.state}
            </p>
            <p>Phone: {order.phoneNumber}</p>
          </div>
        </div>

        <div>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Product ID
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Product
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Qty
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product._id}>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      color: "#83cff7",
                    }}
                  >
                    {product.productId._id.toString()}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      color: "#83cff7",
                    }}
                  >
                    {product.name}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      color: "#83cff7",
                    }}
                  >
                    {product.quantity}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      color: "#83cff7",
                    }}
                  >
                    {product.price}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    color: "red",
                  }}
                >
                  gst: ₹{order.gst}, shippingCharge: ₹{order.shippingCharge}{" "}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    color: "red",
                  }}
                >
                  deliveryCharge:{" "}
                  {order.delivery > 0 ? (
                    <>₹{order.delivery.toFixed(2)}</>
                  ) : (
                    order.delivery
                  )}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    color: "red",
                  }}
                >
                  {order.products.reduce((acc, item) => acc + item.quantity, 0)}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    color: "#FF0000",
                  }}
                >
                  ₹{order.total || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default OrderDetail;
