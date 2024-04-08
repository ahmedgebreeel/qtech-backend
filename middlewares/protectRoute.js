const jwt = require('jsonwebtoken');


const protectRoute = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, "JWT_SECRET");  /// {userId : }
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized Invalid Token" });
    }

    req.userId = decoded.userId;
    next();
    
}

module.exports = {protectRoute}