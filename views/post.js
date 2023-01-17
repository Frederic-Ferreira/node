const postsList = document.getElementById("posts-list");

let ws;
function connect() {
  ws = new WebSocket("ws://localhost:3000/ws-posts");

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === "reply") addMessage(data.msg);
  };
}

async function addMessage(content) {
  const message = document.createElement("li");
  message.innerText = content;
  postsList.prepend(message);
}

connect();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#post-area");
  addMessage(input.value);
  ws.send(input.value);
  input.value = "";
});
