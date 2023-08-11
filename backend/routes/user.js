const express = require("express")
const multer = require("multer");
const { signup, login } = require("../controller/user")
const { uploadFile,getFiles } = require("../controller/uploadToS3")
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/upload", upload.single('File'),uploadFile)
router.get("/getFiles", getFiles);
router.post("/signup",signup)
router.post("/login",login)

module.exports = router