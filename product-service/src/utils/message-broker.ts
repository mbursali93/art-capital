import amqp, { Connection, Channel } from "amqplib"

class MessageQueue {
    private connection: Connection 
    private channel: Channel
    private q: amqp.Replies.AssertQueue;

    constructor() {
        this.connection = null!;
        this.channel = null!;
        this.q = null!;
      }


    async createChannel(): Promise<void> {
        this.connection = await amqp.connect(process.env.AMQP_URL || "")
        this.channel = await this.connection.createChannel()
        await this.channel.assertExchange(process.env.EXCHANGE_NAME || "", "direct", { durable:true })
    }


    async publishMessage(message: { buyer_id: string, seller_id: string, product_id: string }, routeKey:string): Promise<void> {
        if(!this.channel) await this.createChannel()
        await this.channel.publish(process.env.EXCHANGE_NAME || "", routeKey, Buffer.from(JSON.stringify(message)))
    }

    private async subscribeMessages(routeKey:string): Promise<void> {
        if(!this.channel) await this.createChannel()
        this.q = await this.channel.assertQueue(process.env.EXCHANGE_NAME || "")
        await this.channel.bindQueue(this.q.queue, process.env.EXCHANGE_NAME || "", routeKey)
        
    }

    async handleMessage() {
        await this.subscribeMessages("test")
        await this.channel.consume(this.q.queue, async (msg)=> {

        })
    }

    


}

export default MessageQueue;