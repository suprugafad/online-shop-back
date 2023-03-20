const salt = require('../config/secrets');
const jwt = require('../jwt');

module.exports = function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send('Unauthorized');
  } else {
    try {
      req.user = jwt.verifyToken(token, salt);
      next();
    } catch (err) {
      res.status(401).send(`Unauthorized`);
    }
  }
}
