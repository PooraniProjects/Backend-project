const mongoose=require('mongoose');
 
const myfirstSchema=mongoose.Schema({
    name:String,
    password:String,
    age:Number,
    email:{
        type:String,
        unique:true,
    },

});
const Myfirst =mongoose.model('personaldata', myfirstSchema);

module.exports=Myfirst;



