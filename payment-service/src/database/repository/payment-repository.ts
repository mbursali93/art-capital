import Order from "../models/order";

class PaymentRepository {

    async createOrder(userInputs: object) {
        const newOrder = await new Order(userInputs)
        const order = await newOrder.save()
        return order;
    }
}

export default PaymentRepository