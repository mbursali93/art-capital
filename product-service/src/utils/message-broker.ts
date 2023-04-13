import amqp, { Connection, Channel } from "amqplib"



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
    await this.sendChannel.assertExchange("product-to-payment" || "", "direct", { durable: true });
  }

  async createGetChannel(): Promise<void> {
    this.getConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.getChannel = await this.getConnection.createChannel();
    await this.getChannel.assertExchange("payment-to-product" || "", "direct", { durable: true });

    
  }

  private async subscribeMessages(routeKey: string): Promise<void> {
    if (!this.getChannel) await this.createGetChannel();
    this.q = await this.getChannel.assertQueue("payment-to-product");
    await this.getChannel.bindQueue(this.q.queue, "payment-to-product", routeKey);
  }

    async handlePaymentRequests(): Promise<void> {
        if(!this.sendChannel) await this.createSendChannel()
        await this.subscribeMessages("payment_request")
        await this.getChannel.consume(this.q.queue, async (msg)=> {
            if(msg) {
                const message = JSON.parse(msg?.content.toString())
                console.log(message)
                
                
                await this.sendChannel.sendToQueue("product-to-payment" || "", Buffer.from(JSON.stringify({ msah: "fsdx" })), { correlationId: "id"})
                this.getChannel.ack(msg!)
            } 
            
            
        })
    }

    


}

export default MessageQueue;