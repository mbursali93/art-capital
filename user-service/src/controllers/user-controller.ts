import { Request, Response } from "express";
import UserService from "../services/user-service";

const service = new UserService()
class UserController {
   

    async getUserById(req:Request, res:Response) {
        try {
            const id = req.params.id
            const user = await service.getUserById(id)
            const { password, iban, ...others } = user

            res.status(200).json(others)

        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }

    async changeUserPassword(req:Request, res:Response) {
        try {
            const id = req.params.id

            if(req.body.password !== req.body.verifyPassword) return res.status(400).json("passwords do not match!")

            const updatedUser = await service.changePassword(id, req.body.password)
            const { password, iban, ...others } = updatedUser

            res.status(200).json(others)

        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }

    async updateSocialMediaLinks(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { social_media_links } = req.body;

            const newLinks = await service.updateSocialMediaLinks(id, social_media_links)
            res.status(200).json(newLinks)

        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }
}

export default UserController;