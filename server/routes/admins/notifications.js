const router = require('express').Router();
const db = require("../../databases/DatabaseConnection");
const crypto = require('crypto');
const slug = require('slug');
const capitalize = require('../../javascript-functions/capitalize.js');
let passport = require('passport');
const ROLE = require('../../authenticate/RoleData.js');


router.get("/",(req, res, next)=>{
  console.log("Hii")
  let num = req.params.num || 20;
    let sqlSelect = `SELECT * FROM notifications ORDER BY time DESC LIMIT ?`;
    db.query(sqlSelect,[num]).then(result=>{
      console.log(result);
      res.send(result);

    }).catch((err)=>{
      res.send({error: {message: String(err)}});
    })

})
router.post("/add",(req,res,next) => {
  let title = req.body.title;
  let type = req.body.type;
  let thumbnail = req.body.thumbnail;
  let iconclasses = req.body.iconclasses;
  let sqlInsert = `INSERT INTO notifications(title,type,thumbnail,iconclasses) VALUES(?,?,?,?)`;
  db.query(sqlInsert, [title,type,thumbnail,iconclasses]).catch((err)=>{
    res.send({error: {message: String(err)}});

  })
})
router.get("/get/:num",(req, res, next)=>{
  let num = req.params.num || 20;
    let sqlSelect = `SELECT * FROM notifications LIMIT ?`;
    db.query(sqlSelect,[num]).then(result=>{
      res.send(result);
    }).catch((err)=>{
      res.send({error: {message: String(err)}});
    })

})

router.post('/updateseenstate',async (req, res, next) => {
  let sqlUpdateSeen = `UPDATE notifications SET seen=1 WHERE time < CURRENT_TIMESTAMP`;
  try{
    await db.query(sqlUpdateSeen);
    res.send({message: "Update seen ok!"});
  }catch(err){
    res.send({error: {message: String(err)}});
  }
})

router.get('/unseen', async (req, res, next)=> {
  let sqlSelectUnseen = `SELECT * FROM notifications WHERE seen=0`;
  try{
    let response = await db.query(sqlSelectUnseen);
    res.send(response);
  }catch(err){
    res.send({error: {message: String(err)}});
  }

})
module.exports = router;
