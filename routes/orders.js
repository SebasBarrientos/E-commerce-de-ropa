const express = require("express")
const { authentication, isAdmin } = require("../middleware/authentication")
const OrderController = require("../controllers/OrderController")
const router = express.Router()

router.post("/",authentication, OrderController.create) // ACA IRIA EL EMAIL DE CONFIRMACION
router.get("/",authentication, isAdmin,OrderController.getAll)

router.delete("/id/:id",authentication, isAdmin, OrderController.delete)

module.exports = router