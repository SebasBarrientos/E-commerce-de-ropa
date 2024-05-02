const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();


router.post('/', CategoryController.create)
router.get('/', CategoryController.getAll)
router.put('/id/:id', CategoryController.updateById)
router.delete('/id/:id', CategoryController.deleteById)
router.get('/id/:id', CategoryController.getById)
router.get('/name/:name', CategoryController.getByName)


module.exports = router;