const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const viewRouter = require("./routes/viewRoutes");
const path = require("path");
const app = express();
const cors = require("cors");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewRouter);

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", function (socket) {
  socket.on("sendLocation", function (data) {
    io.emit("receiveLocation", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    io.emit("userDisconnected", socket.id);
  });
});

module.exports = server;
