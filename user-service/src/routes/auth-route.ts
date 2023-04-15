import { Router } from "express"
import UserController from "../controller/user-controller";
import userValidation from "../middlewares/validators";

const router = Router()
const controller = new UserController()


router.post("/register", userValidation, controller.register)
router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.post("/refresh", controller.refreshToken)



export default router;