const passport=require('passport');
const Usuario=require('../modelos/Usuarios');
const bcrypt=require('bcrypt-nodejs');


exports.postSignup=(req,res,next)=>{
    const nuevoUsuario=new Usuario({
        email: req.body.email,
        nombre: req.body.nombre,
        password: req.body.password
    });

    Usuario.findOne({email: req.body.email},(err,usuarioExistente)=>{
        if(usuarioExistente){
            return res.send('Ya ese email esta registrado');
        }

        nuevoUsuario.save((err)=>{
            if(err){
                next(err);
            }
            req.logIn(nuevoUsuario,(err)=>{
                if(err){
                    next(err);
                }
                res.send('Usuario creado exitosamente');
            })
        })
    })
}

exports.postLogin=(req,res,next)=>{
    passport.authenticate('local',(err,usuario,info)=>{
        
        if(err){
            next(err);
        }
        if(!usuario){
            Usuario.findOne({email: req.body.email},(err,usuarioExistente)=>{
                if(usuarioExistente){
                    bcrypt.compare(req.body.password,usuarioExistente['password'],(err,resultado)=>{
                        console.log('contraseña del formulario: '+req.body.password)
                        console.log('contraseña recuperada: '+usuarioExistente['password']);
                        console.log('resultado: '+resultado);
                        if(err){
                            return(err);
                        }else{
                            if(resultado){
                                console.log('iguales');
                                req.logIn(usuarioExistente,(err)=>{
                                    if(err){
                                        next(err);
                                    }
                                    res.send('Login exitoso');
                                })
                            }else{
                                res.send('Contraseña incorrecta');
                            }
                        }
                        
                        
                    })
                    
                }else{
                    res.send('Login fallido, verifique credenciales');
                }
                
            })
        }
        
    })(req,res,next);
}

exports.logout=(req,res)=>{
    req.logout();
    res.send('logout exitoso');
}