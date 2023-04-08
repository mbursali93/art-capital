import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const productValidation = [
    body("art_type").isIn(["painting", "drawing", "sculpture", "photography", "printmaking", "textile art"])
    .withMessage("enter a valid art_type"),
    body("price").isInt({ min: 10 }).withMessage("price must be bigger than $10"),
    

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
        next()
    }
]

export default productValidation;