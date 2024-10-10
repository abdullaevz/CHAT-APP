import { model, Schema } from "mongoose";


const friendSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: String,
    userFriendList: [String]
});

const friendModel = model("Friend", friendSchema);

export default friendModel;
