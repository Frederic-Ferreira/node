const messageList = document.getElementById("message-list");
const chatStatus = document.getElementById("chat-status");

let ws;
function connect() {
  // subscribe to the websocket on route /ws
  ws = new WebSocket("ws://localhost:3000/ws");

  ws.onopen = () => {
    ws.send("Hello from client");
    chatStatus.style.background = "green";
  };

  ws.onerror = (error) => {
    console.log("Error", error);
  };

  ws.onclose = () => {
    chatStatus.style.background = "red";
    setTimeout(connect, 1000);
  };

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === "reply") addMessage(data.user.name + " : " + data.msg);
  };
}

function addMessage(content) {
  const message = document.createElement("p");
  message.innerText = content;
  messageList.append(message);
}

connect();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#chat-input");
  addMessage(input.value);
  ws.send(input.value);
  input.value = "";
});
