import express from 'express'
import { addAddress, getAddress } from '../controllers/AddressController.js'
import authUser from '../middlware/authUser.js';

const addressRouter = express.Router()

addressRouter.post('/add',authUser,addAddress);
addressRouter.get('/get',authUser,getAddress)

export default addressRouter;