const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getConnection } = require("typeorm");
const { app, authenticateToken } = require("../server");
const { User } = require("../models/User");

module.exports = function (app) {
  app.post("/login", async (req, res) => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = await userRepository.findOne({ where: { email: email } });
    if (!foundUser)
      return res.status(401).send({ error: "Invalid email or password" });

    const passwordValidation = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!passwordValidation)
      return res.status(401).send({ error: "Invalid email or password" });

    const user = { email: email };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .status(200)
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "Logged successfully",
      });
  });

  app.post("/register", async (req, res) => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    if ((await userRepository.find({ where: { email } })).length)
      return res
        .status(400)
        .send({ error: "User with that email already exists!" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = v4();
    const newUser = new User(id, name, surname, email, hashedPassword);

    const result = await userRepository.save(newUser);
    if (result)
      return res.status(200).send({ message: "Account created successfully!" });
    return res.status(400).send({ error: "Error during signing up process" });
  });

  app.get("/refresh_token", (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies.refreshToken);
    if (refreshToken === null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ email: user.email });
      res.cookie("accessToken", accessToken).json({ accessToken: accessToken });
    });
  });

  app.delete("/logout", (req, res) => {
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Logged out successfully" });
  });

  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
  }

  function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  }

  app.get("/verify_user", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Verified" });
  });
};
