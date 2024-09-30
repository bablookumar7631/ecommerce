import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: 'No token, authorization denied',
            success: false
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        if(req.user.designation != 'admin'){
            return res.status(403).json({
                message: 'Admin access only',
                success: false
            })
        }
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token',
            success: false
        })
    }
};

export {adminAuth};