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
            success: true
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
        const categories = await Category.find();
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

        await category.remove();
        res.status(200).json({
            message: "Category deleted successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export {createCategory, getAllCategories, getCategoryById, deleteCategory};
