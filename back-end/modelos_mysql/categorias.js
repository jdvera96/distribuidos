const mysql =require('mysql');

connection=mysql.createConnection({
    host:'localhost',
    user: 'root', 
    password: 'root', 
    database: 'polylost'});

let categoriaModel={};

categoriaModel.getCategoria=(callback)=>{
    if(connection){
        connection.query('SELECT * FROM categoria',
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

categoriaModel.getcategoriaId=(identificador,callback)=>{
    if(connection){
        connection.query(`select * from categoria where idcategoria=${identificador};`,
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

categoriaModel.insertcategoria=(categoriaData,callback)=>{
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

categoriaModel.update=(categoriaData,callback)=>{
    if(connection){
        const sql = `
            UPDATE categoria SET 
            nombre = ${connection.escape(categoriaData.nombre)} 
            WHERE idcategoria= ${connection.escape(categoriaData.idcategoria)}
        `

        connection.query(sql,(err,result)=>{
            if(err){
                throw err;
            }else{
                callback(null,{
                    "msg": "exito"
                });
            }
        })
    }
}
module.exports=categoriaModel;