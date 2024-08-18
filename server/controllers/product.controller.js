import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, discount, discounted_price } = req.body;

        // Check if all fields and file are provided
        if (!name || !description || !price || !category || !discount || !discounted_price || !req.file) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Validate if the category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ 
                message: "Category not found",
                success: false
            });
        }

        // Create a new product with the validated data
        const product = new Product({
            name,
            description,
            price,
            category: categoryExists._id,
            discount,
            discounted_price,
            prodImage: cloudResponse.secure_url
        });
        await product.save();

        // Respond with success
        res.status(201).json({
            message: "Product created successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
};


// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');

        if(!product){
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
};


// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        await product.remove();
        res.status(200).json({
            message: "Product deleted successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
};


export {createProduct, getAllProducts, getProductById, deleteProduct}