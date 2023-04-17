import { Request, Response, NextFunction } from "express";
import PaymentUtils from "../utils/utils";

const utils = new PaymentUtils()

export const verifyAdmin = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(403).json("There is no access token")
        const user = await utils.verifyAccessToken(token)
        if(user.role !== "admin") res.status(403).json("Admin verification failed")
        next()
    } catch(e:any) {
        res.status(403).json(e.message)
    }
}