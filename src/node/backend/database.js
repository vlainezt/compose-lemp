const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rootpass',
  database: 'firmas',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('Base de datos Conectada');
  }
});

module.exports = mysqlConnection;
