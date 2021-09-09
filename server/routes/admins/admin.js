const express = require("express");
const router = express.Router();
const musicdata = require("../../api/data")
const mysql = require("mysql");
const musiclist = require("../../api/musiclist.js");
const categorydata = require("../../api/categorydata");

router.get("/database/createmusictable",(req, res)=>{
  let sql = "CREATE TABLE music(id int AUTO_INCREMENT NOT NULL PRIMARY KEY, title text, audio text, artist_name text DEFAULT 'Unknown', cat_id int, cat_name text, public_year int DEFAULT '2021', lyrics text, artist_id int, upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(artist_id) REFERENCES artist(id), FOREIGN KEY(cat_id) REFERENCES category(id))";
  db.query(sql,(err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send("Music table was created");
  })

})

router.get("/database/createcategorytable",(req,res)=>{
  let sql = "CREATE TABLE category(id int AUTO_INCREMENT NOT NULL PRIMARY KEY, title text)";
  db.query(sql,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send("Category table created...");
  })
})

router.get("/database/createartisttable",(req,res)=>{
  let sql = "CREATE TABLE artist(id int AUTO_INCREMENT NOT NULL PRIMARY KEY, title text)"
  db.query(sql,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send("Artist table created...");
  })
})
router.get("/database/createusertable",(req,res)=>{
  let sql = "CREATE TABLE user(id int AUTO_INCREMENT NOT NULL PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, displayedName VARCHAR(100), avatar TEXT DEFAULT 'defaultavatar.png')"
  db.query(sql,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send("User table created...");
  })
})

router.get("/database/createresetpasswordtable", (req, res) => {
  let sql = "CREATE TABLE resetpassword(id int AUTO_INCREMENT NOT NULL PRIMARY KEY, selector TEXT, token TEXT, useremail TEXT)";
  db.query(sql,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send("resetpassword table created...");
  })
})
router.get('/database/createalbumtable',(req,res)=>{
  let sql = "CREATE TABLE album(id int AUTO_INCREMENT NOT NULL PRIMARY KEY, title TEXT DEFAULT 'Album is not named', artist_id int, cat_id int, FOREIGN KEY(cat_id) REFERENCES music(cat_id),FOREIGN KEY(artist_id) REFERENCES music(artist_id))";
  db.query(sql,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send("album table was created done!");
  })
})
router.get('/database/insertmusicfromapiintodatabase',(req, res)=>{
  musics = musicdata.music
  let sql = ""
  musics.forEach(music => {
    let isDuplicate = false;
    let sqlcheckduplicate = `SELECT * FROM music WHERE mp3="${music.mp3}"`;
    sql = `INSERT music(title,cat_name,artist_name,lyrics,mp3, thumbnail) VALUES("${music.title}","${music.cat_name}","${music.artist_name}","${mysql.escape(music.lyrics)}", "${music.mp3}", "${music.thumbnail}")`
    db.query(sqlcheckduplicate,(err, result)=>{
      if(err) throw err;
      console.log(result,"Hi");
      if(result.length != 0){
        isDuplicate = true;
      }
    })
    if(!isDuplicate){
      for(let i = 0 ; i < musiclist.length; i++){
        if(musiclist[i] === music.mp3){
          db.query(sql,(err,result)=>{
            if(err) throw err;
          })
          console.log("Equal", i)
        }
      }
    }
  });
  res.send("Created")
})

router.get('/database/insertcategoryfromapiintodatabase',(req, res)=>{
  
  let sql = ""
  categorydata.forEach(cat => {
    let isDuplicate = false;
    let sqlcheckduplicate = `SELECT * FROM music WHERE mp3="${cat.title}"`;
    sql = `INSERT category(title) VALUES("${cat.title}")`
    db.query(sqlcheckduplicate,(err, result)=>{
      if(err) throw err;
      console.log(result,"Hi");
      if(result.length != 0){
        isDuplicate = true;
      }
    })
    if(!isDuplicate){
      db.query(sql,(err,result)=>{
        if(err) throw err;
      })
    }
  });
  res.send("Created")
})

router.get('/database/mapartistfrommusictoartistable',(req, res)=>{
  
  let sql = "SELECT artist_name FROM music";
  
  let artistArray = []
  db.query(sql,(err,result)=>{
    result.forEach(item=>{
      artistArray.push(item.artist_name)
    })
    let artistSet = new Set(artistArray)
    console.log(artistArray.length);
    console.log(artistSet.size);
    
    artistSet.forEach((artist)=> {
      db.query(`INSERT artist(title) VALUEs("${artist}")`,(err,result)=>{
        if(err) throw err;
        console.log(result)
        console.log(artist)
      })
    })
    // Array.from(artists).forEach(artist=>{
    //   db.query(`INSERT artist(title) VALUEs("${artist.title}")`,(err,result)=>{
    //     if(err) throw err;
    //     console.log(result)
    //   })
    // })
  })
  
  res.send("Created")
})