import chatModel from "../database/models/chatModel.js";
import friendModel from "../database/models/friendModel.js";
import userModel from "../database/models/userModel.js";


export const deleteFriend = async (req, res) => {
    const { username, log_id } = req.body;

    const myData = await userModel.findById(log_id);
    try {
        await friendModel.findOneAndUpdate({ userName: myData.username }, {
            $pull: { userFriendList: username }
        });

        await friendModel.findOneAndUpdate({ userName: username }, {
            $pull: { userFriendList: myData.username }
        });
        res.sendStatus(200);

        await chatModel.findOneAndDelete({chatUsers:{$all:[myData.username,username]}});
    } catch (error) {
        console.log(false);
        res.sendStatus(400);
    }




}