
const express = require("express");
const router = express.Router();
const db = require("../databases/DatabaseConnection");


router.get("/",(req, res, next)=>{
    try{
        let sqlSelect = `SELECT * FROM category WHERE slug IS NOT NULL`;
        db.query(sqlSelect).then(result=>{
            res.send(result);
        }).catch(err=>{
            res.send({error: {message: String(err)}});
        })
    }
    catch(err){
        
        res.send({error: {message: String(err)}});
    }
})
module.exports = router;