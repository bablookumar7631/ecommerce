import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";



const register = async(req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, password, designation } = req.body
    
        if(
            [firstName, lastName, phoneNumber, email, password, designation].some((field) => 
                field?.trim() === ""
            )
        ){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
    
        // Check if phoneNumber is exactly 10 digits
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be exactly 10 digits",
                success: false
            });
        }
    
    
        const existedUser = await User.findOne({email});
    
        if(existedUser){
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
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
            message: "User registered Successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}



export {register}