const jwt = require('../jwt');
const { secret } = require("../config/secrets");
const user = require('../models/User')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.generateToken(payload, secret, {expiresIn: "24h"});
}

class authController {
  auth (req, res) {
    try {
      const {id, password} = req.body;

      if (user.id !== id) {
        return res.status(400).json({message: `User does not exist.`});
      }

      if (password !== user.password) {
        return res.status(400).json({message: `Password is incorrect`});
      }

      const token = generateAccessToken(user.id, user.roles);

      return res.json({token});
    } catch (e) {
      res.status(400).json({message: 'Login error'});
    }
  }
}

module.exports = new authController();
