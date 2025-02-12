const jwt = require("jsonwebtoken");

const generateJwt = async (userId) => {

    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET || "my_json_token", {
            expiresIn: "1d",
        });
        return token;
    } catch (error) {
        console.log(error);
    }
};

const verifyJwt = async (user_token) => {
    const decodedToken = await jwt.verify(
        user_token,
        process.env.JWT_SECRET || "my_json_token"
    );

    if (decodedToken) {
        return decodedToken;
    } else {
        return res.status(403).json({ message: "Invalid credentials, Please login again." });
    }

};



module.exports = { generateJwt, verifyJwt };
