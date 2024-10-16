import userModel from "../database/models/userModel.js";
import bcrypt from "bcrypt";


export const regUser = async (req, res) => {
    const { username, password, surname, name, mail } = req.body;
    const lowerUsername = String(username).toLowerCase();
    const lowerMail = String(mail).toLowerCase();
    const checkMail = await userModel.findOne({ mail });
    const checkUsername = await userModel.findOne({ username });

    if (username && password && name && surname && mail) {
        if (checkMail === null && checkUsername === null) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userModel.create({
                name, surname, password: hashedPassword, mail: lowerMail, username: lowerUsername
            }).then(() => {
                res.redirect("/login");
            });


        } else if (checkMail) {
            res.render('register', { message: "This email is already exists" });

            console.log("user already exists");

        } else if (checkUsername) {
            res.render('register', { message: "This username is already exists" });

            console.log("user already exists");

        }
    } else {
        console.log("empty fields");

        res.render('register', { message: "Empty or wrong fields" });


    }
}
