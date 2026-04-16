import express from 'express'
import  {addProduct,listProduct,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import authorization from '../middleware/adminAuth.js'

const productRouter = express.Router();


productRouter.route('/add').post(authorization,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},]),addProduct)
productRouter.route('/remove').post(authorization,removeProduct)
productRouter.route('/list').get(listProduct)
productRouter.route('/single').post(singleProduct)


export default productRouter