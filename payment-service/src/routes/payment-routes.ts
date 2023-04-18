import { Router } from "express";
import PaymentController from "../controllers/payment-controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyUser } from "../middlewares/verifyUser";
import validator from "../middlewares/validator";


const router = Router()
const controller = new PaymentController()

router.post("/", validator, verifyUser, controller.makePayment)
router.put("/accept/:order_id", verifyAdmin, controller.acceptPayment)
router.put("cancel/:order_id", verifyAdmin, controller.cancelPayment)

export default router;

