const express = require("express");
const cors = require("cors");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");

dotenv.config();

const usermodel = require("../models/user");
const moviemodel = require("../models/movie");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userSignup = async (req, res) => {
  let { username, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await usermodel.create({
        username,
        email,
        password: hash,
      });
      let token = jwt.sign(
        { email: email, userid: user._id },
        process.env.USER_KEY
      );
      await user.save();
      res.cookie("token", token);
      res.json({ status: true, message: "user registerd.." });
    });
  });
};

const userLogin = async (req, res) => {
  let { email, password } = req.body;

  const user = await usermodel.findOne({ email });
  if (!user) return res.status(500).send("something is wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign(
        { email: email, userid: user._id },
        process.env.USER_KEY
      );
      res.cookie("token", token, { httpOnly: true, maxAge: 36000 });
      return res.json({ status: true, message: "login successfully" });
    } else {
      res.send("wrong password");
    }
  });
};

const movieSearch = async (req, res) => {
  try {
    const { type, category } = req.query;
    let query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    const movies = await moviemodel.find(query);
    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found ." });
    }

    res.status(200).json(movies);
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while searching for movies.", e });
  }
};

module.exports = { userSignup, userLogin, movieSearch };
