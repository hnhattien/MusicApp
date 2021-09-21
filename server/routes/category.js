const express = require("express");
const router = express.Router();
const db = require("../databases/DatabaseConnection");

router.get("/", (req, res, next) => {
    let sqlSelect = `SELECT * FROM category`;
    db.query(sqlSelect).then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send({error: {message: String(err)}});
    })
})

module.exports = router;