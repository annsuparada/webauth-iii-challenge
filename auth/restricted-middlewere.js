const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: 'No credentials provided' });
      } else {
        req.user ={ username: decodedToken.user}
        next()
      }
  })
  } else {
    res.status(400).json({ message: 'no credentials provided'})
  }
};
