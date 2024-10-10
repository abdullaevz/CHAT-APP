import jwt from 'jsonwebtoken'
import userModel from '../database/models/userModel.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.loginToken;
    const KEY = process.env.PRIV_KEY;

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
            console.log("Session expired");
            res.redirect("/home?session-expired");
        } else {
            req.user = decoded;
            next();
        }
    })

}