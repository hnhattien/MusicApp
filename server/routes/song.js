const express = require("express");
const router = express.Router();
const db = require("../databases/DatabaseConnection");
const slug = require("slug");
const splitArtist = require('../javascript-functions/split-artist');
const fs = require('fs');
const crypto = require('crypto');
//search mp3
function queryArtistsFromArray(artists){
    let baseSqlSelectArtist = "SELECT * FROM artist WHERE ";
    let response = [];
    let sqlQueryArtistList = [];
    if(Array.isArray(artists)){
        artists.forEach((artist_name)=>{
            sqlQueryArtistList.push(`title='${artist_name}'`);
        })
        let sqlSelect = `${baseSqlSelectArtist} ${sqlQueryArtistList.join(" OR ")}` 
       
        db.query(sqlSelect).then(result=>{
            console.log(result)
            if(result.length>0){
            let artistObject = {};

            Array.from(result).forEach((artist)=>{
                    Object.keys(artists).forEach((key)=>{
                        artistObject[key] = artist[key];
                    })
                    response.push(artistObject);
            })
            }    
        }).catch((err)=>{
            console.log(err);
        })

        
    }

    return response;
    
}

router.get("/randomfetch/:num",async (req, res, next)=>{
    let sqlRandomSelect = `SELECT lyrics, title, thumbnail, artist_name as artist, audio, slug FROM music ORDER BY RAND() LIMIT ${req.params.num}`;
    let response = null;
    await db.query(sqlRandomSelect).then(result=>{
        if(Array.isArray(result)){
            response = result[0];
        }

        res.send(response);
        
    }).catch((err)=>{
        console.log(err);
    })
    

    
})
router.post("/updateview",(req, res, next)=>{
    
    let id = req.body.musicId;
    if(id){
        let sqlUpdateView = `UPDATE music SET viewcount = viewcount+1 WHERE id=?`;
        db.query(sqlUpdateView, [id]).then(()=>{
            res.send({"message":"Update view success"});
        }).catch(err=>{
            res.send({error: {"message": String(err)}});
        })
    }
    else{
        res.send({error: {message: "Please give a music id"}})
    }
    
})
router.get("/:slug",async (req,res,next)=>{
    let targetSlugSong = req.params.slug;
    
    let sqlSelectMusic = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, m.lyrics FROM music m INNER JOIN artist a ON a.id = m.artist_id WHERE m.slug=? UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id as artist_thumbnail , m.audio, m.slug as music_slug, m.artist_id as artist_slug, m.viewcount, m.lyrics FROM music m WHERE m.artist_id IS NULL AND m.slug =?`;
    let response = {};

    db.query(sqlSelectMusic, [targetSlugSong, targetSlugSong]).then(result=>{
        response = result[0];
    }).catch(err=>{
        response['error'] = {message: String(err)}
        
    }).then(()=>{
        res.send(response);
    })
        

   
    
    
})

router.post("/heartaction",async (req, res, next) => {
    
    if(req.user){
        // Check this action is unheart or heart 
        let songid = req.body.songid;
        let userid = String(req.user.id);
        let sqlSelectCheck="SELECT * FROM liketable WHERE userid=? AND songid=?";
        let sqlSelectAffectedMusic = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, m.lyrics FROM music m INNER JOIN artist a ON a.id = m.artist_id WHERE m.id=? UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id as artist_thumbnail , m.audio, m.slug as music_slug, m.artist_id as artist_slug, m.viewcount, m.lyrics FROM music m WHERE m.artist_id IS NULL AND m.id =?`
        db.query(sqlSelectCheck,[userid, songid]).then(result=>{
            if(result.length === 0){
                //This is heart
                let sqlInsertLike = `INSERT INTO liketable(userid, songid) VALUES(?, ?)`;
                // Heart is Like
                db.query(sqlInsertLike, [req.user.id, req.body.songid]).then(resultHeart=>{
                   db.query(sqlSelectAffectedMusic,[songid,songid]).then((resultMusic)=>{
                       let affectedMusic = resultMusic[0];
                       affectedMusic['liked'] = true;
                       res.send({message: "Liked", isLike: true, music: affectedMusic });
                   })


                   
                }).catch(err=>{
                    res.send({error: {message: String(err)}});
                })
            }
            else{
                //This is unheart
                let sqlRemoveLike = `DELETE FROM liketable WHERE userid=? AND songid=?`;
                db.query(sqlRemoveLike,[req.user.id, req.body.songid]).then(resultUnheart=>{
                    db.query(sqlSelectAffectedMusic,[songid,songid]).then((resultMusic)=>{
                        let affectedMusic = resultMusic[0];
                        res.send({message: "Unliked", isLike: false, music: affectedMusic});     
                    })
                   
                }).catch(err=>{
                    res.send({error: {message: String(err)}});
                })
            } 
        }).catch(err=>{
            console.log("Hi");
            res.send({error: {message: String(err)}});
        });
    }
    else{
        res.send({isRequireLogin: true,error:{message: "You must to login to perform this action."}})
    }
})

router.post("/upload", async(req, res, next) => {

    if(req.user){
        let songname = req.body.songname,
            artistname = req.body.artistname,
            category = req.body.catid,
            thumbnailfilename = req.body.thumbnailfilename,
            songfilename = req.body.songfilename,
            songThumbnailFileBase64 = String(req.body.songThumbnailFileBase64).split(";base64,").pop(),
            songFileBase64 = String(req.body.songFileBase64).split(";base64,").pop();
            console.log(thumbnailfilename,songfilename,songThumbnailFileBase64.substr(0,20),songFileBase64.substr(0,20))
        fs.writeFileSync(`public/upload/musics/thumbnails/${thumbnailfilename}`,songThumbnailFileBase64, {encoding: "base64"});
        fs.writeFileSync(`public/upload/musics/audio/${songfilename}`,songFileBase64, {encoding: "base64"});
        let sqlInsertSong = `INSERT INTO music(title,slug,artist_name,cat_id,thumbnail,audio) VALUES(?,?,?,?,?,?)`;
        let isDuplicate = true;
        let slugData;
        while(isDuplicate){
            slugData = `${slug(songname,"-")}.${crypto.randomBytes(6).toString('hex')}`;
            sqlSelectSlug = `SELECT * FROM music WHERE slug='${slugData}'`; //Check duplicate
            try{
              let result = await db.query(sqlSelectSlug);
              if(result.length === 0){
                isDuplicate = false;
              }      
            }
            catch(err){
              console.log(err);
            }
            
            
          } 
        db.query(sqlInsertSong, [songname,slugData,artistname,category,thumbnailfilename, songfilename ]).then(result=>{
            res.send({message:"Upload song success"});
        }).catch(err =>{
            res.send({error: {message: String(err)}});
        })
    }
    else{
        res.send({error: {message: "You must to login to upload.", isRequireLogin: true}});
    }
})

router.get("/category/:catslug",(req, res, next)=>{

        console.log(req.params.catslug,"HihIio")
        if(req.params.catslug !== ""){
            try{
                let slug = req.params.catslug;
                console.log(slug,"JSKLJDLAKLDKAD");
                let sqlSelect = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, m.lyrics, c.title as category_name FROM music m INNER JOIN category c ON c.id = m.cat_id INNER JOIN artist a ON m.artist_id = a.id WHERE c.slug =? UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id as artist_thumbnail , m.audio, m.slug as music_slug, m.artist_id as artist_slug, m.viewcount, m.lyrics, c.title as category_name FROM music m INNER JOIN category c ON c.id = m.cat_id INNER JOIN artist a ON m.artist_id IS NULL  WHERE c.slug=?`
                db.query(sqlSelect,[slug,slug]).then((result)=>{
                    res.send(result);
                }).catch(err=>{
                    res.send({error: {message: String(err)}});    
                })
            }
            catch(err){
                
                res.send({error: {message: String(err)}});
            }
        }
        

    
})

router.get("/album/:albumslug",(req, res, next)=>{

    console.log(req.params.albumslug,"HihIio")
    if(req.params.albumslug !== ""){
        try{
            let slug = req.params.albumslug;
            console.log(slug,"JSKLJDLAKLDKAD");
            let sqlSelect = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, m.lyrics, al.title as album_name FROM music m INNER JOIN album al ON al.cat_id = m.cat_id INNER JOIN artist a ON m.artist_id = a.id WHERE al.slug = ? UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id as artist_thumbnail , m.audio, m.slug as music_slug, m.artist_id as artist_slug, m.viewcount, m.lyrics, al.title as album_name FROM music m INNER JOIN album al ON al.cat_id = m.cat_id INNER JOIN artist a ON m.artist_id IS NULL  WHERE al.slug=? UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, m.lyrics, al.title as album_name FROM music m INNER JOIN album al ON al.artist_id = m.artist_id INNER JOIN artist a ON m.artist_id = a.id WHERE al.slug = ? UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id as artist_thumbnail , m.audio, m.slug as music_slug, m.artist_id as artist_slug, m.viewcount, m.lyrics, al.title as album_name FROM music m INNER JOIN album al ON al.artist_id = m.artist_id INNER JOIN artist a ON m.artist_id IS NULL  WHERE al.slug=?`
            db.query(sqlSelect,[slug,slug,slug,slug]).then((result)=>{
                res.send(result);
            }).catch(err=>{
                res.send({error: {message: String(err)}});    
            })
        }
        catch(err){
            
            res.send({error: {message: String(err)}});
        }
    }
    


})

router.post("/updatelyrics",(req, res, next)=>{
    let songId = req.body.songId;
    
    if(songId){
        let lyrics = req.body.lyrics;
       let sqlUpdate = `UPDATE music SET lyrics=? WHERE id=?`;
       db.query(sqlUpdate,[lyrics,songId]).then(()=>{
           res.send({message:"Update lyrics success"});
       }).catch(err=>{
           res.send({error: {message: String(err)}});
       })
    }
    else{
        res.send({error:{message: "You must to provide a song id. "}});
    }
})
module.exports = router;