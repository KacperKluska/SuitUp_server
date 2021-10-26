require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const { connect } = require("./database/connect");

const PORT = 3001;
let connection;

app.listen(PORT, async (error) => {
  if (error) {
    console.log("There was an error while staring a server!");
  } else {
    console.log(`Server started at port ${PORT}`);
    connection = await connect();
    require("./Controllers/UserController")(app);
  }
});

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { app, authenticateToken };
