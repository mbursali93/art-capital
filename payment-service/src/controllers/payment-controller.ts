import { Request, Response } from "express"
import MessageQueue from "../utils/message-broker";


const message = new MessageQueue()
class PaymentController {

    // get payment
    // send message to other servers
    // get message
    // handle database
    // handle emails

    async makePayment(req: Request, res:Response) {
        try {

            const { buyer_id, buyer_email, seller_id, seller_email, product_id, address } = req.body;

            
            await message.publishMessage({ buyer_id, seller_id, product_id }, "payment_request", "payment-to-user")
            await message.handleIncomingMessages("payment_request", "user-to-payment")
            await message.publishMessage({ buyer_id, seller_id, product_id }, "payment_request", "payment-to-product")
            await message.handleIncomingMessages("payment_request", "product-to-payment")

           
            res.status(200).send('Charge successful!');
            
              
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