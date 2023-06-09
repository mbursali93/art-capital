import { Router } from "express"
import ProductController from "../controller/product-controller"
import { verifySeller } from "../middlewares/verifySeller"
import productValidation from "../middlewares/validator"

const router = Router()

const controller = new ProductController()

router.get("/", controller.getProducts)
router.get("/:product_id", controller.getProductById) 
router.post("/:seller_id", productValidation, verifySeller, controller.createProduct)
router.delete("/:seller_id/:product_id", verifySeller, controller.deleteProduct)


export default router;