const jwt = require('jsonwebtoken');
const { app, authenticateToken } = require('../server');
const { User } = require('../models/User');
const {
  saveUser,
  getUserByEmail,
  getUserData,
} = require('../services/UserService');

module.exports = function (app) {
  app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = await getUserByEmail(email);
    if (!foundUser)
      return res.status(401).send({ error: 'Invalid email or password' });

    const passwordValidation = await foundUser.comparePassword(password);
    if (!passwordValidation)
      return res.status(401).send({ error: 'Invalid email or password' });

    const user = { email: email, id: foundUser.id };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res
      .cookie('accessToken', accessToken, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
      })
      .cookie('refreshToken', refreshToken, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
      })
      .status(200)
      .json({
        message: 'Logged successfully',
      });
  });

  app.post('/register', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    if (await getUserByEmail(email))
      return res
        .status(400)
        .send({ error: 'User with that email already exists!' });

    const result = await saveUser(name, surname, email, password);
    if (result)
      return res.status(200).send({ message: 'Account created successfully!' });
    return res.status(400).send({ error: 'Error during signing up process' });
  });

  app.get('/refresh_token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken === null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const accessToken = generateAccessToken({
        email: user.email,
        id: user.id,
      });
      res
        .cookie('accessToken', accessToken, {
          secure: process.env.NODE_ENV !== 'development',
          httpOnly: true,
        })
        .status(200)
        .json({ message: 'Token refreshed' });
    });
  });

  app.delete('/logout', (req, res) => {
    return res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(200)
      .json({ message: 'Logged out successfully' });
  });

  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s',
    });
  }

  function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  }

  app.get('/verify_user', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Verified' });
  });

  app.get('/user', authenticateToken, async (req, res) => {
    const result = await getUserData(req.query.id);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ error: 'Server error' });
  });
};
