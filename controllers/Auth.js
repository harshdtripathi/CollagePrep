const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");



exports.Signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;
        
    // 1. Validate all fields
    if (!fullname || !email || !password || !confirmpassword ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }
    if(password!=confirmpassword)
    {
      return res.status(500).json({
        success:false,
        message:"password and confirmpassword don't match"
      })
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    

    // 4. Create new student
    const student = await Student.create({
      fullname,
      
      email,
      password: hashedPassword,
   
      
      verified: true, // Set to false if OTP verification is required
    });

    // 5. Generate token
    const token = JWT.sign(
      {
        id: student._id,
        email: student.email,
        
       
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6. Cookie options
    //  const cookieOptions = {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Set to true on production
    //   sameSite: "Lax",
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    // };

    // newly added

    const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // true for HTTPS (Vercel), false for localhost
  sameSite: isProduction ? "None" : "Lax", // Required for cross-site cookies in HTTPS
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
};


  


    // 7. Set token in cookie
    res.cookie("token", token, cookieOptions);

    // 8. Send response
    res.status(201).json({
      success: true,
      message: "Signup successful",
      token, // optional
      student: {
        firstname: student.fullname,
       
        email: student.email,
        // department: student.department,
        // year: student.year,
      },
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find student
    const student = await Student.findOne({ email });
    console.log("fullname",student.fullname)
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate token
    const token = JWT.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    //   const cookieOptions = {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Set to true on production
    //   sameSite: "Lax",
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    // };
    // newlyadded
    const isProduction = process.env.NODE_ENV === "production";

    
    const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // true for HTTPS (Vercel), false for localhost
  sameSite: isProduction ? "None" : "Lax", // Required for cross-site cookies in HTTPS
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
};



    // 7. Set token in cookie
    res.cookie("token", token, cookieOptions);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student: {
        firstname: student.fullname,
       
        email: student.email,
        // department: student.department,
        // year: student.year,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};





