import Stripe from 'stripe';
import {Order} from '../models/order.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const createCheckoutSession = async (req, res) => {
//   const { products, totalAmount, gst, shippingCharge, user } = req.body;

//   console.log('Request Body:', req.body);

//   // Prepare line items for Stripe session from products
//   const lineItems = products.map((item) => ({
//     price_data: {
//       currency: 'inr',
//       product_data: {
//         images: [item.image],
//         name: item.name,
//       },
//       unit_amount: item.price * 100, // Stripe expects price in paise for INR
//     },
//     quantity: item.quantity,
//   }));

//   // Add shipping charge and GST as line items
//   if (shippingCharge > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: 'Shipping Charge',
//         },
//         unit_amount: shippingCharge * 100, // Convert to paise
//       },
//       quantity: 1,
//     });
//   }
//   if (gst > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: 'GST',
//         },
//         unit_amount: gst * 100, // Convert to paise
//       },
//       quantity: 1,
//     });
//   }

//   // Create Stripe Checkout Session
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: lineItems,
//       success_url: 'http://localhost:5173/payment-successful',
//       cancel_url: 'http://localhost:5173/payment-cancel',
//       metadata: {
//         total_amount: totalAmount, // Store total amount in metadata if needed
//       },
//     });

//     console.log('Stripe Session Created:', session);

//     // Create new order in the database after session is created
//     const newOrder = new Order({
//       orderId: session.id,
//       customerName: user.id, // Use `id` from `user`
//       customerEmail: user.email,
//       phoneNumber: user.phoneNumber,
//       products: products.map(item => ({
//         productId: item.id, // Use `id` from `products`
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         prodImage: item.image,
//       })),
//       total: totalAmount / 100, // Convert back from paise to INR for total amount
//       gst: gst,
//       shippingCharge: shippingCharge,
//       location: `${user.address || ''}, ${user.pincode || ''}, ${user.state || ''}`.trim() || 'Default Location',
//       delivery: 'Free',
//       stripePaymentIntentId: session.id,
//       paymentStatus: 'Pending',
//     });

//     console.log('New Order Details:', newOrder); // Log the new order details

//     await newOrder.save(); // Save the order
//     res.json({
//       sessionId: session.id,
//       message: 'Order created and checkout session initiated',
//       success: true,
//     });
//   } catch (error) {
//     console.log('Error creating checkout session:', error);
//     res.status(500).json({
//       message: 'Failed to create checkout session',
//       success: false,
//     });
//   }
// };

const createCheckoutSession = async (req, res) => {
  const { products, totalAmount, gst, shippingCharge, deliveryCharge, user } = req.body;

  console.log('Request Body:', req.body);
  const delivery = deliveryCharge > 0 ? deliveryCharge : 'Free';

  // Prepare line items for Stripe session from products
  const lineItems = products.map((item) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price * 100, // Stripe expects price in paise for INR
    },
    quantity: item.quantity,
  }));

  // Add delivery charge, GST, and other charges as line items
  if (deliveryCharge > 0) {
    lineItems.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charge',
        },
        unit_amount: deliveryCharge * 100, // Convert to paise
      },
      quantity: 1,
    });
  }
  
  if (shippingCharge > 0) {
    lineItems.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Shipping Charge',
        },
        unit_amount: shippingCharge * 100, // Convert to paise
      },
      quantity: 1,
    });
  }
  
  if (gst > 0) {
    lineItems.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'GST',
        },
        unit_amount: gst * 100, // Convert to paise
      },
      quantity: 1,
    });
  }

  // Create Stripe Checkout Session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:5173/payment-successful',
      cancel_url: 'http://localhost:5173/payment-cancel',
      metadata: {
        total_amount: totalAmount, // Store total amount in metadata if needed
      },
    });

    console.log('Stripe Session Created:', session);

    // Create new order in the database after session is created
    const newOrder = new Order({
      orderId: session.id,
      customerName: user.id, // Use `id` from `user`
      customerEmail: user.email,
      phoneNumber: user.phoneNumber,
      products: products.map(item => ({
        productId: item.id, // Use `id` from `products`
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        prodImage: item.image,
      })),
      total: totalAmount / 100, // Convert back from paise to INR for total amount
      gst: gst,
      shippingCharge: shippingCharge,
      location: `${user.address || ''}, ${user.pincode || ''}, ${user.state || ''}`.trim() || 'Default Location',
      delivery: delivery,
      stripePaymentIntentId: session.id,
      paymentStatus: 'Pending',
    });

    console.log('New Order Details:', newOrder); // Log the new order details

    await newOrder.save(); // Save the order
    res.json({
      sessionId: session.id,
      message: 'Order created and checkout session initiated',
      success: true,
    });
  } catch (error) {
    console.log('Error creating checkout session:', error);
    res.status(500).json({
      message: 'Failed to create checkout session',
      success: false,
    });
  }
};



// const createCheckoutSession = async (req, res) => {
//   const { products, totalAmount, gst, shippingCharge, deliveryCharge, user } = req.body;

//   console.log('Request Body:', req.body);
//   const delivery = deliveryCharge > 0 ? deliveryCharge : 'Free';

//   // Prepare line items for Stripe session from products
//   const lineItems = products.map((item) => ({
//     price_data: {
//       currency: 'inr',
//       product_data: {
//         images: [item.image],
//         name: item.name,
//       },
//       unit_amount: item.price * 100, // Stripe expects price in paise for INR
//     },
//     quantity: item.quantity,
//   }));

//   // Add delivery charge, GST, and other charges as line items
//   if (deliveryCharge > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: 'Delivery Charge',
//         },
//         unit_amount: deliveryCharge * 100, // Convert to paise
//       },
//       quantity: 1,
//     });
//   }
  
//   if (shippingCharge > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: 'Shipping Charge',
//         },
//         unit_amount: shippingCharge * 100, // Convert to paise
//       },
//       quantity: 1,
//     });
//   }
  
//   if (gst > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: 'GST',
//         },
//         unit_amount: gst * 100, // Convert to paise
//       },
//       quantity: 1,
//     });
//   }

//   // Create Stripe Checkout Session
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: lineItems,
//       success_url: 'http://localhost:5173/payment-successful',
//       cancel_url: 'http://localhost:5173/payment-cancel',
//       metadata: {
//         total_amount: totalAmount, // Store total amount in metadata if needed
//       },
//     });

//     console.log('Stripe Session Created:', session);

//     // Create new order in the database after session is created
//     const newOrder = new Order({
//       orderId: session.id,
//       customerName: user.id, // Use `id` from `user`
//       customerEmail: user.email,
//       phoneNumber: user.phoneNumber,
//       products: products.map(item => ({
//         productId: item.id, // Use `id` from `products`
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         prodImage: item.image,
//       })),
//       total: totalAmount / 100, // Convert back from paise to INR for total amount
//       gst: gst,
//       shippingCharge: shippingCharge,
//       location: `${user.address || ''}, ${user.pincode || ''}, ${user.state || ''}`.trim() || 'Default Location',
//       delivery: delivery,
//       stripePaymentIntentId: session.id,
//       paymentStatus: 'Pending',
//     });

//     console.log('New Order Details:', newOrder); // Log the new order details

//     await newOrder.save(); // Save the order
//     res.json({
//       sessionId: session.id,
//       message: 'Order created and checkout session initiated',
//       success: true,
//     });
//   } catch (error) {
//     console.log('Error creating checkout session:', error);
//     res.status(500).json({
//       message: 'Failed to create checkout session',
//       success: false,
//     });
//   }
// };



// const createCheckoutSession = async (req, res) => {
//   const { products, totalAmount, gst, shippingCharge, deliveryCharge, user } = req.body;

//   const lineItems = products.map((item) => ({
//     price_data: {
//       currency: 'inr',
//       product_data: {
//         images: [item.image],
//         name: item.name,
//       },
//       unit_amount: item.price * 100, // Stripe expects price in paise for INR
//     },
//     quantity: item.quantity,
//   }));

//   if (deliveryCharge > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: { name: 'Delivery Charge' },
//         unit_amount: deliveryCharge * 100,
//       },
//       quantity: 1,
//     });
//   }

//   if (shippingCharge > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: { name: 'Shipping Charge' },
//         unit_amount: shippingCharge * 100,
//       },
//       quantity: 1,
//     });
//   }

//   if (gst > 0) {
//     lineItems.push({
//       price_data: {
//         currency: 'inr',
//         product_data: { name: 'GST' },
//         unit_amount: gst * 100,
//       },
//       quantity: 1,
//     });
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: lineItems,
//       success_url: 'http://localhost:5173/payment-successful',
//       cancel_url: 'http://localhost:5173/payment-cancel',
//       metadata: {
//         total_amount: totalAmount,
//         user: JSON.stringify(user),
//         products: JSON.stringify(products),
//         gst,
//         shippingCharge,
//         deliveryCharge,
//       },
//     });

//     res.json({
//       sessionId: session.id,
//       message: 'Checkout session initiated',
//       success: true,
//     });
//   } catch (error) {
//     console.log('Error creating checkout session:', error);
//     res.status(500).json({
//       message: 'Failed to create checkout session',
//       success: false,
//     });
//   }
// };



// const stripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   if (!sig) {
//     console.log("No stripe-signature header found");
//     return res.status(400).send("Missing stripe-signature header");
//   }

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
//     return res.sendStatus(400);
//   }

//   console.log('Received event:', event.type); // Log the event type

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     if (session.payment_status === 'paid') {
//       try {
//         // const user = session.metadata ? JSON.parse(session.metadata.user) : {};
//         const user = session.metadata && session.metadata.user ? JSON.parse(session.metadata.user) : null;
//         const products = session.metadata ? JSON.parse(session.metadata.products) : [];
//         const { total_amount, gst, shippingCharge, deliveryCharge } = session.metadata || {};
    
//         console.log('Parsed user:', user); // Log user data
//         console.log('Parsed products:', products); // Log product data
//         console.log('Session metadata:', session.metadata); // Log metadata
    
//         const delivery = deliveryCharge > 0 ? deliveryCharge : 'Free';
    
//         // Create the order only if the payment is successful
//         const newOrder = new Order({
//           orderId: session.id,
//           customerName: user.id,
//           customerEmail: user.email,
//           phoneNumber: user.phoneNumber,
//           products: products.map(item => ({
//             productId: item.id,
//             name: item.name,
//             quantity: item.quantity,
//             price: item.price,
//             prodImage: item.image,
//           })),
//           total: total_amount / 100, // Convert back from paise to INR for total amount
//           gst: parseFloat(gst), // Parse gst to float
//           shippingCharge: parseFloat(shippingCharge), // Parse shippingCharge to float
//           location: `${user.address || ''}, ${user.pincode || ''}, ${user.state || ''}`.trim() || 'Default Location',
//           delivery: delivery,
//           stripePaymentIntentId: session.payment_intent,
//           paymentStatus: 'Paid',
//         });
    
//         console.log('New order details:', newOrder);
//         await newOrder.save(); // Save the order
//         console.log('New order created:', newOrder);
//         res.status(201).json({ message: 'Order created successfully', order: newOrder });
//       } catch (error) {
//         console.error('Error creating order:', error); // Log any error
//         res.status(500).json({
//           message: 'Failed to create order',
//           success: false,
//         });
//       }
//     } else {
//       console.log('Payment not completed successfully');
//       res.status(400).json({ message: 'Payment not completed successfully' });
//     }
//     } else {
//       console.log('Payment not completed successfully');
//       res.status(400).json({ message: 'Payment not completed successfully' });
//     }
// };



const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerName', 'firstName lastName email phoneNumber')
      .populate('products.productId', 'name price category prodImage');
    if (!orders) {
      return res.status(404).json({
        message: 'No orders found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Orders retrieved successfully',
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
};


const getUserOrders = async(req, res) => {
  try {
    // const userId = req.user;
    const userId = req.user.id;
    console.log('User ID:', userId);

    // Find orders where the customerId matches the logged-in user
    // const orders = await Order.find({customerName: userId});
    const orders = await Order.find({ customerName: userId }).populate('products.productId', 'name price');
    console.log('Orders:', orders);

    if(!orders || orders.length == 0){
      return res.status(404).json({
        message: 'No orders found.',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Orders retrieved successfully',
      success: true,
      orders,
    })
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      message: 'server error',
      success: false,
    });
  }
}


const updateOrderStatus = async(req, res) =>{
  const {orderId, status} = req.body;

  try {
    console.log('Received orderId:', orderId, 'Received status:', status);
    // Find the order by ID and update its status
    const order = await Order.findByIdAndUpdate(orderId, {status}, {new: true});

    if(!order){
      return res.status(404).json({
        message: 'Order not found.',
        success: false
      })
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      success: true,
      order
    })
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ 
      message: 'Internal Server Error',
      success: false
    });
  }
}

const requestCancelOrder = async(req, res) =>{
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { cancelRequest: true }, { new: true });

    res.json({ 
      success: true,
      message: 'Order cancellation requested successfully', order 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error requesting order cancellation' 
    });
  }
}

const totalOrder = async(req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    
    res.json({
      totalOrders
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      success: false
    })
  }
}

const totalRevenue = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        // Match only the orders that have the status "Delivered"
        $match: { status: 'Delivered' }
      },
      {
        // Group and sum the 'total' field
        $group: {
          _id: null,
          totalRevenue: { $sum: { $toDouble: '$total' } }  // Convert 'total' to a number in case it's not
        }
      }
    ]);
    const totalRevenue = (orders[0]?.totalRevenue || 0).toFixed(2);

    res.json({
      totalRevenue
    });
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    res.status(500).json({
      message: 'Server error',
      success: false
    });
  }
};




export { createCheckoutSession, getAllOrders, getUserOrders, updateOrderStatus, requestCancelOrder, totalOrder, totalRevenue };
