import requestModel from "../database/models/requestModel.js";
import userModel from "../database/models/userModel.js";



export const deleteRequest = async (req, res) => {
    const { log_id, sender } = req.body;
    const myData = await userModel.findById(log_id);

    let status;

    if (log_id && sender) {
        requestModel.findOneAndDelete({ sender, receiver: myData.username })
            .then(() => {
                console.log("ok");
            });
        status = 200;
    } else {
        status = 400;
    }

    return status;
}