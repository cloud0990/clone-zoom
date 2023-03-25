const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nickname");

// 서버로 연결
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("message", () => {
    console.log("Connected to Server")
});
socket.addEventListener("close", () => {
    console.log("Disconnected from Server")
});

socket.addEventListener("message", (msg) => {
    const li = document.createElement("li");

    li.innerText = msg.data;
    messageList.append(li);
});

function makeMsg(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");

    const li = document.createElement("li");
    li.innerText = `나: ${input.value}`;
    messageList.append(li);

    socket.send(makeMsg("new_message", input.value));
    input.value = "";
}

function handleNickSubmit() {
    event.preventDefault();
    const input = nickForm.querySelector("input");

    socket.send(makeMsg("nickname", input.value));
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);