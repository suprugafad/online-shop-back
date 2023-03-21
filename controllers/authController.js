const jwt = require('../jwt');
const { secret } = require("../config/secrets");
const user = require('../models/User')

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.generateToken(payload, secret, {expiresIn: "24h"});
}

class authController {
  auth (req, res) {
    try {
      const {username, password} = req.body;

      if (user.username !== username) {
        return res.status(400).json({message: `User does not exist.`});
      }

      if (password !== user.password) {
        return res.status(400).json({message: `Password is incorrect`});
      }

      const token = generateAccessToken(user.id);

      return res.json({token});
    } catch (e) {
      res.status(400).json({message: 'Login error'});
    }
  }
}

module.exports = new authController();
