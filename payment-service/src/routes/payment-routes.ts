import { Router } from "express";
import PaymentController from "../controllers/payment-controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";


const router = Router()
const controller = new PaymentController()

router.post("/", controller.makePayment)
router.put("/accept/:product_id", verifyAdmin, controller.acceptPayment)

export default router;

