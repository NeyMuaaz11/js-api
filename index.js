import product from "./product.js";
import express from "express"

// setup api config
const PORT = 8080;
const app = express();

let products = new Map();


// create api instance and enable json
app.use(express.json())
app.listen(PORT, () =>{
    console.log(`API is live on http://localhost:${PORT}`)
})



// TO-DO add a category-wise get
app.get('/product/retrieve/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    if(id === undefined){
        res.status(418).send({
            message: "missing ID"
        })
    }

    console.log(`Product GET(with ID) api called from ${req.hostname} to retrieve product with ID=${id}`)
    let toReturn = products.get(id)
    if(!toReturn){
        res.status(418).send({
            message: "No product exists with the requested ID"
        })
    }
    res.status(200).send({
        id: toReturn.id,
        name: toReturn.name,
        quantity: toReturn.quantity
    })


})


// create new product
app.post('/product/create', (req, res) => {
    console.log(`Product POST(create) api called from ${req.hostname}`)

    // retrieve data from passed json
    const data = req.body
    const id = data.id
    const name = data.name
    const quantity = data.quantity

    // check for existing product with same ID
    if(products.has(id)){
        res.status(418).send({
            message: "Another product with this ID already exists"
        })
    }

    // check for missing arguments
    if(!name || !quantity){
        res.status(418).send({message: "missing name/quantity"})
    }

    // try-catch to attempt persistence of passed product into database
    try{
            let toPersist = new product(id, name, quantity)
            products.set(toPersist.id, toPersist)
            console.log('Product added successfully:', products.get(id));
            res.status(200).send({
            message: `${toPersist.name} was created with a stock of ${toPersist.quantity} and ID=${toPersist.id}...`
        })
    } catch(error){
        console.error(`\n${error}\n`)
        res.status(500).send({
            message: error.message
        })
    }
})

// update existing product
app.post(('/product/update'), (req, res) => {
    console.log(`Product POST(update) API called from ${req.hostname}`)
    const data = req.body
    const id = data.id
    let beforeUpdate = products.get(id)
    if(beforeUpdate){
        beforeUpdate.name = data.name
        beforeUpdate.quantity = data.quantity
    }

    res.status(200).send({
        message: `Product with ID=${beforeUpdate.id} was updated to have name '${beforeUpdate.name} and quantity ${beforeUpdate.quantity}'`
    })
})

