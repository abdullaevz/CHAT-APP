import chatModel from "../database/models/chatModel.js";


export const renderChat = async (req,res) => {
    const { datas } = req.params;
    const myUsrname = datas?.split("-")[0];
    const otherUserName = datas?.split("-")[1];
    const chat = await chatModel.findOne({ chatUsers: { $all: [myUsrname, otherUserName] } });

    res.render('chat',
        {
            currentUser: myUsrname, otherUserName, chatID: chat?._id
        }
    );
}