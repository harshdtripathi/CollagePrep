const express= require("express");
const upload = require("../controllers/middleware/multer");
const router = express.Router();
const {
    login,Signup
}
=require("../controllers/Auth");
const {
    getallSemestermaterial,
    getsubjectmaterial
}=
require("../controllers/SemesterNotes");

const {
handleUpload
}= require("../controllers/Uploadmat");

const {StudentContact}=require("../controllers/StudentContact")

const {auth}= require("../controllers/middleware/auth")
const {logout}= require("../controllers/Logout");

router.post("/login",login);
router.post("/signup",Signup);
router.get("/getsubjectdetails",auth,getsubjectmaterial)
router.post("/upload", upload.array("files", 5), handleUpload);
router.post("/contact",StudentContact );
router.post("/logout",logout );

module.exports=router;
