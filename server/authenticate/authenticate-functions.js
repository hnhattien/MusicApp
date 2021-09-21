const db = require('../databases/DatabaseConnection');
const isEqualPassword = async (password, repeatpassword) =>{
    return password === repeatpassword;
}

const isValidEmail = async (username) =>{
    let sqlSelect = `SELECT id FROM user WHERE username='${username}'`;
    
    let response = false;
    await db.query(sqlSelect).then(result=>{
       
       if(Array.isArray(result)){
           if(result.length !== 0){
            response = true;
             
           }
           
       }
    }).catch(err=>{
        console.log(err);
    })
    
    return response;
}

const isExistedUsername = async (username) =>{
    let sqlSelect = `SELECT id FROM user WHERE username= ?`;
    
    let response = false;
    await db.query(sqlSelect,[username]).then(result=>{
      
       if(Array.isArray(result)){
           if(result.length !== 0){
            response = true;
            
           }
           
       }
    }).catch(err=>{
        console.log(err);
    })
   
    return response;
}
const isExistedEmail = async (email) =>{
    let sqlSelect = `SELECT id FROM user WHERE email= ?`;
    let response = false;
    await db.query(sqlSelect,[email]).then(result=>{
       if(Array.isArray(result)){
           if(result.length !== 0){
            response = true;
           }
           
       }
    }).catch(err=>{
        console.log(err);
    })
    return response;
}
exports.isExistedUsername = isExistedUsername;
exports.isEqualPassword = isEqualPassword;
exports.isExistedEmail = isExistedEmail;