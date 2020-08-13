const bcrypt=require('bcrypt-nodejs');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Usuario=require('../modelos/Usuarios');

const usuarioSchema=new Schema({
    email: {type: String, unique:true,lowercase:true,required:true},
    password: {type: String, required: true},
    nombre: {type: String, required: true}
},{
    timestamps: true
});

usuarioSchema.pre('save', function(next){
    const usuario=this;
    if(!usuario.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            next(err);
        }

        bcrypt.hash(usuario.password,salt,null,(err,hash)=>{
            if(err){
                next(err);
            }
            usuario.password=hash;
            next();
        })
    })

})

usuarioSchema.methods.compararPassword=function(password,cb){
    bcrypt.compare(password,this.password,(err,sonIguales)=>{
        if(err){
            return cb(err);
        }
        cb(null,sonIguales);
    })
}


usuarioSchema.methods.compararPassword2=function(password){
    bcrypt.compare(password,this.password,(err,sonIguales)=>{
        if(err){
            return {'mensaje': false};
        }
        return {'mensaje': true}
    })
}

 module.exports=mongoose.model('Usuario',usuarioSchema);