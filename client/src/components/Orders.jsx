// import React from 'react'

// const Orders = () => {
//   return (
//     <div className="w-9/12 mx-auto bg-slate-100 mt-10 mb-6 rounded-md relative">
//       <div className="flex flex-col gap-2 w-11/12 mx-auto pt-4 pb-16">
//         <p className="text-2xl font-semibold text-center pb-5 ">Our Orders:</p>
//         <div className="overflow-hidden rounded border">
//           <table className="w-full border border-collapse">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="border px-4 py-2">Product Image</th>
//                 <th className="border px-4 py-2">Name</th>
//                 <th className="border px-4 py-2">Price</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               <tr>
//                 <td className="border px-4 py-2">jsnsjb</td>
//                 <td className="border px-4 py-2">face wash</td>
//                 <td className="border px-4 py-2">₹1520</td>
//                 <td className="border px-4 py-2">pending</td>
//                 <td className="border px-4 py-2 text-red-500 cursor-pointer">cancel</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Orders



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch orders from the API
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8000/api/v1/payments/my-orders', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         setOrders(data.orders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };
    
//     fetchOrders();
//   }, []);

//   return (
//     <div className="w-9/12 mx-auto bg-slate-100 mt-10 mb-6 rounded-md relative">
//       <div className="flex flex-col gap-2 w-11/12 mx-auto pt-4 pb-16">
//         <p className="text-2xl font-semibold text-center pb-5">Our Orders:</p>
//         <div className="overflow-hidden rounded border">
//           <table className="w-full border border-collapse">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="border px-4 py-2">Product Image</th>
//                 <th className="border px-4 py-2">Name</th>
//                 <th className="border px-4 py-2">Price</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {orders.map((order) => (
//                 order.products.map((product) => (
//                   <tr key={product._id}>
//                     <td className="border px-4 py-2">
//                       {/* Placeholder for product image */}
//                       <img
//                         src="https://via.placeholder.com/50" // Replace this with actual image URL if available in the product data
//                         alt={product.name}
//                         className="w-12 h-12 object-cover mx-auto"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">{product.name}</td>
//                     <td className="border px-4 py-2">₹{product.price}</td>
//                     <td className="border px-4 py-2">{order.status}</td>
//                     <td className="border px-4 py-2 text-red-500 cursor-pointer">Cancel</td>
//                   </tr>
//                 ))
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch orders from the API
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8000/api/v1/payments/my-orders');
//         setOrders(data.orders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };
    
//     fetchOrders();
//   }, []);

//   return (
//     <div className="w-9/12 mx-auto bg-slate-100 mt-10 mb-6 rounded-md relative">
//       <div className="flex flex-col gap-8 w-11/12 mx-auto pt-4 pb-16">
//         <p className="text-2xl font-semibold text-center pb-5">Your Orders</p>
        
//         {/* Loop through each order */}
//         {orders.map((order) => (
//           <div key={order._id} className="border rounded-lg shadow-sm p-4 bg-white">
//             <h3 className="text-xl font-semibold mb-3">Order ID: {order.orderId}</h3>
//             <p className="mb-2"><strong>Customer Email:</strong> {order.customerEmail}</p>
//             <p className="mb-4"><strong>Status:</strong> {order.status}</p>

//             <table className="w-full border border-collapse mb-4">
//               <thead className="bg-blue-100">
//                 <tr>
//                   <th className="border px-4 py-2">Product Image</th>
//                   <th className="border px-4 py-2">Product Name</th>
//                   <th className="border px-4 py-2">Quantity</th>
//                   <th className="border px-4 py-2">Price</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {/* Loop through the products in the order */}
//                 {order.products.map((product) => (
//                   <tr key={product._id}>
//                     <td className="border px-4 py-2">
//                       <img
//                         src="https://via.placeholder.com/50" // Placeholder for product image
//                         alt={product.name}
//                         className="w-12 h-12 object-cover mx-auto"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">{product.name}</td>
//                     <td className="border px-4 py-2">{product.quantity}</td>
//                     <td className="border px-4 py-2">₹{product.price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-between mt-4">
//               <p><strong>Total:</strong> ₹{order.total}</p>
//               <p><strong>Delivery:</strong> {order.delivery}</p>
//               <p><strong>GST:</strong> {order.gst}%</p>
//               <p><strong>Shipping Charge:</strong> ₹{order.shippingCharge}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/payments/my-orders', {
          headers: {
            'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    
    fetchOrders();
  }, []);

  // Function to handle order cancellation
  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/payments/cancel-order/${orderId}`);
      console.log(response.data.message); // Handle success message
      // Optional: Refetch orders after cancellation to update the UI
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div className="w-9/12 mx-auto bg-slate-100 mt-10 mb-12 rounded-md relative">
      <div className="flex flex-col gap-8 w-11/12 mx-auto pt-4 pb-16">
        <p className="text-2xl font-semibold text-center pb-5">Your Orders</p>
        
        {/* Loop through each order */}
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg shadow-sm p-4 bg-white">
            <p className="mb-2"><strong>Customer Email:</strong> {order.customerEmail}, <strong>Phone No.:</strong> {order.customerEmail}</p>
            <h3 className="text-lg font-extralight mb-3">Address:- {order.location}</h3>
            <p className="mb-4"><strong>Status:</strong> {order.status}</p>

            <table className="w-full border border-collapse mb-4">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border px-4 py-2">Product Image</th>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {/* Loop through the products in the order */}
                {order.products.map((product) => (
                  <tr key={product._id}>
                    <td className="border px-4 py-2">
                      <img
                        src={product.prodImage}
                        alt={product.name}
                        className="w-12 h-12 object-cover mx-auto"
                      />
                    </td>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">₹{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Delivery:</strong> ₹{order.delivery}</p>
              <p><strong>GST:</strong> ₹{order.gst}</p>
              <p><strong>Shipping Charge:</strong> ₹{order.shippingCharge}</p>
            </div>

            {/* Cancel Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                onClick={() => cancelOrder(order._id)}
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
