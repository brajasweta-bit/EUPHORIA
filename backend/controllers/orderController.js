import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'



// Placing orders using the Cash On Delivery method
const placeOrder = async (req,res)=>{
    try {
        const userId = req.userId
        const {items , amount , address} = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.status(200).json({success:true, message : 'Order placed'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success : false , message : error.message})
    }
}



// Placing orders using Stripe method
const placeOrderStripe = async (req,res) =>{

}


// Placing orders using RazorPay method
const placeOrderRazorpay = async () =>{

}

// All orders data for the admin panel
const allOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.status(200).json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

// User order data for frontend
const userOrders = async (req,res)=>{
    try {
        const userId = req.userId;
        const orders = await orderModel.find({userId})
        res.status(200).json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

// Update order status from admin
const updateStatus = async (req,res) =>{

}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}