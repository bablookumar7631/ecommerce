import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "No token, authorization denied",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred during authentication",
            success: false,
        });
    }
}

export {isAuthenticated};


