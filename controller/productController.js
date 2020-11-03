const Product = require('../model/productModel')

const { getPostData } = require('../util')


// GET All Products 
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    }
    catch (error) {
        console.log(error)
    }
}
// GET Product By id
async function getProduct(req, res, id) {
    try {

        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Item Not Found!' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }

    }
    catch (error) {
        console.log(error)
    }
}
//POST Products , create
async function createProduct(req, res) {
    try {

        const body = await getPostData(req)

        const { title, description } = JSON.parse(body)

        const product = {
            title,
            description
        }
        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))
    }
    catch (error) {
        console.log(error)
    }
}
// Update Product , PUT operation
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Item Not Found!' }))
        } else {
            const body = await getPostData(req)

            const { title, description } = JSON.parse(body)

            const productData = {
                title: title || product.title,
                description: description || product.description
            }
            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct))
        }

    }
    catch (error) {
        console.log(error)
    }
}

// DELETE Operation 

async function deleteProduct(req, res, id) {
    try {

        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Item Not Found!' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: ` ${id} removed !` }))
        }

    }
    catch (error) {
        console.log(error)
    }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}