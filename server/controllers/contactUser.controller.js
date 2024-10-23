import { ContactUser } from "../models/contactUser.model.js";

const contactUser = async (req, res) => {
    const { fullName, email, message } = req.body;

    try {
        // Validate input fields
        if ([fullName, email, message].some(field => !field || field.trim() === "")) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existedContactUser = await ContactUser.findOne({ email });
        if (existedContactUser) {
            return res.status(400).json({
                message: 'You have already contacted us. Please wait for a response.',
                success: false,
            });
        }

        // Create a new message entry in the database
        await ContactUser.create({
            fullName,
            email, // Ensure email is stored in lowercase
            message
        });

        return res.status(201).json({
            message: "Your message was sent successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error in contactUser:", error); // Log the error for debugging
        return res.status(500).json({
            message: "An internal server error occurred.",
            success: false,
            error: error.message || 'Unknown error'
        });
    }
};

export { contactUser };