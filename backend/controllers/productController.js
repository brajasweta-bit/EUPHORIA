import uploadOnCloudinary from '../config/cloudinary.js'
import productModel from '../models/productModel.js'

// Function for adding product

const addProduct =  async (req,res) => {
    try {
        const {name,description,price,category,subCategory,sizes,bestseller}=req.body

        const image1 =req.files.image1 &&  req.files.image1[0]
        const image2 =req.files.image2 &&  req.files.image2[0]
        const image3 =req.files.image3 &&  req.files.image3[0]
        const image4 =req.files.image4 &&  req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item) => item!==undefined)
        
        

        let imagesUrl =await Promise.all( images.map(async (item) => {
                let res = await uploadOnCloudinary(item.path);
                return res;
            })) 
        
            // console.log(imagesUrl)
        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller === "true",
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }

        // console.log(productData)
        const product = new productModel(productData);
        await product.save();
        res.json({success:true,message:"Product addedd successfully"})
        
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error)
    }
    
}

// Function for list products
const listProduct = async (req,res) => {
    try{
        const products = await productModel.find({})
        res.status(200).json({success:true,products})
    }catch(error){
        console.log("Error in listProduct function in productController.js")
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }

}


// Function for list products
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:true,message:"Product removed successfully"});
    } catch (error) {
        console.log("Error in removeProduct function in productController.js");
        res.status(500).json({success:false,message:error.message});
    }
}



// Function for single product info
const singleProduct = async (req,res) => {
    try{
        const { productId }=req.body;
        const product = await productModel.findById(productId);
        res.status(200).json({success:true,product});
    }catch(error){
        console.log("Error in singleProduct funtion in productController.js");
        res.status(500).json({success:false,message:error.message});
    }
}



export {addProduct,listProduct,removeProduct,singleProduct}
