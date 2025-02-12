const router = require("express").Router();
const { postEmployee, getEmployeesByUserId, deleteEmployee } = require("../controllers/employeeController");
const verifyJWT = require("../middleware/verifyJWT");

router
    .post('/postEmployee', verifyJWT, postEmployee)
    .get("/getEmployeesByUserId", verifyJWT, getEmployeesByUserId)
    .delete("/deleteEmployee", verifyJWT, deleteEmployee)

module.exports = router