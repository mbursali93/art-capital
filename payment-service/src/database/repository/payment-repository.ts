import Order from "../models/order";

class PaymentRepository {

    async createOrder(userInputs: object) {
        const newOrder = await new Order(userInputs)
        const order = await newOrder.save()
        return order;
    }

    async updateOrderStatus(id:string, status: string) {
        const updatedOrder = await Order.findOneAndUpdate({ _id: id },{
            status: status
        }, { new:true })
        return updatedOrder;
    }
}

export default PaymentRepository