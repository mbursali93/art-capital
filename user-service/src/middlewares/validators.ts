import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const userValidation = [
    body("username")
    .isLength({ min: 6}).withMessage("username must have minimum 6 characters")
    .not().matches(/[;,:$%<>&|!]/).withMessage("please enter valid characters"),

    body("email")
    .isEmail().withMessage("please enter a valid email")
    .not().matches(/[;,:$%<>&|!]/).withMessage("please enter valid characters"),

    body("password").isLength({ min: 6}).withMessage("password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("password must contain at least one capital letter")
    .matches(/[0-9]/).withMessage("password must contain at least one number")
    .matches(/[a-z]/).withMessage("password must contain at least one lowercase letter"),

    body("iban").isIBAN().withMessage("please enter a valid IBAN"),
    
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        next()
    }
]

export default userValidation;