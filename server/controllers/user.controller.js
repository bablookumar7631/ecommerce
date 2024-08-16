import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const register = async(req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, password, designation } = req.body;

        if ([firstName, lastName, phoneNumber, email, password, designation].some(field => !field || field.trim() === "")) {
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
            designation
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
    try {
        const { email, password, designation } = req.body;

        if (!email || !password || !designation) {
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

        if (user.designation !== designation) {
            return res.status(400).json({
                message: "Account doesn't exist with the current designation.",
                success: false
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const responseUser = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            designation: user.designation,
        };

        return res.status(200)
            .cookie("token", token, { 
                maxAge: 1 * 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })
            .json({
                message: `Welcome back ${responseUser.firstName} ${responseUser.lastName}`,
                user: responseUser,
                success: true
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
            httpOnly: true,         // Prevents client-side JavaScript from accessing the cookie
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


// const updateProfile = async(req, res) => {
//     try {
//         const { phoneNumber, email, address, pincode, state } = req.body;


//         const userId = req.id;
//         let user = await User.findById(userId);

//         if(!user){
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             })
//         }

//         // update data
//         if(phoneNumber) user.phoneNumber = phoneNumber;
//         if(email) user.email = email;
//         if(address) user.address = address;
//         if(pincode) user.pincode = pincode;
//         if(state) user.state = state;


//         // Handle profile photo upload
//         if (req.file) {
//             const fileUri = getDataUri(req.file);
//             const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//             // Update profile photo if upload to Cloudinary is successful
//             if (cloudResponse && cloudResponse.secure_url) {
//                 user.profilePhoto = cloudResponse.secure_url;
//             }
//         }

//         await user.save();

//         res.status(200).json({
//             message: "Profile updated successfully.",
//             success: true
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Server error',
//             error: error.message
//         });
//     }
// }


const updateProfile = async (req, res) => {
    try {
        const { phoneNumber, email, address, pincode, state } = req.body;
        const userId = req.id;

        console.log("User ID:", userId);
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Update user fields
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (email) user.email = email;
        if (address) user.address = address;
        if (pincode) user.pincode = pincode;
        if (state) user.state = state;

        // Handle profile photo upload
        if (req.file) {
            console.log("File Uploaded:", req.file);
            const fileUri = getDataUri(req.file);

            try {
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                if (cloudResponse && cloudResponse.secure_url) {
                    user.profilePhoto = cloudResponse.secure_url;
                }
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
            }
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully.",
            success: true
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

export { register, login, logout, updateProfile };
