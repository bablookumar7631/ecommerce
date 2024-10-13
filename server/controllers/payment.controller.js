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
        message: 'No orders found for this user.',
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

export { createCheckoutSession, getAllOrders, getUserOrders };
