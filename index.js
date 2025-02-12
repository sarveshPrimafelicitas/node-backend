require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4400
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const connectDB = require("./config/dbConfig");
connectDB()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/v1/company", require("./routes/companyRoutes"))
app.use("/api/v1/employee", require("./routes/employeeRoutes"))


app.use("*", (req, res) => {
    res.status(404).json({ message: "endpoint not found" })
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Server running on port ${port}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})

