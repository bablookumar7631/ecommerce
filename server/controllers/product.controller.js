import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from 'mongoose';


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
            product
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
// const getAllProducts = async (req, res) => {
//     try {
//         const { limit = 10, skip = 0 } = req.query;
//         const products = await Product.find()
//             .populate('category', 'name')
//             .limit(parseInt(limit))
//             .skip(parseInt(skip));
//         res.status(200).json({
//             products
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal Server Error",
//             success: false
//         });
//     }
// };

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


const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required", success: false });
        }

        // Example search logic
        const products = await Product.find({ name: { $regex: query, $options: 'i' } });

        res.status(200).json({ products, success: true });
    } catch (error) {
        console.error("Error fetching products:", error);  // Log the error
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

  
// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Product ID",
                success: false
            });
        }

        const product = await Product.findById(req.params.id).populate('category', 'name');

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
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

        // Remove the product image from Cloudinary
        const publicId = product.prodImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);

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


// Get products by category ID
// const getCategoryByProducts = async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         // Check if the category ID is valid
//         if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//             return res.status(400).json({
//                 message: "Invalid Category ID",
//                 success: false
//             });
//         }

//         // Check if the category exists
//         const categoryExists = await Category.findById(categoryId);
//         if (!categoryExists) {
//             return res.status(404).json({
//                 message: "Category not found",
//                 success: false
//             });
//         }

//         // Get products by category ID
//         const products = await Product.find({ category: categoryId }).populate('category', 'name');

//         // Respond with the products
//         res.status(200).json({
//             products,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error fetching products by category:", error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             success: false
//         });
//     }
// };


const getCategoryByProducts = async (req, res) => {
    try {
      const { categoryName } = req.params;
  
      if (!categoryName) {
        return res.status(400).json({
          message: "Category name is required",
          success: false
        });
      }
  
      // Fetch category by name
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).json({
          message: "Category not found",
          success: false
        });
      }
  
      // Fetch products by category ID
      const products = await Product.find({ category: category._id }).populate('category', 'name');
  
      res.status(200).json({
        items: products,
        success: true
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false
      });
    }
  };


export {createProduct, getAllProducts, getProductById, deleteProduct, getCategoryByProducts, searchProducts}