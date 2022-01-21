import express from 'express'
import products from './Products/products.js'
import logger from 'morgan'


const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json());
app.use(logger("dev"))

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/products/:id', (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const foundProduct = products.find(product => product._id === id)
    res.json(foundProduct)
})

app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.price =`$${req.body.price}`
    products.push(newProduct);
    res.json(products);
})

app.put('/products/:id', (req, res) => {
    const id = req.params.id
    const productIndex = products.findIndex(product => product._id === id)

    const updatedProduct = {
        ...products[productIndex],
        _id: req.body._id,
		name: req.body.name,
		imgUrl: req.body.imgUrl,
		price: req.body.price,

    }
    products.splice(productIndex, 1, updatedProduct)
    res.json(updatedProduct)

})


app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
	const productIndex = products.findIndex(product => product._id === id);

	const deletedProduct = products.find(p => p._id === id);
	console.log(deletedProduct);

	products.splice(productIndex, 1);
	res.json(products);
})

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})