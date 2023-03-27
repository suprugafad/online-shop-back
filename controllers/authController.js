const jwt = require('jsonwebtoken');
const { secret } = require("../config/secrets");
const pool = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class authController {
  regUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length > 0) {
      return res.status(409).send('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
      res.status(201).send('User was created successfully');
    } catch (err) {
      next(err);
    }
  };

  logUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.rows[0].id, }, secret, { expiresIn: '1d' });

    res.send(`Success! Your token:  ${token}`);
  };
}

module.exports = new authController();
