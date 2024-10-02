import { Category } from "../models/category.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Create a new category
const createCategory = async(req, res) => {
    try {
        const {name} = req.body;

        if(!name || !req.file){
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            })
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const existCategory = await Category.findOne({name});
        if(existCategory){
            return res.status(400).json({
                message: "Category already exists",
                success: false
            })
        }

        const category = new Category({
            name,
            categoryImage:cloudResponse.secure_url
        });
        await category.save();

        res.status(201).json({
            message: "Category created successfully",
            success: true,
            category
        })
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// Get all categories
const getAllCategories = async(req, res) => {
    try {
        // const categories = await Category.find();
        const categories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json({
            categories,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// Get a single category by ID
const getCategoryById = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({
                message: "Category not found",
                success: false
            })
        }
        res.status(200).json({
            category
        });

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Category ID",
                success: false
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
};

// Delete a category
const deleteCategory = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({
                message: "Category not found",
                success: false
            })
        }

        // Remove the category image from Cloudinary
        const publicId = category.categoryImage.split('/').pop().split('.')[0];
        if(publicId){
            await cloudinary.uploader.destroy(publicId);
        }
        
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Category deleted successfully",
            success: true
        })
    } catch (error) {
        console.error("Error while deleting category:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        })
    }
}


// update category
const updateCategory = async(req, res) => {
    try {
        const { name } = req.body;
        const categoryId = req.params.id;

        // find the category by ID
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        // If a new image is uploaded, replace the old image in Cloudinary
        if (req.file) {
            const publicId = category.categoryImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);

            // Stream the file buffer directly to Cloudinary
            const uploadedImage = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ folder: 'categories' }, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
                uploadStream.end(req.file.buffer);  // Use the buffer from memory storage
            });

            // Update the category's image URL
            category.categoryImage = uploadedImage.secure_url;
        }

        // Update the category name if provided
        if (name) {
            category.name = name;
        }

        await category.save();

        res.status(200).json({
            message: "Category updated successfully",
            success: true,
            category
        });

    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}




export {createCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory};
