const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: "MusicSE447"
})
const connectDB = ()=>{
    db.connect((err)=>{
      if(err){
        console.log("Connect database error!",err);
        process.exit();
      }
      else{
        console.log("Connected Database")
      }
    })
  }
module.exports.connectDB = connectDB
module.exports = db;