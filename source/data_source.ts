import "reflect-metadata"
import { DataSource } from "typeorm"
import {productModel} from "./entity/productModel"


// initialize and establish connection to db
const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    logging: true,
    synchronize: true,
    entities: [productModel]
})

db.initialize()
.then(() => {
    console.log(`Successfully connected to db with ${db.entityMetadatas}!`)
})
.catch((error) => {
    console.log("Error connecting to db!", error)
})


export default db
