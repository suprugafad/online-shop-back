const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopdb',
  password: 'poshik',
  port: 5432,
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







