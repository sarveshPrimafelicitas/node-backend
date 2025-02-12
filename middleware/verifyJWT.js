const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    let token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json({ message: "Token is required" });


    jwt.verify(token, process.env.JWT_SECRET || "my_json_token", (err, user) => {
        if (err)
            return res
                .status(403)
                .json({ message: "Invalid Credentials. Please login again." });

        req.body.userId = user?.userId; // Add user to request object
        next(); // Pass control to the next middleware or route handler
    });

};

module.exports = verifyJWT;
