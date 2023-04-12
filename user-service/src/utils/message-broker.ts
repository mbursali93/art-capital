import amqp, { Connection, Channel } from "amqplib"
import UserRepository from "../database/repository/user-repository";

const repository = new UserRepository()

class MessageQueue {
    private sendConnection: Connection 
    private getConnection: Connection
    private sendChannel: Channel;
    private getChannel: Channel;
    private q: amqp.Replies.AssertQueue;

  constructor() {
    this.sendConnection = null!;
    this.getConnection = null!;
    this.sendChannel = null!;
    this.q = null!;
    this.getChannel = null!;
  }

  async createSendChannel(): Promise<void> {
    this.sendConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.sendChannel = await this.sendConnection.createChannel();
    await this.sendChannel.assertExchange("user-to-payment" || "", "direct", { durable: true });
  }

  async createGetChannel(): Promise<void> {
    this.getConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.getChannel = await this.getConnection.createChannel();
    await this.getChannel.assertExchange("payment-to-user" || "", "direct", { durable: true });
  }

  async publishMessage(message: { buyer_id: string; seller_id: string; product_id: string }, routeKey: string): Promise<void> {
    if (!this.sendChannel) await this.createSendChannel();
    await this.sendChannel.publish("user-to-payment" || "", routeKey, Buffer.from(JSON.stringify(message)));
  }

  private async subscribeMessages(routeKey: string): Promise<void> {
    if (!this.getChannel) await this.createGetChannel();
    this.q = await this.getChannel.assertQueue("payment-to-user" || "");
    await this.getChannel.bindQueue(this.q.queue, "payment-to-user" || "", routeKey);
  }

    async handlePaymentRequests(): Promise<void> {
        
        await this.subscribeMessages("payment_request")
        await this.getChannel.consume(this.q.queue, async (msg)=> {
            if(msg) {
                const message = JSON.parse(msg?.content.toString())
                const buyerIban = await repository.getUserIBAN(message.buyer_id)
                const sellerIban = await repository.getUserIBAN(message.seller_id)
                
                if(!this.sendChannel) await this.createSendChannel()
                await this.sendChannel.sendToQueue("user-to-payment" || "", Buffer.from(JSON.stringify({ buyerIban, sellerIban })), { correlationId: "id"})
               this.getChannel.ack(msg!)
            } 
            
            
        })
    }

    


}

export default MessageQueue;