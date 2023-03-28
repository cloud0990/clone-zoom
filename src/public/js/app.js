const socket = io();

const welcomeDiv = document.getElementById("welcome");
const enterForm = document.getElementById("frm-name");

const roomDiv = document.getElementById("room");
roomDiv.hidden = true;

let roomInfo;

function addMessage(message) {
    const chatArea = document.getElementById("chat-area");
    const chat = document.createElement("li");

    chat.style.cssText = "margin-top: 1%; list-style: none;";

    chat.innerText = message;
    chatArea.appendChild(chat);

    chatArea.scrollTop = chatArea.scrollHeight;
}

function handleMessageSubmit(event) {
    event.preventDefault();

    const userChat = document.getElementById("userChat");
    const value = userChat.value;

    let paramObj = {
        message: userChat.value,
        room: roomInfo
    };

    socket.emit("new_message", paramObj, () => addMessage(value));

    userChat.value = "";
}

function showRoom() {
    welcomeDiv.hidden = true;
    roomDiv.hidden = false;

    const h3 = roomDiv.querySelector("h3");
    h3.innerText = `Room ${roomInfo}`;

    const msgForm = roomDiv.querySelector("#frm-msg");
    msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleEnterRoomSubmit() {
    event.preventDefault();

    const nickname = document.getElementById("nickname");
    const roomName = document.getElementById("roomName");

    //          custom event   argument                                         callback
    socket.emit("enter_room", {nickname: nickname.value, room: roomName.value}, showRoom);

    roomInfo = roomName.value;
}

enterForm.addEventListener("submit", handleEnterRoomSubmit);

socket.on("welcome", (nickname) => addMessage(`${nickname} 님이 입장하셨습니다.`));
socket.on("bye", (nickname) => addMessage(`${nickname} 님이 방을 나가셨습니다.`));
socket.on("new_message", (message) => addMessage(message));