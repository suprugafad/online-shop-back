const pool = require('../db/index');

class userController {
  getUsers = async (request, response) => {
    await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  getUserById = async (request, response) => {
    const id = parseInt(request.params.id);

    await pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  updateUser = async (request, response) => {
    const id = parseInt(request.params.id);
    const {name, email} = request.body;

    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      });
  }

  deleteUser = async (request, response) => {
    const id = parseInt(request.params.id);

    await pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    });
  }
}

module.exports = new userController();

