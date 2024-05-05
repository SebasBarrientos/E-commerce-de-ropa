const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require("../middleware/authentication");
const multer  = require('multer')
let img 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        img=file.originalname
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

const router = express.Router();


router.post('/', authentication, isAdmin, upload.single('image'),ProductController.create)
router.get('/', ProductController.getAll)
router.put('/id/:id',authentication, isAdmin, ProductController.updateById)
router.delete('/id/:id',authentication, isAdmin, ProductController.deleteById)
router.get('/id/:id', ProductController.getById)
router.get('/name/:name', ProductController.getByName)
router.get('/price', ProductController.getByPrice)
router.get('/price/order', ProductController.getAllOrderByPrice)

module.exports = router;
