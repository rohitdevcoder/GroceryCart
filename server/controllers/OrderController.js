import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";


// Place Oredr COD : /api/order/cod
export const placeOrderCOD = async (req, res) =>{
    try {
        const {userId, items, address} = req.body;
        if(!address || items.length ===0){
            return res.status(400).json({success:false,message:"Invalid Data"})
        }
        //Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        //Add tex Charge (2%)
        amount +=Math.floor(amount*0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymestType:"COD"
        })

        return res.status(201).json({success:true, message:"Order Placed Successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

// Get Orders by User Id : /api/order/user
export const getUserOrder = async (req,res) =>{
    try {
        const {userId} = req.body;
        const orders = await Order.find({userId,
            $or:[{paymestType:"COD"},{ispaid:true}],
        }).populate("items.product address").sort({createdAt:-1});
        return res.status(200).json({success:true,orders});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

// Get All Orders (for seller/ admin) : /api/order/seller
export const getAllOrder = async (req,res) =>{
    try {
        const orders = await Order.find({
            $or:[{paymestType:"COD"},{ispaid:true}],
        }).populate("items.product address").sort({createdAt:-1});
        return res.status(200).json({success:true,orders});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}