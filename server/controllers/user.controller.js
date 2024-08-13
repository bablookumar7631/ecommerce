// import { User } from "../models/user.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";



// const register = async(req, res) => {
//     try {
//         const { firstName, lastName, phoneNumber, email, password, designation } = req.body
    
//         if(
//             [firstName, lastName, phoneNumber, email, password, designation].some((field) => 
//                 field?.trim() === ""
//             )
//         ){
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         }
    
//         // Check if phoneNumber is exactly 10 digits
//         // if (!/^\d{10}$/.test(phoneNumber)) {
//         //     return res.status(400).json({
//         //         message: "Phone number must be exactly 10 digits",
//         //         success: false
//         //     });
//         // }
    
    
//         const existedUser = await User.findOne({email});
    
//         if(existedUser){
//             return res.status(400).json({
//                 message: 'User already exist with this email.',
//                 success: false,
//             })
//         }
    
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         await User.create({
//             firstName,
//             lastName,
//             phoneNumber,
//             email,
//             password: hashedPassword,
//             designation
//         });
    
//         return res.status(201).json({
//             message: "User registered Successfully.",
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }


// const login = async (req, res) => {
//     try {
//         const { email, password, designation } = req.body;

//         if (!email || !password || !designation) {
//             return res.status(400).json({
//                 message: "All fields are required",
//                 success: false
//             });
//         }

//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             });
//         }

//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             });
//         }

//         if (user.designation !== designation) {
//             return res.status(400).json({
//                 message: "Account doesn't exist with the current designation.",
//                 success: false
//             });
//         }

//         const tokenData = {
//             userId: user._id
//         };
//         const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         const responseUser = {
//             _id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             designation: user.designation,
//         };

//         return res.status(200)
//             .cookie("token", token, { 
//                 maxAge: 1 * 24 * 60 * 60 * 1000, 
//                 httpOnly: true, 
//                 sameSite: 'strict' 
//             })
//             .json({
//                 message: `Welcome back ${responseUser.firstName} ${responseUser.lastName}`,
//                 user: responseUser,
//                 success: true
//             });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "An error occurred during login.",
//             success: false
//         });
//     }
// }




// export {register, login}




import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async(req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, password, designation } = req.body;
    
        // if([firstName, lastName, phoneNumber, email, password, designation].some((field) => field?.trim() === "")) {
        //     return res.status(400).json({
        //         message: "Something is missing",
        //         success: false
        //     });
        // }

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

export { register, login };
