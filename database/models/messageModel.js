import { model, Schema } from "mongoose";


const messageSchema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = model('Message', messageSchema);

export default Message;
