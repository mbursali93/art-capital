import { Request, Response } from "express"
import MessageQueue from "../utils/message-broker";
import PaymentUtils from "../utils/utils";
import PaymentService from "../services/payment-service";
import PaymentRepository from "../database/repository/payment-repository";


const message = new MessageQueue()
const service = new PaymentService()
const utils = new PaymentUtils()
const repository = new PaymentRepository()


class PaymentController {


    async makePayment(req: Request, res:Response) {
        try {

            const { buyer_id, buyer_email, seller_email, product_id, address } = req.body;
            const { price, title, seller_id } = await service.getProductInfos(product_id)
  
            await utils.payment(price)
            await message.sendMessage("product", product_id)

            const orderInformation = { 
                buyer_id,
                buyer_email,
                seller_id,
                seller_email,
                product_id,
                product_title: title,
                price,
                address
 
            }
            const order = await service.createOrder(orderInformation)
            
            res.status(201).json(order)
            
              
        } catch(e:any) {
            res.status(500).json(e.message)
        }

    
    }

    async acceptPayment(req: Request, res: Response) {
        try {
            const { order_id } = req.params
            const order = await repository.updateOrderStatus(order_id, "accept")

            const productId = order?.product_id
            const sellerId = order?.seller_id


            await message.sendMessage("product", { productId })
            await message.sendMessage("user", { sellerId })

            res.status(200).json(order)
        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }

    async cancelPayment(req: Request, res: Response) {
        try {
            
            const { order_id } = req.params
            const order = await repository.updateOrderStatus(order_id, "canceled")

            const productId = order?.product_id

            await message.sendMessage("product", { productId })

            res.status(204).json(order)

        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }
}

export default PaymentController