import { Request, Response, NextFunction } from "express";
import {productModel} from "../entity/productModel"
import db from "../data_source"



const getProductWithID = async (req: Request, res: Response) => {
    const queriedID = Number(req.params.id)
    if (!queriedID) {
        res.status(400).send({
            message: "missing ID"
        })
        return
    }
    const productRepository = await db.getRepository(productModel)
    productRepository.find({
        where: {
            id: queriedID
        }
    })
    .then((dataList) => {
        if(dataList.length > 0){
            const returnedData = dataList[0]
            res.status(200).send({
                id: returnedData.id,
                name: returnedData.name,
                quantity: returnedData.quantity
            })
        }else{
            res.status(400).send({
                message: "No product exists with the requested ID",
            })
        }
        return
    }).catch((error) => {
        res.status(400).send({
            error: error.message
        })
        return
    })
        
     
}


const createProduct = async (req: Request, res: Response) => {
    const productRepository = await db.getRepository(productModel)

    // retrieve data from passed json
    const data = req.body
    const queriedID = data.id
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

    const returned = await productRepository.find({
        where: {
            id: queriedID
        }
    })

    // check for existing product with same ID
    if (returned.length > 0) {
        res.status(400).send({
            message: "Another product with this ID already exists"
        })
        return
    }

    // attempt persistence of passed product into database
    const toPersist = new productModel()
    toPersist.id = queriedID
    toPersist.name = name
    toPersist.quantity = quantity
    await productRepository.save(toPersist)
        .then(() => {
            console.log('Product added successfully');
            res.status(200).send({
                message: `${toPersist.name} was successfully persisted with a stock of ${toPersist.quantity} and ID=${toPersist.id}...`
            })
            return
        }).catch((error) => {
            console.log("Error occured while persisting");
            res.status(500).send({
                message: error.message
            })
            return
        })
    
}

const updateProduct = async (req: Request, res: Response) => {
    const productRepository = await db.getRepository(productModel)

    const newData = req.body
    const queriedID = newData.id

    // check for missing arguments
    if (!newData.name) {
        res.status(400).send({ message: "missing name" })
        return
    }
    if (!newData.quantity){
        res.status(400).send({ message: "missing quantity" })
        return
    }

    // update entity
    await db.createQueryBuilder()
            .update(productModel)
            .set({
                name: newData.name,
                quantity: newData.quantity
            })
            .andWhere(
                "id = :id",
                {id: queriedID}
            )
            .execute()
            .then((returnedData) => {
                res.status(200).send({
                    message: `${returnedData.affected} product(s) was updated'`
                })
                return
            })
            .catch((error) => {
                res.status(400).send({ 
                    error: error.message
                })
                return
            })

}


export default {createProduct, updateProduct, getProductWithID}