const express = require("express")
const { createBlog } = require("../controller/blog")
const { verifyJwt } = require("../controller/user")
const router = express.Router()

router.use(verifyJwt)
router.post("/createblog",createBlog)

module.exports = router