import { Request, Response } from "express";
import { productModel } from "../entity/productModel"
import db from "../data_source"





const getAllProducts = async (req: Request, res: Response) => {
    const productRepository = db.getRepository(productModel)
    try {
        const dataList = await productRepository.find()
        res.status(200).send({
            products: Array.from(dataList.values())
        })
    } catch (error: unknown) {
        console.error(error)
        res.status(400).send({
            message: "An unknown error occured"
        })
    }
}

const getProductWithID = async (req: Request, res: Response) => {
    const queriedID = Number(req.params.id)

    // check for missing ID
    if (!queriedID) {
        res.status(400).send({
            message: "missing ID"
        })
        return
    }
    const productRepository = db.getRepository(productModel)
    try {
        const dataList = await productRepository.find({
            where: {
                id: queriedID
            }
        })
        if (dataList.length > 0) {
            const returnedData = dataList[0]
            res.status(200).send({
                id: returnedData.id,
                name: returnedData.name,
                quantity: returnedData.quantity
            })
        } else {
            res.status(400).send({
                message: "No product exists with the requested ID",
            })
        }
    } catch (error: unknown) {
        console.error(error)
        res.status(500).send({
            message: "An unknown error occured"
        })
    }
}


const createProduct = async (req: Request, res: Response) => {
    const productRepository = db.getRepository(productModel)

    // retrieve data from passed json
    const data = req.body
    const name = data.name
    const quantity = data.quantity

    // check for missing arguments
    if (!name) {
        res.status(400).send({ message: "missing name" })
        return
    }
    if (!quantity) {
        res.status(400).send({ message: "missing name" })
        return
    }
    try {

        // attempt persistence of passed product into database
        const toPersist = new productModel()
        toPersist.name = name
        toPersist.quantity = quantity
        const persisted = await productRepository.save(toPersist)
        console.log('Product added successfully');
        res.status(200).send({
            message: `${persisted.name} was successfully persisted with a stock of ${persisted.quantity} and ID=${persisted.id}...`
        })
    } catch (error: unknown) {
        console.error(error);
        res.status(500).send({
            message: "An Unknown error occured"
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const newData = req.body
    const queriedID = newData.id

    // check for missing arguments
    if (!newData.name) {
        res.status(400).send({ message: "missing name" })
        return
    }
    if (!newData.quantity) {
        res.status(400).send({ message: "missing quantity" })
        return
    }

    // update entity
    try {
        const updatedData = await db.createQueryBuilder()
            .update(productModel)
            .set({
                name: newData.name,
                quantity: newData.quantity
            })
            .andWhere(
                "id = :id",
                { id: queriedID }
            )
            .execute()

        if (updatedData.affected != 0) {
            res.status(200).send({
                message: `${updatedData.affected} product(s) was updated'`
            })
        } else {
            res.status(400).send({
                error: `No product exists with an ID of ${queriedID}`
            })
        }
    } catch (error: unknown) {
        console.error(error)
        res.status(400).send({
            error: "An Unknown error occured"
        })
    }
}


export default { createProduct, updateProduct, getProductWithID, getAllProducts }