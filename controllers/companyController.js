const Company = require("../models/Company");
const { sendResponse, comparePassword } = require("../utils/helper");
const { generateJwt, verifyJwt } = require("../utils/jwt");

const registerCompany = async (req, res) => {
    const { companyName, companyType, email, password } = req.body;
    if (!companyName || !companyType || !email || !password) return sendResponse(res, "error", {}, "Please provide all required fields");
    try {

        const isExists = await Company.findOne({
            $or: [
                { companyName }, { email }
            ]
        })

        if (isExists) return sendResponse(res, "error", {}, "Company Name/email already exists.");

        const createCompany = new Company({
            companyName, companyType, email, password
        })
        const token = await generateJwt(createCompany?._id?.toString())
        await createCompany.save()
        sendResponse(res, "success", { token, user: createCompany }, "Account created successfully.")
    } catch (error) {
        console.log(error);
        sendResponse(res, "error", {}, error?.messsage)

    }
}

const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return sendResponse(res, "error", {}, "Please provide all required fields");

    try {
        const isExists = await Company.findOne({ email: email?.toLowerCase()?.trim() })
        if (!isExists) return sendResponse(res, "notFound", {}, "Email not found.");

        const checkPas = await comparePassword(password, isExists?.password);
        if (checkPas) {
            const token = await generateJwt(isExists?._id?.toString())
            return sendResponse(res, "success", { token, user: isExists }, "Account logged in successfully.")
        } else {
            sendResponse(res, "success", {}, "Password does not match.")
        }
    } catch (error) {
        console.log(error);
        sendResponse(res, "error", {}, error?.messsage)

    }

}

const getCompanyById = async (req, res) => {
    const { userId } = req.body
    try {
        const company = await Company.findById(userId);
        if (!company) return sendResponse(res, "notFound", {}, "User not found");

        sendResponse(res, "success", { user: company }, "User fetched successfully.")
    } catch (error) {
        console.log(error);
        sendResponse(res, "error", {}, error?.messsage)
    }

}


module.exports = { registerCompany, loginCompany, getCompanyById }