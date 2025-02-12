const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
    employeeName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "company"
    }
})

const Employee = model("employee", employeeSchema)
module.exports = Employee