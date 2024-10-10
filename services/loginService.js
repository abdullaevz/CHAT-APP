import userModel from "../database/models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const userLogin = async (req, res) => {
    const { mail, password } = req.body;
    const user = await userModel.findOne({ mail });
    console.log(req.body, user);

    const KEY = process.env.PRIV_KEY


    if (mail && password) {
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log(isValidPassword);

            if (isValidPassword) {
                console.log("succesfully login");
                const token = jwt.sign({ user }, KEY);
                res.cookie("loginToken", token);

                res.redirect(`/inbox/${user._id}`)
            }
            else {
                res.render(
                    'login', { loginError: true }
                );

                console.log("Invalid pass");

            }
        } else {
            console.log("user not found please register");

        }
    } else {
        res.render(
            'login', { loginError: true }
        );

    }

}