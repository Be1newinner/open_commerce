import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

async function isLoggedIn(req, res, next) {
    const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'No token provided' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        console.log(req.user)

        next();
    } catch (error) {
        console.error("Error in isLoggedIn: ", error);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
}

export {
    isLoggedIn
};