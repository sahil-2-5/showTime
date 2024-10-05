const express = require("express");
const router = express.Router();

const {
  adminSignup,
  adminLogin,
  addMovie,
  findMovie,
  movieID,
  deleteMovie,
  updateMovie
} = require("../controllers/adminController");

router.post("/signup", adminSignup);

router.post("/login", adminLogin);

router.post("/addmovie", addMovie);

router.get("/movie", findMovie);

router.get("/:id", movieID);

router.delete("/delete/:id",deleteMovie);

router.put("/update/:id",updateMovie);

module.exports = router;
