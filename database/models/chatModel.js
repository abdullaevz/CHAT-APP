import { model, Schema } from "mongoose";


const chatSchema = new Schema({
    chatUsers: [String],
}, { timestamps: true, versionKey: false });


const chatModel = model("chat", chatSchema);

export default chatModel;