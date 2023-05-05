import express from "express";
import controller from "../controllers/posts.ts"

const router = express.Router()

router.get("/product/retrieve/:id", controller.getProductWithID);
router.get("/product/retrieve/", controller.getProductWithID);
router.post("/product/create", controller.createProduct);
router.post("/product/update", controller.updateProduct);

module.exports = {router};