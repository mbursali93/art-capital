import amqp, { Connection, Channel } from "amqplib";
import PaymentRepository from "../database/repository/payment-repository";


const payment = new PaymentRepository()

class MessageQueue {
    private sendConnection: Connection 
    private sendChannel: Channel;
   

  constructor() {
    this.sendConnection = null!;
    this.sendChannel = null!;
   
    
  }

  private async createSendChannel(): Promise<void> {
    this.sendConnection = await amqp.connect(process.env.AMQP_URL || "");
    this.sendChannel = await this.sendConnection.createChannel();
    
  }


 async sendMessage(queue:string, message: object) {
  if(!this.sendChannel) await this.createSendChannel()
  await this.sendChannel.assertQueue(queue, { durable: true })
  await this.sendChannel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true })

 }

 


  
}

export default MessageQueue;
