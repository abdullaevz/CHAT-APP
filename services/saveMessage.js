import Message from '../models/messageModel.js';

// Yeni mesaj kaydetme
export const saveMessage = async (sender, receiver, text) => {
    const message = new Message({
        sender,
        receiver,
        text
    });
    await message.save();
    return message;
};

// İki kullanıcı arasındaki tüm mesajları getirme
export const getMessages = async (currentUser, otherUser) => {
    return await Message.find({
        $or: [
            { sender: currentUser, receiver: otherUser },
            { sender: otherUser, receiver: currentUser }
        ]
    }).sort({ timestamp: 1 });
};
