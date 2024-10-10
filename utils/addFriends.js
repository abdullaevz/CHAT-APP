import chalk from "chalk";
import friendModel from "../database/models/friendModel.js";
import userModel from "../database/models/userModel.js";
import requestModel from "../database/models/requestModel.js";
import chatModel from "../database/models/chatModel.js";



export const addFriends = async (req, res) => {
    const { log_id, sender } = req.body;
    const myData = await userModel.findById(log_id); // mənim datam
    const isUser = await userModel.findOne({ username: sender }); // axtradıgım user
    const receiverFriendList = await friendModel.findById(log_id) //friendlisttə olub olmadıgım
    const senderFriendList = await friendModel.findOne({ userName: sender })//friendlisttə olub olmadıgım
    const request = await requestModel.findOne({ sender, receiver: myData.username });//request listdə olub olmaması

    if (request) {
        res.sendStatus(200);
        if (receiverFriendList && senderFriendList) {

            if (receiverFriendList.userFriendList.includes(sender) && senderFriendList.userFriendList.includes(myData.username)) {
                console.log("You are already firends");

            } else if (receiverFriendList.userFriendList.includes(sender)) {
                await friendModel.findOneAndUpdate({ userName: sender }, {
                    $push: { userFriendList: myData.username }
                });
            } else if (senderFriendList.userFriendList.includes(myData.username)) {
                await friendModel.findByIdAndUpdate(log_id, {
                    $push: { userFriendList: sender }
                })

                await friendModel.findByIdAndUpdate(log_id, {
                    $push: { userFriendList: sender }
                });
            } else {
                await friendModel.findOneAndUpdate({ userName: myData.username }, { $push: { userFriendList: sender } });

                await friendModel.findOneAndUpdate({ userName: sender }, { $push: { userFriendList: myData.username } });

            }

        } else if (receiverFriendList === null && senderFriendList === null) {
            await friendModel.create({
                _id: isUser._id,
                userName: sender,
                userFriendList: myData.username
            });
            await friendModel.create({
                _id: log_id,
                userName: myData.username,
                userFriendList: sender,
            });

        }
        else if (receiverFriendList) {
            await friendModel.create({
                _id: isUser._id,
                userName: sender,
                $push: { userFriendList: myData.username }
            });
        } else if (senderFriendList) {
            await friendModel.create({
                _id: log_id,
                userName: myData.username,
                $push: { userFriendList: sender }
            });

        } else {
            res.sendStatus(400);
            console.log(chalk.red("error"));


        }
        await requestModel.findOneAndDelete({ sender, receiver: myData.username });


        const chatData = await chatModel.findOne({ chatUsers: { $all: [myData.username, sender] } });

        if (chatData === null) {
            await chatModel.create({
                chatUsers: [myData.username, sender],
            });
        } 

        // chatData.map(async (item) => {
        //     if (item.chatUsers.includes(myData.username) && item.chatUsers.includes(sender)) {
        //         console.log("This chat data already exists");

        //     } else {
        //         await chatModel.create({
        //             chatUsers: `${myData.username}-${sender}`
        //         });
        //     }
        // });

        // if (chatData) {
        //     console.log("This chat is  already exist");


        // } else {
        //     await chatModel.create({
        //         chatUsers: `${myData.username}-${sender}`
        //     });
        // }




    } else {
        res.sendStatus(400);
        console.log(" req is not have ");

    }

}
