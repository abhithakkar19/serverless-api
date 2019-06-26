const mysql = require('mysql')
const pool = mysql.createPool({
  // connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: 'serverlessdb.cwoe0hpllkpn.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: 'demo_db'
});

// const pool = mysql.createConnection({
//     // connectionLimit: 1000,
//     // connectTimeout: 60 * 60 * 1000,
//     // acquireTimeout: 60 * 60 * 1000,
//     // timeout: 60 * 60 * 1000,
//     host: 'serverlessdb.cwoe0hpllkpn.us-east-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'admin123',
//     database: 'innodb'
//   });

// const pool = mysql.createPool({
//   host: 'testdb.crda4wcnlunz.us-east-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'admin123',
//   database: 'slsdb'
// });
module.exports = pool;