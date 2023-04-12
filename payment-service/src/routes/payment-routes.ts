import { Router } from "express";
import PaymentController from "../controllers/payment-controller";


const router = Router()
const controller = new PaymentController()

router.post("/", controller.makePayment)

export default router;

