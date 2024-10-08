const express = require("express");
const router = express.Router();

const { userSignup, userLogin , movieSearch } = require("../controllers/userController");

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/search" , movieSearch );

module.exports = router;
