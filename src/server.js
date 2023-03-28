import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", socket => {

    // socket.onAny(): 이벤트가 발생할 때 실행될 리스너
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`)
    });

    socket.on("enter_room", (enterInfo, done) => {
        socket.join(enterInfo.room);

        socket["nickname"] = enterInfo.nickname;

        done(); // TODO front-end callback fn을 back-end 에서 실행시킴

        socket.to(enterInfo.room).emit("welcome", socket.nickname);
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => {
            socket.to(room).emit("bye", socket.nickname);
        });
    });

    socket.on("new_message", (msg, done) => {
        socket.to(msg.room).emit("new_message", `${socket.nickname}: ${msg.message}`);

        done();
    });

});

httpServer.listen(3000, handleListen);


