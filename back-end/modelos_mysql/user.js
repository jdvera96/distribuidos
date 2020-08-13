const mysql =require('mysql');

connection=mysql.createConnection({
    host:'localhost',
    user: 'root', 
    password: 'root', 
    database: 'polylost'});

let userModel={};

userModel.comprobarCredenciales=(campos,callback)=>{
    if(connection){
        connection.query(`SELECT * FROM usuario where correo='${campos.correo}' and password='${campos.password}'`,
        (err,row)=>{
            if(err){
                throw err;
            }else{
                callback(null,row);
            }
        }
        );
    }
}
/*
userModel.insertcategoria=(categoriaData,callback)=>{
    console.log(categoriaData)
    if(connection){
        connection.query('INSERT INTO categoria SET ?',categoriaData,
        (err,result) =>{
            if(err){
                throw err
            }else{
                callback(null,{
                    'insertId': result.insertId
                });
            }
        }
        
        );
    }
}
*/
module.exports=userModel;