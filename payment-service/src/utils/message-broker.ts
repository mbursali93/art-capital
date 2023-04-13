import amqp, { Connection, Channel } from "amqplib";

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

  private async createSendChannel(exchange:string): Promise<void> {
    this.sendConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.sendChannel = await this.sendConnection.createChannel();
    await this.sendChannel.assertExchange(exchange, "direct", { durable: true });
  }

  private async createGetChannel(): Promise<void> {
    this.getConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.getChannel = await this.getConnection.createChannel();
   // await this.getChannel.assertExchange("to-payment" || "", "direct", { durable: true });
  }

  async publishMessage(message: { buyer_id: string; seller_id: string; product_id: string }, routeKey: string, exchange:string): Promise<void> {
    if (!this.sendChannel) await this.createSendChannel(exchange);
    await this.sendChannel.publish(exchange, routeKey, Buffer.from(JSON.stringify(message)));
    
  }

  private async subscribeMessages(routeKey: string, queueName: string): Promise<void> {
    if (!this.getChannel) await this.createGetChannel();
    this.q = await this.getChannel.assertQueue(queueName);
    await this.getChannel.bindQueue(this.q.queue, queueName, routeKey);
  }

  async handleIncomingMessages(routeKey:string, queueName:string): Promise<void> {
    let buyerIban;
    let sellerIban;
    await this.subscribeMessages(routeKey, queueName);
    if (!this.getChannel) await this.createGetChannel();
    await this.getChannel.consume(this.q.queue, async (msg) => {
      
      if (msg !== null && msg.properties.correlationId === "id") {
        const message = JSON.parse(msg.content.toString());
        console.log(message)
        //
        await this.getChannel.ack(msg!);
      }
    });

   
  
  }

  async handleRequest2() {
    await this.subscribeMessages("payment_response", "product-to-payment")
  if (!this.getChannel) await this.createGetChannel();
    await this.getChannel.consume(this.q.queue, async (msg) => {
      
      if (msg !== null && msg.properties.correlationId === "id2") {
        const message = JSON.parse(msg.content.toString());
        console.log(message)
        
        await this.getChannel.ack(msg!);
      }
    });
  }

  
  
}

export default MessageQueue;
