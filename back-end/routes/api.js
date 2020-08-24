var express = require('express');
var router = express.Router();
var modeloObjeto= require('../modelos_mysql/objetos');
var modeloSubCategoria=require('../modelos_mysql/subcategorias');

var modeloCategoria=require('../modelos_mysql/categorias');
var modeloUser=require('../modelos_mysql/user');

var redis=require('redis');
var REDIS_PORT=6379;

const client=redis.createClient(REDIS_PORT);

var fecha=new Date()
var marcaTiempoUltima=fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();


function compararFecha(fecha1,fecha2){

    let array1=fecha1.split('/');
    let array2=fecha2.split('/');

    if(parseInt(array1[2])<parseInt(array2[2])){ // el ano actual es mayor que el grabado
        return 1;
    }else if(parseInt(array1[1])<parseInt(array2[1])){
        return 1;
    }else if(parseInt(array1[0])<parseInt(array2[0])){
        return 1;
    }else{
        return 0;
    }
}

function consultarCacheApiReciente(callback){
    client.get('recientes',(err,data)=>{
        if(err){
            return callback(err,null);
        }else{

            if(data==null){ //esa data no existe debemos buscar en la base de datos
                console.log('data no existe en cache')
                return callback(null,0);
            }else{
                console.log('encontrado en cache');
                return callback(null,data);
            }
            
        }
    });
    

}

/* GET users listing. */

//---------------------------------------------objetos-----------------------------

//---GET-----------------------------------------
router.get('/objetos', function(req, res, next) {
    modeloObjeto.getObjeto((err,data)=>{
        
        res.send(data);
    })
  
});

//---GET by ID----------------------------------
router.get('/objetos/:id', function(req, res, next) {
    const id=req.params.id
    
    modeloObjeto.getObjetoId(id,(err,data)=>{
        console.log(data);
        res.send(data);
    });
});


router.get('/recientes', function(req, res, next) {

    
    consultarCacheApiReciente((err,data)=>{
        if(err || data==0){
            modeloObjeto.getRecientes((err,data2)=>{
                console.log('data encontrada en la base');

                client.setex('recientes',30,JSON.stringify(data2),(err,replay)=>{
                    console.log('cache actualizada')
                });

                res.send(data2);
            });
        }else{
            res.send(JSON.parse(data));
        }
    });


    
});


//---POST----------------------------------------
router.post('/objetos', function(req, res, next) {
    
    const objetoData={
        idobjeto: null,
        nombre: req.body.nombre,
        imagenO: "null",
        estadoR: req.body.estadoR,
        fechaRO: req.body.fechaRO,
        descripcion: req.body.descripcion,
        color:req.body.color,
        horaRegistro:req.body.horaRegistro,
        eliminadoO:req.body.eliminadoO,
        calificacionEO:req.body.calificacionEO,
        idsubcategoria:req.body.idsubcategoria,
        idEstudiante:req.body.idEstudiante,
        lugar: req.body.lugar
    };

    modeloObjeto.insertObjeto(objetoData,(err,data)=>{
        if(data && data.insertId){
            res.json({sucess: true,
            msg: 'objeto insertado',
            data:data
            });
        }else{
            res.json({sucess: false,
                msg: 'error'});
        }
    });

    
  });


//---PUT----------------------------------------
router.put('/objetos',(req,res)=>{
    const objetoData={
        idobjeto: req.body.id,
        nombre: req.body.nombre,
        imagenO: "null",
        estadoR: req.body.estadoR,
        fechaRO: req.body.fechaRO,
        descripcion: req.body.descripcion,
        color:req.body.color,
        horaRegistro:req.body.horaRegistro,
        eliminadoO:req.body.eliminadoO,
        calificacionEO:req.body.calificacionEO,
        idsubcategoria:req.body.idsubcategoria,
        idEstudiante:req.body.idEstudiante,
        lugar: req.body.lugar
    };


    modeloObjeto.update(objetoData,(err,data)=>{
        if(data && data.msg){
            res.json(data);
        }else{
            res.json({'sucess': false, 'msg:': 'error'});
        }
    });
});

router.delete('/objetos', (req,res)=>{
    modeloObjeto.delete(req.body.id,(err,data)=>{
        if(data && data.msg ==='deleted' || data.msg === 'no exists'){
            res.json({sucess: true,data});
        }else{
            res.json({'msg':'err'});
        }
    });
});

//----------------------------------------------Categorias-------------------------
router.get('/categorias',function(req,res,next){
    modeloCategoria.getCategoria((err,data)=>{
        res.send(data);
    })
});

//---GET by ID----------------------------------
router.get('/categorias/:id', function(req, res, next) {
    const id=req.params.id
    
    modeloCategoria.getcategoriaId(id,(err,data)=>{
        console.log(data);
        res.send(data);
    });
});


//---POST----------------------------------------
router.post('/categorias', function(req, res, next) {
    
    const categoriaData={
        idcategoria: null,
        nombre: req.body.nombre
    };

    modeloCategoria.insertcategoria(categoriaData,(err,data)=>{
        if(data && data.insertId){
            res.json({sucess: true,
            msg: 'categoria insertada',
            data:data
            });
        }else{
            res.json({sucess: false,
                msg: 'error'});
        }
    });
});


//---PUT----------------------------------------
router.put('/categorias',(req,res)=>{
    const categoriaData={
        idcategoria: req.body.id,
        nombre: req.body.nombre
    };


    modeloCategoria.update(categoriaData,(err,data)=>{
        if(data && data.msg){
            res.json(data);
        }else{
            res.json({'sucess': false, 'msg:': 'error'});
        }
    });
});

//----------------------------------------------Subcategorias-------------------------
router.get('/subcategorias',function(req,res,next){
    modeloSubCategoria.getSubCategoria((err,data)=>{
        res.send(data);
    })
});

//---GET by ID----------------------------------
router.get('/subcategorias/:id', function(req, res, next) {
    const id=req.params.id
    
    modeloSubCategoria.getSubcategoriaId(id,(err,data)=>{
        console.log(data);
        res.send(data);
    });
});


//---POST----------------------------------------
router.post('/subcategorias', function(req, res, next) {
    
    const subcategoriaData={
        idsubcategoria: null,
        nombre: req.body.nombre,
        idcategoria: req.body.idcategoria
    };

    modeloSubCategoria.insertSubcategoria(subcategoriaData,(err,data)=>{
        if(data && data.insertId){
            res.json({sucess: true,
            msg: 'subcategoria insertada',
            data:data
            });
        }else{
            res.json({sucess: false,
                msg: 'error'});
        }
    });
});


//---PUT----------------------------------------
router.put('/subcategorias',(req,res)=>{
    const subcategoriaData={
        idsubcategoria: req.body.id,
        nombre: req.body.nombre
    };


    modeloSubCategoria.update(subcategoriaData,(err,data)=>{
        if(data && data.msg){
            res.json(data);
        }else{
            res.json({'sucess': false, 'msg:': 'error'});
        }
    });
});

//----------------------------------------------encuentros------------------------



//----------------------------------------------usuario--------------------------
router.post('/acceso',(req,res)=>{
    console.log('data: ',req.body);
    let campos={correo: req.body.email, password: req.body.password}
    modeloUser.comprobarCredenciales(campos,function(err,result){
        if(err){
            console.log('error: ',err);
            return err;
        }else{
            console.log('respuesta de la basee')
            res.send(result);
        }
    })
});

//----------------------------------------------calificaciones--------------------

module.exports = router;
