// let products = [
//     {
//         id:'1',
//         title:"A Great Book",
//         imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
//         price:99.9,
//         description:'A great Dummy Book'
//     },
//     {
//         id:'2',
//         title:"Another Book",
//         imgUrl:"https://static4.depositphotos.com/1011434/506/i/950/depositphotos_5066698-stock-photo-fredom.jpg",
//         price:200,
//         description:'A great Dummy Book'
//     },
//     {
//         id:'3',
//         title:"Another Book",
//         imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
//         price:200,
//         description:'A great Dummy Book'
//     },
//     {
//         id:'4',
//         title:"Another Book",
//         imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
//         price:200,
//         description:'A great Dummy Book'
//     },
//     {
//         id:'5',
//         title:"Another Book",
//         imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
//         price:200,
//         description:'A great Dummy Book'
//     }
// ]
const Product = require('../models/product')
const Order = require('../models/orders')

const ITEMS_PER_PAGE = 3
let totalItems

exports.getProducts = (req,res,next)=>{  
    const page = +req.query.page || 1
    Product.find()
    .countDocuments()
    .then(numProducts=>{
        totalItems = numProducts
        return Product.find()
        .skip((page-1)*ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(products=>{
        res.send({
            prods:products,
            totalItems:totalItems,
            currentPage:page
        })
    })
    .catch(err=>res.send(err))
}

exports.addProduct = (req,res,next)=>{
    const title = req.body.title
    const imgUrl = req.body.imgUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product({
        title:title,
        imgUrl:imgUrl,
        price:price,
        description:description,
        userId:req.user
    })
    product.save()
    .then(result=>{
        console.log('created product')
        res.status(201).send('product created')
    })
    .catch(err=>console.log(err))
}

exports.editProduct = (req,res,next)=>{
    const id = req.body.id
    const updatedtitle = req.body.title
    const updatedimgUrl = req.body.imgUrl
    const updatedprice = req.body.price
    const updatedDescription = req.body.description
    Product.findById(id)
    .then(product=>{
        product.title =  updatedtitle
        product.imgUrl = updatedimgUrl
        product.price = updatedprice
        product.description = updatedDescription
        return product.save()
    })
    .then(result=>{
        res.send('Product Updated!')
    })
    .catch(err=>res.send(err))
}

exports.deleteProduct = (req,res,next)=>{
    const prodId = req.body.id
    console.log(prodId)
    Product.findByIdAndRemove(prodId)
    .then(result=>{
        res.status(204).send('Product Deleted!')
    })
    .catch(err=> res.send(err))
}

exports.postOrders = (req,res,next)=>{
    const cart = req.body.cart
    const products = cart.map(item=>{
        return {quantity:item.qty, product:item.id, name:item.title}
    })
    const order = new Order({
        user:{name:req.user.name, userId:req.user},
        products:products
    })
    order.save()
    .then(result=>{
        res.send('Order Created')
    })
}

exports.getOrders = (req,res,next)=>{
    Order.find({'user.userId':req.user._id})
    .then(orders=>{
        res.send(orders)
    })
    .catch(err=>{
        res.send(err)
    })
}