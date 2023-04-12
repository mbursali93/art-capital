import { Schema, model } from "mongoose"

const OrderSchema = new Schema({
    
    buyer_email: { type: String, required: true },
    buyer_id: { type:String, required: true },
    buyer_iban: { type:String, required: true },
    seller_email: { type: String, required: true },
    seller_id: { type:String, required: true },
    seller_iban: { type:String, required: true },
    product_title: { type:String, required: true },
    product_id: { type:String, required: true },
    price: { type:Number, required:true },
    address: { type:String, required:true },
    status: { type:String, default: "pending" }

})

export default model("orders", OrderSchema)
