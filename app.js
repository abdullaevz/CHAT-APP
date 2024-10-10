import express from 'express';
import { configDotenv } from 'dotenv';
import { Server } from 'socket.io';
import { DBconnect } from './database/connect.js';
import cookieParser from 'cookie-parser';
import { appRoute } from './Routes/appRoutes.js';
import chalk from 'chalk';
import Message from './database/models/messageModel.js';
configDotenv();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(appRoute);


//listen server
const httpServer = app.listen(process.env.PORT, () => {
  console.log(chalk.yellow(`Server is running on port ${process.env.PORT}`));
  DBconnect();
});

//socket server
const server = new Server(httpServer);

//socket listening
server.on('connection', (socket) => {
  const currentUser = socket.handshake.query.currentUser;

  // Load messages
  socket.on('loadMessages', async (otherUser) => {
    try {
      const messages = await Message.find({
        $or: [
          { sender: currentUser, receiver: otherUser },
          { sender: otherUser, receiver: currentUser }
        ]
      }).sort({ timestamp: 1 });

      socket.emit('previousMessages', messages);

    } catch (err) {
      console.error(err);
    }
  });

  socket.on('joinroom', (roomID) => {
    socket.join(roomID);
    // Sending new messages
  socket.on('chatMessage', async (data) => {
    try {
      const message = await Message.create({
        sender: currentUser,
        receiver: data.receiver,
        text: data.text
      });
      // server.emit('chatMessage', message);
      server.to(roomID).emit('chatMessage', message);
    } catch (err) {
      console.error(err);
    }
  });
  });
});











