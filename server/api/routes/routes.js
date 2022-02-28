const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller.js');
const TableController = require('../controllers/table-controller.js');
const OrderController = require('../controllers/order-controller.js');
const MenuController = require('../controllers/menu-controller.js');

const { validateToken } = require('../../middleware/middleware');

//user
router.post('/signup', UserController.signup);
router.get('/verify/:token', UserController.verify);
router.post('/login', UserController.login);
router.put('/forgot-password', UserController.forgotPass);
router.put('/reset-password',validateToken, UserController.resetPassword);
router.get('/usersList',validateToken, UserController.usersList);
router.get('/userById',validateToken, UserController.userById );

//table
router.post('/createTable', validateToken, TableController.createTable);
router.get('/free-tables',validateToken, TableController.tablesList);
router.get('/getTableById/:id', TableController.getById);

//order
router.post('/order', validateToken, OrderController.order);
router.get('/orderById/:id', validateToken, OrderController.getOrderById);

//menu
router.post('/createMenu', validateToken, MenuController.createMenu);
router.get('/getAll', validateToken, MenuController.getAll);
router.get('/getItemById/', validateToken, MenuController.getById);
router.put('/updateMenu/:id', validateToken, MenuController.updateMenu);

module.exports = router;