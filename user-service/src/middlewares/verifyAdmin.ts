import { Request, Response, NextFunction } from "express";
import Utils from "../utils/auth-utils"

const utils = new Utils()

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")
        if(!token) throw new Error("No token to be found")
        const user = await utils.verifyAccessToken(token)
        if(user.role !== "admin" ) return res.status(403).json("you are not the admin")
        next()
    } catch {
        res.status(403).json("Something went wrong on admin verification")
    }

}



