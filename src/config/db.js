const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",      
  user: "root",           
  password: "aluno",    
  database: "my_database",   
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;