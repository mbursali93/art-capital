import { Router } from "express"
import AdminController from "../controllers/admin-controller"
import { verifyAdmin } from "../middlewares/verifyAdmin"

const constroller = new AdminController()
const router = Router()

router.post("/iban", verifyAdmin, constroller.getUsersIBAN)


export default router;