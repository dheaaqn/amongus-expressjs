const route = require("express").Router();

const user = require("./routes/user");
const message = require("./routes/message");
const friend = require("./routes/friend");
const room = require("./routes/room");

route.use("/users", user);
route.use("/message", message);
route.use("/friend", friend);
route.use("/room", room);

module.exports = route;
