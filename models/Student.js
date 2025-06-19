const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  
  year: {
    type: Number,
    // required: true,
  },
  email: {
    type: String, // ✅ Fixed typo
    required: true,
    unique: true, // Optional but recommended
  },
  password: {
    type: String,
    required: true, // ✅ fixed typo
  },
  
  department: {
    type: String,
    // required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
