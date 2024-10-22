import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const register = async(req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    try {
        if ([firstName, lastName, phoneNumber, email, password].some(field => !field || field.trim() === "")) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
    
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully.",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An internal server error occurred.",
            success: false
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const token = jwt.sign({
            id: user._id,
            designation: user.designation
        },
        process.env.SECRET_KEY, {
            expiresIn: '1d'
        });

        res.cookie('token', token, { 
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Lax' 
        }).json({
            message: `Welcome back ${user.firstName} ${user.lastName}`,
            user: { 
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                designation: user.designation,
                profilePhoto: user.profilePhoto,
                address: user.address,
                pincode: user.pincode,
                state: user.state
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred during login.",
            success: false
        });
    }
}


const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Ensures the cookie is only sent over HTTPS
            sameSite: 'strict'      // Prevents the browser from sending this cookie along with cross-site requests
        });

        return res.status(200).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Logout failed. Please try again later.",
            success: false
        });
    }
}


const updateProfileImg = async (req, res) => {
    try {
  
      const tokenData = req.user;
      const userId = tokenData.id;
  
      if (!req.file) {
        return res.status(400).json({
          message: "No image file uploaded",
          success: false
        });
      }
  
      const file = req.file;
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: 'profile_images',
      });
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false
        });
      }
  
      // Update user's profile image URL
      user.profilePhoto = cloudResponse.secure_url;
      await user.save();
  
      return res.status(200).json({
        message: "Profile image updated successfully.",
        success: true,
        profilePhoto: cloudResponse.secure_url
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to update profile image",
        success: false
      });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { phoneNumber, email, address, pincode, state } = req.body;

        // Extract user ID from authenticated token
        const tokenData = req.user; // Assuming middleware adds req.user
        const userId = tokenData.id;

        console.log("User ID:", userId);
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Check if email is being updated and validate uniqueness
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email is already in use.",
                    success: false
                });
            }
            user.email = email; // Update email only if valid and unique
        }

        // Update user fields if they exist in request body
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (address) user.address = address;
        if (pincode) user.pincode = pincode;
        if (state) user.state = state;

        // Save updated user in the database
        await user.save();

        // Optionally send updated user data back to the frontend
        res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            user: {
                phoneNumber: user.phoneNumber,
                email: user.email,
                address: user.address,
                pincode: user.pincode,
                state: user.state,
            }
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};




// getting all the user which designation is user
const getAllUser = async(req, res) => {
    try {
        // Fetch all users with the designation 'user'
        const users = await User.find({ designation: 'user' });
    
        // Send the fetched users as a response
        res.status(200).json({
          success: true,
          count: users.length,
          data: users
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
          success: false,
          message: 'Failed to fetch users'
        });
      }
}


// delete the users only by admin
const deleteUser = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        // Prevent deleting an admin user
        if (user.designation === 'admin') {
            return res.status(403).json({
                message: 'Admin users cannot be deleted',
                success: false
            });
        }

        // Delete the user
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'User deleted successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete user',
            success: false
        });
    }
};


const totalCustomers = async(req, res) => {
    try {
        const totalCustomers = await User.countDocuments({ designation: 'user' });

        res.json({
            totalCustomers
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch total customers',
            success: false
        })
    }
}

export { register, login, logout, updateProfile, getAllUser, deleteUser, updateProfileImg, totalCustomers };
