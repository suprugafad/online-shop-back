const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'shop',
  password: 'password',
  port: 5432,
});