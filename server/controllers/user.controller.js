import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";



const register = asyncHandler( async(req, res) => {
    const { firstName, lastName, email, password } = req.body

    if(
        [firstName, lastName, email, password].some((field) => 
            field?.trim() === ""
        )
    ){
        throw new ApiError(400, "All fields are required")
    }


    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new ApiError(409, "User with this Email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    return res.status(201).json(
        new ApiResponse(200, "User registered Successfully")
    )
} )



export {register}