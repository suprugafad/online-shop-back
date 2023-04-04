const { secret } = require('../config/secrets');
const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({error: `Authorization token not found.`});
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.id = decodedToken.id;
    next();
  } catch (err) {
    return res.status(401).json({error: 'Invalid authorization token.'});
  }
}
