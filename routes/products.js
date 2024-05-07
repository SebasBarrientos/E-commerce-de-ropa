const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require("../middleware/authentication");
const { imgLoad } = require("../middleware/multer");


const router = express.Router();


router.post('/', authentication, isAdmin, imgLoad,ProductController.create)//listo
router.get('/', ProductController.getAll)//listo
router.put('/id/:id',authentication, isAdmin, imgLoad,ProductController.updateById)//listo
router.delete('/id/:id',authentication, isAdmin, ProductController.deleteById)//listo
router.get('/id/:id', ProductController.getById)
router.get('/name/:name', ProductController.getByName)
router.get('/price', ProductController.getByPrice)
router.get('/price/order', ProductController.getAllOrderByPrice)

module.exports = router;
