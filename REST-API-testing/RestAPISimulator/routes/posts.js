import express from 'express';
import {getCustomers,addCustomers,updateCustomers,deleteCustomers, indexPage, resetCustomerData} from '../controllers/posts.js';
const router = express.Router();

//Customers module
router.get('/customers/',getCustomers);
router.post('/customers',addCustomers);
router.put('/customers',updateCustomers);
router.delete('/customers/',deleteCustomers);

router.put('/reset',resetCustomerData);

// HTML "Front end"
router.get('/',indexPage);

export default router;