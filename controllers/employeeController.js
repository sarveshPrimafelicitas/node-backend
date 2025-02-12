const Employee = require("../models/Employee");
const { sendResponse, comparePassword } = require("../utils/helper");

const postEmployee = async (req, res) => {
    const { employeeName, designation, userId } = req.body
    if (!employeeName || !designation) return sendResponse(res, "error", {}, "Please provide all required fields.")
    try {
        const createEmployee = new Employee({
            employeeName, designation, company: userId
        })
        await createEmployee.save();
        sendResponse(res, "success", {}, "Employee created successfully.")
    } catch (error) {
        console.log(error);
        sendResponse(res, "error", {}, error?.message)
    }
}

const getEmployeesByUserId = async (req, res) => {
    const { userId } = req.body
    try {
        const employees = await Employee.find({ company: userId })
        sendResponse(res, "success", employees, "Employees fetched successfully")

    } catch (error) {
        console.log(error);
        sendResponse(res, "error", {}, error?.message)
    }
}

const deleteEmployee = async (req, res) => {
    const { employeeId } = req.query
    try {
        const isExists = await Employee.findByIdAndDelete(employeeId);
        if (!isExists) return sendResponse(res, "notFound", {}, "Employee not found");

        sendResponse(res, "success", {}, "Employee deleted successfully")

    } catch (error) {
        console.log(error);
        sendResponse(res, "error", {}, error?.message)
    }
}

module.exports = { postEmployee, getEmployeesByUserId, deleteEmployee }