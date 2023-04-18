import amqp, { Connection, Channel } from "amqplib"
import UserRepository from "../database/repository/user-repository"

const repository = new UserRepository()

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


  async handleAcceptRequest(queue:string) {

    if(!this.getChannel) await this.createGetChannel()
    await this.getChannel.assertQueue(queue, { durable: true })
    await this.getChannel.consume(queue, async(msg)=> {
      console.log("message recieved from accept request")
      const sellerId = JSON.parse(msg!.content.toString())
      await repository.updateUserSells(sellerId.sellerId)
      this.getChannel.ack(msg!)

    })
  }


  async handleIncomingMessages(queue:string) {
    await this.handleAcceptRequest(queue)
  }


}

export default MessageQueue;