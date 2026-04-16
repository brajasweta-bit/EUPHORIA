import userModel from "../models/userModel.js"


// Add products  to user cart


const addToCart = async (req,res)=>{
    try{
        const userId = req.userId
        const {itemId,size}= req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[item][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size]=1
        }

        await userModel.findByIdAndUpdate(userId,{
            cartData
        })
        res.status(200).json({success:true,message:'Added to Cart'})
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:error.message})
    }
}

// Update user cart
const updateCart = async (req,res)=>{
    try {
        const userId = req.userId
        const {itemId,size,quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.status(200).json({success:true,message:'Cart Updated'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}
// Add products  to user cart

const getUserCart = async (req,res)=>{
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        res.status(200).json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

export {addToCart,updateCart,getUserCart}