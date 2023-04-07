import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type:String, required: true },
    description: { type:String, required: true },
    price: { type:Number, required:true },
    image_url: { type:String, required:true },
    art_type: { type:String, required:true },
    artist_name: { type:String, required:true },
    artist_id: { type:String, required:true }

}, { timestamps:true }

)


export default model("products", ProductSchema)