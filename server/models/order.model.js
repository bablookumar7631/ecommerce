import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true, // Ensure the order ID is unique
      },
      customerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      customerEmail: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          prodImage: {
            type: String,
            required: true
          },
        },
      ],
      total: {
        type: Number,
        required: true,
      },
      gst: {
        type: Number,
        required: true,
      },
      shippingCharge: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      delivery: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      },
      stripePaymentIntentId: {
        type: String,
        required: true, // To store the payment intent ID from Stripe
      },
      paymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Paid', 'Failed'], // Track payment status
      },
      cancelRequest: { 
        type: Boolean, 
        default: false 
      },
    });

export const Order = mongoose.model("Order", orderSchema);