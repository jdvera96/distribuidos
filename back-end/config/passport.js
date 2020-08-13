const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Usuario=require('../modelos/Usuarios');

passport.serializeUser((usuario,done)=>{
    done(null,usuario._id);

});

passport.deserializeUser((id,done)=>{
    Usuario.findById(id,(err,usuario)=>{
        done(err,usuario);
    });
});

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email,password,done)=>{
        Usuario.findOne({email},(err,usuario)=>{
            if(!usuario){
                console.log('aqui estoy en la nueva estrategia local');
                return done(null,false,{message: `Este email: ${email} no está registrado`});
            }else{
                usuario.compararPassword(passport,(err,sonIguales)=>{
                    if(sonIguales){
                        return done(null,usuario);
                    }else{
                        return done(null,false,{message: 'La contraseña es incorrecta'});
                    }
                })
            }
        });
    }
))

exports.estaAutenticado=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.send('Tienes que hacer login para acceder a este recurso');
}