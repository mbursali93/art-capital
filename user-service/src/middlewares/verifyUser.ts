import { Request, Response, NextFunction } from "express";
import AuthUtils from "../utils/auth-utils";

const utils = new AuthUtils()

export const verifyUser =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(403).json("no token to be found")
        const user = await utils.verifyAccessToken(token)
        if(user.id !== req.params.id) return res.status(403).json("You are not allowed to do that")
        next()

    } catch(e:any) {
        res.status(403).json()
    }
}

