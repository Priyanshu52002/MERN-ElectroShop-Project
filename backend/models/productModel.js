const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price_in_rs:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        required:true
    },
    cateogary:{
        type:String,
        enum:['Smart Phones','Laptops','Speakers','HeadPhones']
    }
})
const Product=mongoose.model('Product',productSchema);
module.exports=Product