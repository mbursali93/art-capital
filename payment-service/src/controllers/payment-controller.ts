import { Request, Response } from "express"
import MessageQueue from "../utils/message-broker";
import PaymentUtils from "../utils/utils";
import PaymentService from "../services/payment-service";


const message = new MessageQueue()
const service = new PaymentService()
const utils = new PaymentUtils()


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

    async acceptPayment() {
         
    }

    async cancelPayment() {
        
    }
}

export default PaymentController