import { model, Schema } from "mongoose";


const requestSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sender: String,
    receiver: String,
    requestType:String, 
    status:Boolean
});

const requestModel = model("recieve-message", requestSchema);

export default requestModel;
