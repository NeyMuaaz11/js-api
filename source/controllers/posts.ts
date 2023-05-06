import { Request, Response, NextFunction } from "express";
import product from "../product.ts";

// TO-DO add getAllProducts, getProductsWithCategory, deleteProducts




const getProductWithID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!id) {
        res.status(400).send({
            message: "missing ID"
        })
        return
    }
    
    try{
        const toReturn = product.products.get(id)
        res.status(200).send({
            id: toReturn.id,
            name: toReturn.name,
            quantity: toReturn.quantity
        })
    } catch(err: any){
        res.status(400).send({
            message: "No product exists with the requested ID",
            error: err.message
        })
    }
}


const createProduct = async (req: Request, res: Response) => {

    // retrieve data from passed json
    const data = req.body
    const id = data.id
    const name = data.name
    const quantity = data.quantity
    
    // check for missing arguments
    if (!name) {
            res.status(400).send({ message: "missing name" })
            return
        }
    if (!quantity){
        res.status(400).send({ message: "missing name" })
        return
    }

    // check for existing product with same ID
    if ((product.products.has(id)) && product.products.size != 0) {
        res.status(400).send({
            message: "Another product with this ID already exists"
        })
        return
    }

    // try-catch to attempt persistence of passed product into database
    try {
        const toPersist = new product(id, name, quantity)
        product.products.set(toPersist.id, toPersist)
        console.log('Product added successfully:', product.products.get(id));
        res.status(200).send({
            message: `${toPersist.name} was created with a stock of ${toPersist.quantity} and ID=${toPersist.id}...`
        })
        return
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
        return
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const newData = req.body
    const id = newData.id
    const oldData = product.products.get(id)

    // check for missing arguments
    if (!newData.name) {
        res.status(400).send({ message: "missing name" })
        return
    }
    if (!newData.quantity){
        res.status(400).send({ message: "missing name" })
        return
    }

    try {
        if(oldData){
            oldData.name = newData.name
            oldData.quantity = newData.quantity
        }
        /* send response using attributes of oldData because
           they have been updated to be same as newData */
        res.status(200).send({
            message: `Product with ID=${oldData.id} was updated to have name '${oldData.name} and quantity ${oldData.quantity}'`
        })
    } catch(err: any){
        res.status(400).send({ 
            message: "no product exists with that id",
            error: err.message
        })
    }


}

export default { createProduct, updateProduct, getProductWithID }