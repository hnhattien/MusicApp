var express = require('express');
var router = express.Router();
const requests = require('request-promise');
const db = require("../databases/DatabaseConnection")
const {connectDB} = require("../databases/DatabaseConnection")
/* GET home page. */
router.get('/', function(req, res, next) {
  let sqlSelectAll = `SELECT * FROM music`;
  if(!db){
    connectDB()
    console.log("Reconnect");
  }
  db.query(sqlSelectAll,(err, result)=>{
    console.log(result.length)
    if(err) {
      res.send("Error Database");
      throw err
    };
    res.send(result)
    db.close()
  })
  
});

// GET Category

router.get("/category/:cat",(req,res,next)=>{
  if(!db){
    connectDB()
    console.log("Reconnect");
  }
  let catname = req.params.cat;
  let sqlSelectCat = `SELECT * FROM user`
  db.query()
  
})



module.exports = router;
