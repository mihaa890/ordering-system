const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller.js');
const TableController = require('../controllers/table-controller.js');
const OrderController = require('../controllers/order-controller.js');
const MenuController = require('../controllers/menu-controller.js');

const {validateToken} = require('../../middleware/middleware');

//user
router.post('/signup', UserController.signup);
router.get('/verify/:token', UserController.verify);
router.post('/login', UserController.login);
router.put('/forgot-password', UserController.forgotPass);
router.put('/reset-password',  UserController.resetPassword);
router.get('/usersList',validateToken,  UserController.usersList);

//table
router.post('/createTable', validateToken, TableController.createTable);
// router.put('/updateTable', validateToken , TableController.updateTable);

//order
router.post('/createOrder', validateToken,  OrderController.createOrder)

//menu
router.post('/createMenu', validateToken,MenuController.createMenu  )

module.exports = router;