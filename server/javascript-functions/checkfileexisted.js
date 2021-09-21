const fs = require('fs');
const os = require('os');
checkFileExisted = (filename)=>{
   
    let path = `/upload/musics/audio/${filename}`;
    if(fs.existsSync(path)){
        return true;
    }
    else{
        return false;
    }
}

module.exports = checkFileExisted;