import { Router } from "express"
import ProductController from "../controller/product-controller"

const router = Router()

const controller = new ProductController()

// router.get("/", controller.getProducts)

router.post("/", controller.createProduct)


export default router;