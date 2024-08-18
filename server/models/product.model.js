import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    discounted_price: {
        type: Number,
        required: true
    },
    prodImage: {
        type: String,
        required: true
    }
},{timestamps:true});

export const Product = mongoose.model('Product', productSchema);