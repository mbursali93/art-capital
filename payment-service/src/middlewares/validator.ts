import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"


const validator = [
    body("product_id").isMongoId().withMessage("please enter a valid product id"),
    body("seller_id").isLength({ min: 24 }).withMessage("not valid id"),
    body("buyer_id").isLength({ min: 24 }).withMessage("not valid id"),

    (req: Request, res: Response, next: NextFunction)=> {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
        next()
    }
]

export default validator;