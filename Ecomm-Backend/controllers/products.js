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

exports.getProducts = (req,res,next)=>{  
    Product.find()
    .then(products=>{
        res.send(products)
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
        description:description
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