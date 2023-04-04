import { Router } from "express"
import UserController from "../controller/user-controller";

const router = Router()
const controller = new UserController()


router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.post("/refresh", controller.refreshToken)



export default router;