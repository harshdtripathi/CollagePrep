// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const cookieParser = require("cookie-parser");
// const authroute= require("./Routes/Profile")

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json()); // Accept JSON data
// app.use(cookieParser());

// // Default route
// app.get("/", (req, res) => {
//   res.send("CollegeSaathi Backend is running");
// });


// app.use("/api/auth", authroute);

// // Routes
// // app.use("/api/papers", require("./routes/paperRoutes"));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authroute= require("./Routes/Profile")

// Load environment variables
dotenv.config();
// const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();





const allowedOrigins = [
  "http://localhost:5173",
 "https://collage-prep-omega.vercel.app"
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: true, // Reflects the request origin
//     credentials: true, // Allow cookies (Authorization headers, etc.)
//   })
// );

app.use(express.json()); // Accept JSON data
app.use(cookieParser());

// Default route
app.get("/", (req, res) => {
  res.send("CollegeSaathi Backend is running");
});


app.use("/api/auth", authroute);

// Routes
// app.use("/api/papers", require("./routes/paperRoutes"));

// Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
module.exports=app;
