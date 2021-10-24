require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const { connect } = require("./database/connect");

const PORT = 3001;
let connection;

app.listen(PORT, async (error) => {
  if (error) {
    console.log("There was an error while staring a server!");
  } else {
    console.log(`Server started at port ${PORT}`);
    connection = await connect();
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { app, authenticateToken };
