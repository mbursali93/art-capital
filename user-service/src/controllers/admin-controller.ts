import { Request, Response } from "express";
import UserRepository from "../database/repository/user-repository";

const repository = new UserRepository()

class AdminController {


    async getUsersIBAN(req: Request, res: Response) {
        try {
            const { buyer_id, seller_id } = req.body

            const buyer_iban = await repository.getUserIBAN(buyer_id)
            const seller_iban = await repository.getUserIBAN(seller_id)

            res.status(200).json({ buyer_iban, seller_iban })

        }catch(e:any) {
            res.status(500).json(e.message)
        }
    }
}

export default AdminController