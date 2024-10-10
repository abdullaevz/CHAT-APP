import requestModel from "../database/models/requestModel.js";
import userModel from "../database/models/userModel.js";



export const renderNot = async (req, res) => {
    const userId = req.params.id;

    const loggedUser = await userModel.findById(userId);
    const requestList = await requestModel.find({ receiver: loggedUser.username });
    let nameList = [];

    if (requestList) {
        requestList.map((item) => {
            nameList.push(item.sender);
        })


    }

    res.render('notifications',
        {
            nameList, loggedUser: loggedUser.name, logID: userId
        }
    );
}