const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();


router.post('/', ProductController.create)
router.get('/', ProductController.getAll)
router.put('/id/:id', ProductController.updateById)
router.delete('/id/:id', ProductController.deleteById)
router.get('/id/:id', ProductController.getById)
router.get('/name/:name', ProductController.getByName)
router.get('/price', ProductController.getByPrice)

module.exports = router;
