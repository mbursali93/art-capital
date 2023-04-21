import { Router } from "express"
import AuthController from "../controllers/auth-controller";
import userValidation from "../middlewares/validators";

const router = Router()
const controller = new AuthController()


router.post("/register", userValidation, controller.register)
router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.post("/refresh", controller.refreshToken)



export default router;