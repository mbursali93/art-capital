import axios from "axios"
import PaymentRepository from "../database/repository/payment-repository"

const repository = new PaymentRepository()

class PaymentService {


    async getProductInfos(product_id: string): Promise<{price: number, title:string, seller_id: string}> {
        const productServiceResponse = await axios.get(process.env.PRODUCT_URL + product_id)
        const price = productServiceResponse.data.price
        const title = productServiceResponse.data.title
        const seller_id = productServiceResponse.data.artist_id

        return {price, title, seller_id }
    }

    async createOrder(paymentInfo:object) {
        return await repository.createOrder(paymentInfo)
    }
}

export default PaymentService