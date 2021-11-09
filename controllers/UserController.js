const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../server');
const { saveUser, getUserByEmail } = require('../services/UserService');

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '20s',
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = function (app) {
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const foundUser = await getUserByEmail(email);
      if (!foundUser)
        return res.status(401).send({ error: 'Invalid email or password' });

      const passwordValidation = await foundUser.comparePassword(password);
      if (!passwordValidation)
        return res.status(401).send({ error: 'Invalid email or password' });

      const user = { email, id: foundUser.id };
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({
          message: 'Logged successfully',
        });
    } catch (err) {
      console.error(err);
    }
  });

  app.post('/register', async (req, res) => {
    try {
      const { name, surname, email, password } = req.body;

      if (await getUserByEmail(email))
        return res
          .status(405)
          .send({ error: 'User with that email already exists!' });

      const result = await saveUser(name, surname, email, password);
      if (result)
        return res
          .status(200)
          .send({ message: 'Account created successfully!' });
      return res.status(400).send({ error: 'Error during signing up process' });
    } catch (err) {
      console.error(err);
    }
  });

  app.get('/refresh_token', (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken === null) return res.sendStatus(401);

    return jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return res.sendStatus(401);

        const accessToken = generateAccessToken({
          email: user.email,
          id: user.id,
        });
        return res
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .status(200)
          .json({ message: 'Token refreshed' });
      },
    );
  });

  app.delete('/logout', (req, res) => {
    return res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(200)
      .json({ message: 'Logged out successfully' });
  });

  app.get('/verify_user', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Verified', id: res.user.id });
  });
};
