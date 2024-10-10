import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name:String,
    surname:String,
    username: String,
    mail:String, 
    password: String
});

const userModel = model('user', userSchema)

export default userModel;