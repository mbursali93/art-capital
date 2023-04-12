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

  private async createSendChannel(): Promise<void> {
    this.sendConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.sendChannel = await this.sendConnection.createChannel();
    await this.sendChannel.assertExchange("payment-to-user" || "", "direct", { durable: true });
  }

  private async createGetChannel(): Promise<void> {
    this.getConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.getChannel = await this.getConnection.createChannel();
    await this.getChannel.assertExchange("user-to-payment" || "", "direct", { durable: true });
  }

  async publishMessage(message: { buyer_id: string; seller_id: string; product_id: string }, routeKey: string): Promise<void> {
    if (!this.sendChannel) await this.createSendChannel();
    await this.sendChannel.publish("payment-to-user" || "", routeKey, Buffer.from(JSON.stringify(message)));
    
  }

  private async subscribeMessages(routeKey: string): Promise<void> {
    if (!this.getChannel) await this.createGetChannel();
    this.q = await this.getChannel.assertQueue("user-to-payment" || "");
    await this.getChannel.bindQueue(this.q.queue, "user-to-payment" || "", routeKey);
  }

  async handlePaymentRequest(): Promise<void> {
    let buyerIban;
    let sellerIban;
    await this.subscribeMessages("payment_response");
    if (!this.getChannel) await this.createGetChannel();
    await this.getChannel.consume(this.q.queue, async (msg) => {
      
      if (msg !== null && msg.properties.correlationId === "id") {
        const message = JSON.parse(msg.content.toString());
        buyerIban = message.buyerIban.iban
        sellerIban = message.sellerIban.iban
        await this.getChannel.ack(msg!);
      }
    });
  }
}

export default MessageQueue;
