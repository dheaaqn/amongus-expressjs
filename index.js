require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const routerNavigation = require("./src/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("uploads"));

app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", routerNavigation);

app.get("*", (req, res) => {
  res.status(404).send("Path not found");
});

const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socket(server);

// IMPORT MODEL
const msgModel = require("./src/model/Message");

// socket
io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on('joinRoom', (id) => {
    socket.join(`room: ${id}`)
  })

  socket.on("sendMessage", (data, callback) => {
    const setData = {
      room_id: data.room_id,
      msg_body: data.msg_body,
      msg_sender_id: data.msg_sender_id,
      msg_receiver_id: data.msg_receiver_id,
      msg_created_at: new Date(),
    };
    
    msgModel
      .insertMessage(setData)
      .then(() => {
        io.to(`room: ${data.room_id}`).emit("chatMessage", setData);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  socket.on('sendNotification', (data) => {
    socket.broadcast.emit('showNotification', data)
    console.log(data)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typingMessage', data.user_name)
	})

  socket.on("disconnect", () => {
    console.log("disconnected from socket");
  });
});

server.listen(process.env.PORT, process.env.IP, () => {
  console.log("ExpressJS running on port 3000");
});
