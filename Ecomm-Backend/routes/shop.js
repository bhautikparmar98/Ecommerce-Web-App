const express = require('express')

const router = express.Router()

const ProductsController = require('../controllers/products')

//Crud Operation
router.get('/',ProductsController.getProducts)
router.put('/edit-product',ProductsController.editProduct)
router.post('/add-product',ProductsController.addProduct)
router.delete('/delete',ProductsController.deleteProduct)

router.post('/postOrder',ProductsController.postOrders)
router.get('/getOrder',ProductsController.getOrders)


module.exports = router