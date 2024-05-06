const express = require("express")
const { authentication } = require("../middleware/authentication")
const OrderController = require("../controllers/OrderController")
const router = express.Router()

router.post("/",authentication, OrderController.create) // ACA IRIA EL EMAIL DE CONFIRMACION
router.get("/",OrderController.getAll)
// router.get("/id/:id",OrderController.getById)
// router.get("/title/:title",OrderController.getByTitle)
router.delete("/id/:id",OrderController.delete)

module.exports = router