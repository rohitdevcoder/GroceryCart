import express from 'express'
import authUser from '../middlware/authUser.js';
import { getAllOrder, getUserOrder, placeOrderCOD } from '../controllers/OrderController.js';
import authSeller from '../middlware/authSeller.js';


const orderRouter = express.Router();

orderRouter.post('/cod',authUser,placeOrderCOD);
orderRouter.get('user',authUser,getUserOrder);
orderRouter.get('seller',authSeller,getAllOrder);

export default orderRouter;