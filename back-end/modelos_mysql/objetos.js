const mysql =require('mysql');

connection=mysql.createConnection({
    host:'localhost',
    user: 'root', 
    password: 'root', 
    database: 'db_polylost'});

let objetoModel={};

objetoModel.getObjeto=(callback)=>{
    if(connection){
        connection.query('SELECT * FROM objeto',
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

objetoModel.getRecientes=(callback)=>{
    if(connection){
        connection.query('SELECT * FROM objeto WHERE fechaRO =CURDATE()',
        (err,row)=>{
            if(err){
                throw err;
            }else{
                return callback(null,row);
            }
        }
        );
    }
}


objetoModel.getObjetoId=(identificador,callback)=>{
    if(connection){
        connection.query(`select * from objeto where idObjeto=${identificador};`,
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



objetoModel.insertObjeto=(objetoData,callback)=>{
    if(connection){
        connection.query('INSERT INTO objeto SET ?',objetoData,
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

objetoModel.update=(userData,callback)=>{
    if(connection){
        const sql = `
            UPDATE objeto SET 
            nombre = ${connection.escape(userData.nombre)},
            imagenO = ${connection.escape(userData.imagenO)},
            estadoR = ${connection.escape(userData.estadoR)},
            fechaRO = ${connection.escape(userData.fechaRO)},
            descripcion = ${connection.escape(userData.descripcion)},
            color = ${connection.escape(userData.color)},
            horaRegistro = ${connection.escape(userData.horaRegistro)},
            eliminadoO = ${connection.escape(userData.eliminadoO)},
            calificacionEO = ${connection.escape(userData.calificacionEO)},
            idsubcategoria = ${connection.escape(userData.idsubcategoria)},
            idEstudiante = ${connection.escape(userData.idEstudiante)},
            lugar = ${connection.escape(userData.lugar)} 
            WHERE idobjeto= ${connection.escape(userData.idobjeto)}
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

objetoModel.delete=(id,callback)=>{
    if(connection){
        let sql= `SELECT * FROM objeto WHERE idobjeto = ${connection.escape(id)}`;

        connection.query(sql, (err,row)=>{
            if(row){
                let sql =`
                DELETE FROM objeto WHERE idobjeto = ${id}`;
                connection.query(sql,(err,result)=>{
                    if(err){
                        throw err;

                    }else{
                        callback(null,{msg: 'deleted'});
                    }
                });
            }else{
                callback(null,{msg: 'not exists'})
            }
        })
    }
}

module.exports=objetoModel;