const express = require("express");
const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const adminmodel = require("../models/admin");
const moviemodel = require("../models/movie");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const adminSignup = async (req, res) => {
  let { adminname, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const admin = await adminmodel.create({
        adminname,
        email,
        password: hash,
      });
      let token = jwt.sign(
        { email: email, adminid: admin._id },
        process.env.ADMIN_KEY
      );
      await admin.save();
      res.cookie("token", token);
      res.json({ status: true, message: "admin registered..." });
    });
  });
};

const adminLogin = async (req, res) => {
  let { email, password } = req.body;

  const admin = await adminmodel.findOne({ email });
  if (!admin) return res.status(500).send("something is wrong");

  bcrypt.compare(password, admin.password, (err, result) => {
    if (result) {
      let token = jwt.sign(
        { email: email, adminid: admin._id },
        process.env.ADMIN_KEY
      );
      res.cookie("token", token, { httpOnly: true, maxAge: 36000 });
      return res.json({ status: true, message: "login successfully.." });
    } else {
      res.send("wrong password");
    }
  });
};

const addMovie = async (req, res) => {
  let {
    movieName,
    releaseYear,
    category,
    type,
    ratings,
    moviePoster,
    trailer,
    ticketRate,
    backgroundImage,
    description,
  } = req.body;

  const movie = await moviemodel.create({
    movieName,
    releaseYear,
    category,
    type,
    ratings,
    moviePoster,
    trailer,
    ticketRate,
    backgroundImage,
    description,
  });

  res.json({ movie, status: true, message: "login successfully.." });
};

const findMovie = async (req, res) => {
  try {
    const movie = await moviemodel.find();
    res.json(movie);
  } catch (e) {
    console.log(e);
  }
};

const movieID = async (req, res) => {
  try {
    const movie = await moviemodel.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(movie);
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await moviemodel.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updateData = await moviemodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updateData);
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};


module.exports = {
  adminSignup,
  adminLogin,
  addMovie,
  findMovie,
  movieID,
  deleteMovie,
  updateMovie,
};
