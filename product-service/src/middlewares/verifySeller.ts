import { Request, Response, NextFunction } from "express";
import Utils from "../utils/utils";

const utils = new Utils()

export const verifySeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")
        if(!token) throw new Error("No token to be found")
        const user = await utils.verifyAccessToken(token)
        if(user.role !== "seller" || user.id !== req.params.seller_id ) return res.status(403).json("you are not allowed to do that")
        next()
    } catch {
        res.status(403).json("Something went wrong on seller verification")
    }

}

