## Zoom Clone (NodeJS, WebRTC, Websockets)
***

~~~
npm i nodemon -D

npm i @babel/core @bable/cli @bable/node -D
npm i @babel/preset-env -D

npm i express

npm i pug

npm i ws
npm i ws@버전
~~~

<br>

## Socket.IO (https://socket.io/docs/v4/)
***
> 클라이언트와 서버 간의 짧은 대기 시간, 양방향 및 이벤트 기반 통신을 가능하게 하는 라이브러리

<br>

#### Setting ( + https://socket.io/docs/v4/emitting-events/)

- 서버
```javascript
import http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    socket.emit("myEvent", "hello");
});

httpServer.listen(3000);
```

- 클라이언트
```javascript
const socket = io();

socket.on("myEvent", (argument) => {
    console.log(argument); // hello
});