import friendModel from "../database/models/friendModel.js";
import userModel from "../database/models/userModel.js";


export const chatRendering = async (req, res, logID) => {
    const myFriendListModel = await friendModel.findById(logID);
    const loggedUser = await userModel.findById(logID);

    let namesData;
    if (myFriendListModel === null) {
        namesData = []
    } else {
        namesData = myFriendListModel.userFriendList;
    }
    console.log(namesData.length);

if (loggedUser) {
    res.render('inbox', { namesData, loggedUser: loggedUser.username, logID });
    
}else{
    res.redirect("/notFound");
}
};