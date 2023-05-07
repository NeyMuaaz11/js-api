import express from "express";
import controller from "../controllers/posts"

const router = express.Router()

router.get("/product/:id", controller.getProductWithID);
router.get("/product/", controller.getAllProducts);
router.post("/product/", controller.createProduct);
router.put("/product/", controller.updateProduct);

export default router