const mysql = require('mysql')
const util = require('util');
const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "",
    database: "MusicSE447"
})
pool.getConnection((err,connection) =>{
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error("Database connection was closed");
    }
  }
  if(connection){
    connection.release();
  }
})

pool.query = util.promisify(pool.query);

module.exports = pool;