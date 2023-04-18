import amqp, { Connection, Channel } from "amqplib"
import ProductRepository from "../database/repository/product-repository";

const product = new ProductRepository()

class MessageQueue {
  
    private getConnection: Connection
    private getChannel: Channel;
  

  constructor() {
    this.getConnection = null!;
    this.getChannel = null!;
  }

 

  async createGetChannel(): Promise<void> {
    this.getConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.getChannel = await this.getConnection.createChannel();
    
  }

  async handlePaymentRequest(queue:string) {
    if(!this.getChannel) await this.createGetChannel()
    await this.getChannel.assertQueue(queue, { durable: true })
    await this.getChannel.consume(queue, async(msg)=> {
      console.log("message recieved from payment request")
      const productId = JSON.parse(msg!.content.toString())
      await product.updateProductStatus(productId, "pending")
      this.getChannel.ack(msg!)
    } )
  }

  async handleAcceptRequest(queue:string) {

    if(!this.getChannel) await this.createGetChannel()
    await this.getChannel.assertQueue(queue, { durable: true })
    await this.getChannel.consume(queue, async(msg)=> {
      console.log("message recieved from accept request")
      const productId = JSON.parse(msg!.content.toString())
      await product.deleteProductById(productId.productId)
      this.getChannel.ack(msg!)

    })
  }

  async handleCancelRequest(queue:string) {

    if(!this.getChannel) await this.createGetChannel()
    await this.getChannel.assertQueue(queue, { durable: true })
    await this.getChannel.consume(queue, async(msg)=> {
      console.log("message recieved from cancel request")
      const productId = JSON.parse(msg!.content.toString())
      await product.updateProductStatus(productId.productId, "on sale")
      this.getChannel.ack(msg!)

    })
  }

  async handleIncomingMessages(queue:string) {
    await this.handleAcceptRequest(queue)
    await this.handlePaymentRequest(queue)
  }


}

export default MessageQueue;