import { Router } from "express";
import UserController from "../controllers/user-controller";
import { verifyUser } from "../middlewares/verifyUser";
import passwordValidation from "../middlewares/passwordValidation";


const router = Router()
const controller = new UserController()

router.get("/:id", controller.getUserById)
router.put("/:id", passwordValidation, verifyUser, controller.changeUserPassword)
router.patch("/:id", verifyUser, controller.updateSocialMediaLinks)




export default router