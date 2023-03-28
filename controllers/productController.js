const pool = require('../db/index');

class productController {
  getProducts = async (request, response) => {
    await pool.query('SELECT * FROM product ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  postProduct = async (request, response, next) => {
    const { title, price } = request.body;
    try {
      await pool.query(`INSERT INTO product (title, price) VALUES ($1, $2)`, [title, price]);
      response.status(201).send(`Product was added`);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new productController();