const postsList = document.getElementById("posts-list");

function uploadFile(files, socket) {
  let file = files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();
  let rawData = new ArrayBuffer();

  reader.onload = function (e) {
    rawData = e.target.result;
    socket.send(rawData);
    socket.send(file.name);
  };

  reader.readAsArrayBuffer(file);
}

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
  // await sendFile();
  const inputText = document.querySelector("#post-area");
  const myFiles = document.getElementById("my-files").files;
  addMessage(inputText.value);
  uploadFile(myFiles, ws);

  // ws.send(JSON.stringify(myFiles));
  // ws.send(inputText.value);
  inputText.value = "";
});
