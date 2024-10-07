// import Stripe from 'stripe';

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// const createCheckoutSession = async (req, res) => {
//   const { products, totalAmount, gst, shippingCharge } = req.body;

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

//   // Create Stripe Checkout Session
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: lineItems,
//       success_url: 'http://localhost:5173/success', // Update with your success URL
//       cancel_url: 'http://localhost:5173/cancel',   // Update with your cancel URL
//       metadata: {
//         total_amount: totalAmount, // Store total amount in metadata if needed
//         gst: gst, // Optional
//         shipping_charge: shippingCharge, // Optional
//       },
//     });
//     res.json({
//       sessionId: session.id
//     });
//   } catch (error) {
//     console.log('Error creating checkout session:', error);
//     res.status(500).json({
//       message: 'Failed to create checkout session',
//       success: false
//     });
//   }
// }

// export { createCheckoutSession };


import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    const { products, totalAmount, gst, shippingCharge } = req.body;
  
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
  
    // Add shipping charge and GST as line items
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
      res.json({
        sessionId: session.id
      });
    } catch (error) {
      console.log('Error creating checkout session:', error);
      res.status(500).json({
        message: 'Failed to create checkout session',
        success: false
      });
    }
  };
  

export { createCheckoutSession };


