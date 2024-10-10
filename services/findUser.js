import chatModel from "../database/models/chatModel.js"


export const findUser = async () => {
    const friends = await chatModel.find();

    friends.map((data) => {
        console.log(data.sender);
    });
}

