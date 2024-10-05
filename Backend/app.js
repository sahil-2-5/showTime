const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin : ["http://localhost:5173"],
  credentials: true
}));

app.get("/",cors(), (req, res) => {
  res.send("Hello wolrd");
});

app.use("/user", userRouter);

app.use("/admin",adminRouter);

app.listen(port, () => {
  console.log(`Server run at ${port}`);
});
