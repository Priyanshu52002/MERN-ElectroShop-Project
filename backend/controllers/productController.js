const  Product =require("../models/productModel");
const bcrypt=require('bcryptjs')
module.exports.createProduct=async function createProduct(req,res){
        try{
            let obj=req.body;
            if(!obj){
                return res.status(401).json({
                    message:'Data sent is not valid to add'
                })
            }
            let data=new Product(obj);
            await data.save();
            if(data) return res.status(200).json({message:'Product Saved Successsfully'});
            else return res.status(500).json({message:'something went wrong'});
        }
        catch(error){
            console.log(error.message);
            return res.status(500).json({message:error.message});
        }
}

module.exports.getProducts = async function getProducts(req, res) {
    try {
        let data = await Product.find();
        if (!data) {
            return res.status(404).json({ message: "Can't find any products.." });
        }
        return res.status(200).json({ products: data, message: "Data Sent successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getProduct=async function getProduct(req,res){
       try {
            let id=req.params.id;
            let data=await Product.findById(id);
            if(!data) return res.status(500).json({message:"Can't find any such product.."});
            return res.status(200).json({product:data,message:"Data Sent successfully"});
       } catch (error) {
            console.log(error.message);
            return res.status(500).json({message:error.message});
       }
}

module.exports.deleteProduct=async function deleteProduct(req,res){
    try {
        let id=req.params.id;
        let product=await Product.findByIdAndDelete(id);
        if(!product) return res.status(500).json({message:"Can't find any such product.."});
        return res.status(200).json({message:"Data deleted successfully"});
   } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message});
   }
}

module.exports.updateProduct=async function updateProduct(req,res){
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json({Product:product,message:"data updated successfully"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}