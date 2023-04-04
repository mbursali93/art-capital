import { Request, Response } from "express";
import UserService from "../services/user-service";
import AuthUtils from "../utils/auth-utils";


const service = new UserService()
const utils = new AuthUtils()

class UserController {

    async register(req: Request, res: Response) {
        try {

            const { username, email, password, social_media_links } = req.body;

            const user = await service.register(req.body);
            const accessToken = await utils.generateAccessToken(user.id, user.role)
            const refreshToken = await utils.generateRefreshToken(user.id, user.role)

            res.cookie("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 1000 * 3600 * 7 * 24})

            res.status(201).json({...user, accessToken});

        } catch(e:any) {

            res.status(500).json(e.message);
        }  
    }


    async login(req: Request, res: Response) {
        try {
            
            const user = await service.login(req.body)
            const accessToken = await utils.generateAccessToken(user.id, user.role)
            const refreshToken = await utils.generateRefreshToken(user.id, user.role)

            res.cookie("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 1000 * 3600 * 7 * 24 })

            const { password, ...others } = user;
            res.status(200).json({...others, accessToken})

        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }

    async logout (req: Request, res: Response) {
        try {
            res.clearCookie("refreshToken", { path:"/" })
            res.status(203).json("logged out")
        } catch(e:any) {

            res.status(500).json(e.message)
        }
    }

    async refreshToken (req: Request, res: Response) {
        try {

            const refreshToken = req.cookies.refreshToken
            const accessToken = await utils.getNewToken(refreshToken)
            

            res.status(200).json({token: accessToken})
        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }



}


    

export default UserController

