// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch orders from the API
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8000/api/v1/payments/my-orders",
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );
//         setOrders(data.orders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Function to handle order cancellation
//   const cancelOrder = async (orderId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/v1/payments/cancel-order/${orderId}`
//       );
//       console.log(response.data.message); // Handle success message
//       // Optional: Refetch orders after cancellation to update the UI
//       setOrders((prevOrders) =>
//         prevOrders.filter((order) => order._id !== orderId)
//       );
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//     }
//   };

//   return (
//     <div className="w-9/12 mx-auto bg-slate-100 mt-10 mb-12 rounded-md relative">
//       <div className="flex flex-col gap-8 w-11/12 mx-auto pt-4 pb-16">
//         <p className="text-2xl font-semibold text-center pb-5">Your Orders</p>

//         {/* Loop through each order */}
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="border rounded-lg shadow-sm p-4 bg-white"
//           >
//             <p className="mb-2">
//               <strong>Customer Email:</strong> {order.customerEmail},{" "}
//               <strong>Phone No.:</strong> {order.customerEmail}
//             </p>
//             <h3 className="text-lg font-extralight mb-3">
//               Address:- {order.location}
//             </h3>
//             <p
//               className="mb-4"
//               style={{
//                 color:
//                   order.status === "Pending"
//                     ? "orange"
//                     : order.status === "Shipped"
//                     ? "blue"
//                     : order.status === "Delivered"
//                     ? "green"
//                     : order.status === "Cancelled"
//                     ? "red"
//                     : "black",
//               }}
//             >
//               <strong className="text-black">Status:</strong> {order.status}
//             </p>

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
//                         src={product.prodImage}
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
//               <p>
//                 <strong>Shipping Charge:</strong> ₹{order.shippingCharge}
//               </p>
//               <p>
//                 <strong>GST:</strong> ₹{order.gst}
//               </p>
//               <p>
//                 <strong>Delivery:</strong>{" "}
//                 {order.delivery > 0 ? (
//                   <>₹{order.delivery.toFixed(2)}</>
//                 ) : (
//                   order.delivery
//                 )}
//               </p>
//               <p>
//                 <strong>Total:</strong> ₹{order.total}
//               </p>
//             </div>

//             {/* Cancel Button */}
//             <div className="flex justify-end mt-6">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
//                 onClick={() => cancelOrder(order._id)}
//               >
//                 Cancel Order
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;



import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce-backend-bv1o.onrender.com/api/v1/payments/my-orders",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle order cancellation
  const cancelOrder = async (orderId) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel the order?");
    if (!isConfirmed) return;
    try {
      const response = await axios.post(
        `https://ecommerce-backend-bv1o.onrender.com/api/v1/payments/request-cancel-order/${orderId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
  
      // Optionally refetch or update the local state for order cancellation status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, cancelRequest: true } : order
        )
      );
    } catch (error) {
      console.error("Error requesting order cancellation:", error);
    }
  };

  return (
    <div className="w-9/12 mx-auto bg-slate-100 mt-10 mb-12 rounded-md relative">
      <div className="flex flex-col gap-8 w-11/12 mx-auto pt-4 pb-16">
        <p className="text-2xl font-semibold text-center pb-3 pt-6">Your Orders</p>

        {/* Check if there are no orders */}
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-xl border border-slate-300 py-12 rounded">
            You don't have any orders.
          </p>
        ) : (
          // Loop through each order if available
          orders.map((order) => (
            <div
              key={order._id}
              className={`border rounded-lg shadow-sm p-4 bg-white ${
                order.status === "Cancelled" ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <p className="mb-2">
                <strong>Customer Email:</strong> {order.customerEmail},{" "}
                <strong>Phone No.:</strong> {order.customerEmail}
              </p>
              <h3 className="text-lg font-extralight mb-3">
                Address:- {order.location}
              </h3>
              <p
                className="mb-4"
                style={{
                  color:
                    order.status === "Pending"
                      ? "orange"
                      : order.status === "Shipped"
                      ? "blue"
                      : order.status === "Delivered"
                      ? "green"
                      : order.status === "Cancelled"
                      ? "red"
                      : "black",
                }}
              >
                <strong className="text-black">Status:</strong> {order.status}
              </p>

              {/* Conditionally render the message if user has requested to cancel the order */}
              {order.cancellationRequested && (
                <p className="text-red-500 font-semibold mb-2">
                  User wants to cancel the order.
                </p>
              )}

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
                <p>
                  <strong>Shipping Charge:</strong> ₹{order.shippingCharge}
                </p>
                <p>
                  <strong>GST:</strong> ₹{order.gst}
                </p>
                <p>
                  <strong>Delivery:</strong>{" "}
                  {order.delivery > 0 ? (
                    <>₹{order.delivery.toFixed(2)}</>
                  ) : (
                    order.delivery
                  )}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.total}
                </p>
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
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
