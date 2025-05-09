const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require("dotenv").config();
const PORT= process.env.PORT||5001;
app.use(
	cors({
	  origin: ["http://localhost:3000","http://localhost:3001","https://bharat-crafters.vercel.app","https://bharat-crafters-git-main-akarshs-projects-734b263f.vercel.app","https://vercel.com/akarshs-projects-734b263f/bharat-crafters/7BisHbZb4BnZn2JyrsN5XAmJqUip",
      "https://bharat-crafters-seller.vercel.app","https://vercel.com/akarshs-projects-734b263f/bharat-crafters-seller/5GDQsb1q1KerYpNUu7t341yoA79L","https://bharat-crafters-seller-git-main-akarshs-projects-734b263f.vercel.app"
    ],
	  credentials: true,
	})
  );
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from socket server!");
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log(`a user is connected`);
 
    // when connect

    // take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    // send and get message
    const messages = {}; // Object to track messages sent to each user

    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
      const message = createMessage({ senderId, receiverId, text, images });

      const user = getUser(receiverId);

      // Store messages in  `messages` object
      if (!messages[receiverId]) {
        messages[receiverId] = [message];
      } else {
        messages[receiverId].push(message);
      }

      // send the message to the recevier
      io.to(user?.socketId).emit("getMessage", message);
    });

    socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
      const user = getUser(senderId);

      // update the seen flag for the message
      if (messages[senderId]) {
        const message = messages[senderId].find(
          (message) =>
            message.receiverId === receiverId && message.id === messageId
        );
        if (message) {
          message.seen = true;

          // send a message seen event to the sender
          io.to(user?.socketId).emit("messageSeen", {
            senderId,
            receiverId,
            messageId,
          });
        }
      }
    });

    // update and get last message
    socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
      io.emit("getLastMessage", {
        lastMessage,
        lastMessagesId,
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      console.log(`a user disconnected!`);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
 
})

server.listen( PORT, () => {
  console.log(`server is running on port ${PORT}`);
});



