const router = require("express").Router();
const { registerCompany, loginCompany, getCompanyById } = require("../controllers/companyController");
const verifyJWT = require("../middleware/verifyJWT");


router
    .post("/registerCompany", registerCompany)
    .post("/loginCompany", loginCompany)
    .get("/getCompanyById", verifyJWT, getCompanyById)



module.exports = router