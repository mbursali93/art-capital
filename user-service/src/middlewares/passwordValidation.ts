import { body, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

const passwordValidation = [
    body("password").isLength({ min: 6}).withMessage("password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("password must contain at least one capital letter")
    .matches(/[0-9]/).withMessage("password must contain at least one number")
    .matches(/[a-z]/).withMessage("password must contain at least one lowercase letter"),

    body("verifyPassword").isLength({ min: 6}).withMessage("password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("password must contain at least one capital letter")
    .matches(/[0-9]/).withMessage("password must contain at least one number")
    .matches(/[a-z]/).withMessage("password must contain at least one lowercase letter"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        next()

    }
]

export default passwordValidation;