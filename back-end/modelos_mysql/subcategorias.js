const mysql =require('mysql');

connection=mysql.createConnection({
    host:'localhost',
    user: 'root', 
    password: 'root', 
    database: 'db_polylost'});

let subcategoriaModel={};

subcategoriaModel.getSubCategoria=(callback)=>{
    if(connection){
        connection.query('SELECT * FROM subcategoria',
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

subcategoriaModel.getSubcategoriaId=(identificador,callback)=>{
    if(connection){
        connection.query(`select * from subcategoria where idsubcategoria=${identificador};`,
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

subcategoriaModel.insertSubcategoria=(subcategoriaData,callback)=>{
    console.log(subcategoriaData)
    if(connection){
        connection.query('INSERT INTO subcategoria SET ?',subcategoriaData,
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

subcategoriaModel.update=(subcategoriaData,callback)=>{
    if(connection){
        const sql = `
            UPDATE subcategoria SET 
            nombre = ${connection.escape(subcategoriaData.nombre)} 
            WHERE idsubcategoria= ${connection.escape(subcategoriaData.idsubcategoria)}
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
module.exports=subcategoriaModel;