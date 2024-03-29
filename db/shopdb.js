const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

fs.readFile('./shop.sql', 'utf8', (err, sqlQuery) => {
  if (err)
    throw err;

  pool.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.log('Script executed successfully');
    pool.end();
  });
});







