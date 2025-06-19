const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    
  try {
    console.log(req.cookies.token);
     console.log("body",req.body?.token);
    
    const token =
       req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "").trim();
      console.log("token");
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("decodeuser",decoded);

    // Attach payload to req.user so that it's available in all protected routes
    req.user = decoded;
    

    next(); // move to actual route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
