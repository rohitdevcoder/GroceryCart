import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.model.js";

//Add Product : /api/product/add
export const addProduct = async (req, res)=>{
try {
    let productData = JSON.parse(req.body.productData);
    const images =req.files;
    let imagesURL = await Promise.all(
        images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
        return result.secure_url
        })
    )
    await Product.create({...productData,image:imagesURL});
    return res.status(201).json({success:true,message:"Product added"})
} catch (error) {
   console.log(error.message);
   return res.status(500).json({success:false,message:error.message}); 
}
}

// Product List : /api/product/product-list
export const productList = async (req, res)=>{
try {
    const products = await Product.find({})
    return res.status(200).json({success:true,products})
} catch (error) {
 console.log(error.message);
return res.status(500).json({success:false,message:error.message}); 
}
}

//Get Single Product : /api/product/id
export const productById = async (req, res)=>{
try {
    const {id} = req.body;
    const product = await Product.findById(id)
    return res.status(200).json({success:true,product})
} catch (error) {
     console.log(error.message);
return res.status(500).json({success:false,message:error.message}); 
}
}

//Change product in Stock : /api/product/stock
export const changeStock = async (req, res)=>{
try {
    const {id,inStock} = req.body;
    await Product.findByIdAndUpdate(id,{inStock})
    return res.status(200).json({success:true,message:"Stock Updated"})
} catch (error) {
 console.log(error.message);
return res.status(500).json({success:false,message:error.message}); 
}
}