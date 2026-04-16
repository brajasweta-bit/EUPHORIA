import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin features
orderRouter.route('/list').post(adminAuth,allOrders)
orderRouter.route('/status').post(adminAuth,updateStatus)

// Payment features
orderRouter.route('/place').post(authUser,placeOrder)
orderRouter.route('/stripe').post(authUser,placeOrderStripe)
orderRouter.route('/razorpay').post(authUser,placeOrderRazorpay)


// User feature
orderRouter.route('/userorders').post(authUser,userOrders)

export default orderRouter;