const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// Function to hash a password
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        throw new Error("Error hashing password");
    }
};

// Function to compare a password with a hash
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        throw new Error("Error comparing password");
    }
};

const responseMessage = async (res, responseStatus, message, data) => {
    return res.status(responseStatus).json({
        message,
        data,
    });
};

// responseHelper.js
// responseHelper.js

/**
 * Responds with a JSON object based on the provided parameters.
 *
 * @param {Object} res - The response object from Express.
 * @param {string} type - The type of response (e.g., 'success', 'error', 'notFound', 'unauthorized', 'badRequest').
 * @param {Object} [data={}] - The data to send in the response (used only for success responses).
 * @param {string} [message] - The message to include in the response.
 * @param {number} [statusCode] - The HTTP status code (used only for error responses).
 */
const sendResponse = async (
    res,
    type,
    data = {},
    message = "",
    statusCode = 200
) => {
    const responses = {
        success: {
            status: 200,
            body: {
                success: true,
                message: message || "Request successful",
                data,
            },
        },
        error: {
            status: statusCode || 500,
            body: {
                success: false,
                message: message || "An error occurred",
            },
        },
        notFound: {
            status: 404,
            body: {
                success: false,
                message: message || "Resource not found",
            },
        },
        unauthorized: {
            status: 401,
            body: {
                success: false,
                message: message || "Unauthorized access",
            },
        },
        badRequest: {
            status: 400,
            body: {
                success: false,
                message: message || "Bad request",
            },
        },
    };

    const response = responses[type] || responses.error;

    res.status(response.status).json(response.body);
};

module.exports = {
    hashPassword,
    comparePassword,
    responseMessage,
    sendResponse,
};
