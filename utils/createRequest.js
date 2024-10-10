import requestModel from "../database/models/requestModel.js";
import userModel from "../database/models/userModel.js";



export const createRequest = async (req, res) => {
    const { user_id, username } = req.body;
    const myData = await userModel.findById(user_id);//my data
    const isUser = await userModel.findOne({ username }); // find friend by username
    const requestList = await requestModel.findOne({ sender: myData.username, receiver: username });

    let sentStatus;

    if (isUser) {
        if (requestList) {
            sentStatus = false;
            console.log("Request is  already sent");
        } else {
            await requestModel.create({
                sender: myData.username,
                receiver: username,
                requestType: "Friend request",
                status: null
            });
            sentStatus = true;
        }
    }

    return sentStatus;
}