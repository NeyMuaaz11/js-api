import { Request, Response, NextFunction } from "express";
import product from "../product.js";


// TO-DO add getAllProducts, getProductsWithCategory, deleteProducts




const getProductWithID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    console.log(id)
    if (id === undefined) {
        res.status(418).send({
            message: "missing ID"
        })
    }

    console.log(`Product GET(with ID) api called from ${req.hostname} to retrieve product with ID=${id}`)
    let toReturn = product.products.get(id)
    try{
        res.status(200).send({
            id: toReturn.id,
            name: toReturn.name,
            quantity: toReturn.quantity
        })
    } catch(err: any){
        res.status(418).send({
            message: "No product exists with the requested ID",
            error: err.message
        })
    }
}


const createProduct = async (req: Request, res: Response) => {
    console.log(`Product POST(create) api called from ${req.hostname}`)

    // retrieve data from passed json
    const data = req.body
    const id = data.id
    const name = data.name
    const quantity = data.quantity

    // check for existing product with same ID
    if (product.products.has(id)) {
        res.status(418).send({
            message: "Another product with this ID already exists"
        })
    }

    // check for missing arguments
    if (!name || !quantity) {
        res.status(418).send({ message: "missing name/quantity" })
    }

    // try-catch to attempt persistence of passed product into database
    try {
        let toPersist = new product(id, name, quantity)
        product.products.set(toPersist.id, toPersist)
        console.log('Product added successfully:', product.products.get(id));
        res.status(200).send({
            message: `${toPersist.name} was created with a stock of ${toPersist.quantity} and ID=${toPersist.id}...`
        })
    } catch (error: any) {
        console.error(`\n${error}\n`)
        res.status(500).send({
            message: error.message
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    console.log(`Product POST(update) API called from ${req.hostname}`)
    const data = req.body
    const id = data.id
    let beforeUpdate = product.products.get(id)
    try{
        if(beforeUpdate){
            beforeUpdate.name = data.name
            beforeUpdate.quantity = data.quantity
        }
        res.status(200).send({
            message: `Product with ID=${beforeUpdate.id} was updated to have name '${beforeUpdate.name} and quantity ${beforeUpdate.quantity}'`
        })
    } catch(err: any){
        res.status(418).send({ 
            message: "no product exists with that id",
            error: err.message
        })
    }


}

export default { createProduct, updateProduct, getProductWithID }