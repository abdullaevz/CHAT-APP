import { Router } from "express";
import path from 'path';
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { chatRendering } from "../utils/inboxRendering.js";
import { regUser } from "../services/registerService.js";
import { userLogin } from "../services/loginService.js";
import { createRequest } from "../utils/createRequest.js";
import { renderNot } from "../utils/notificationRendering.js";
import { deleteRequest } from "../utils/deleteRequest.js";
import { addFriends } from "../utils/addFriends.js";
import { deleteFriend } from "../utils/deleteFriend.js";
import chatModel from "../database/models/chatModel.js";
import { renderChat } from "../utils/chatRendering.js";
import userModel from "../database/models/userModel.js";


export const appRoute = Router();



//GET resuests

appRoute.get("/logout", (req, res) => {
    res.clearCookie("loginToken");
    res.redirect("/home");
})

appRoute.get("/", (req, res) => {
    res.redirect("/home");
});

appRoute.get("/home?session-expired", (req, res) => {
    res.sendFile(path.resolve("./views/home.html"));
});
appRoute.get("/home", (req, res) => {
    res.sendFile(path.resolve("./views/home.html"));
});

appRoute.get("/register", (req, res) => {
    res.render('register', { message: null });
});

appRoute.get("/login", (req, res) => {
    res.render(
        'login', { message:"" }
    );
});

appRoute.get("/chats/:datas", authMiddleware, async (req, res) => {
    renderChat(req, res);

});

appRoute.get("/inbox/:id", authMiddleware, (req, res) => {
    const logID = req.params.id;
    const myID = logID.toString();
    chatRendering(req, res, myID);
});

appRoute.get("/notifications/:id", authMiddleware, (req, res) => {
    renderNot(req, res);
})

appRoute.get("/settings/:id", async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.render("settings", { user });
});


// POST requests
appRoute.post("/register", regUser)

appRoute.post("/login", userLogin);

appRoute.post("/add-user", authMiddleware, (req, res) => {
    createRequest(req, res).then((status) => {
        if (status) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    });
});



appRoute.post("/remove-friends", (req, res) => {
    deleteFriend(req, res);
});


appRoute.post("/accept-request", authMiddleware, (req, res) => {
    addFriends(req, res);
});

appRoute.post("/reject-request", authMiddleware, (req, res) => {
    deleteRequest(req, res).then((status) => {
        res.sendStatus(status);
    });
});

appRoute.post("/update/:id", async (req, res) => {
    const { email, fistName: name, lastName: surname, password, username } = req.body;

    userModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
        console.log("data updated");
    });;

    res.redirect(`/settings/${req.params.id}`);

});
