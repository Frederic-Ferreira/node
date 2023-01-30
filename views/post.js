const postsList = document.getElementById("posts-list");

const sendFile = (myFiles, ws) => {
  let file = myFiles[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();
  let rawData = new ArrayBuffer();

  reader.onload = function (e) {
    rawData = e.target.result;
    ws.send(rawData);
  };

  reader.readAsArrayBuffer(file);
};

let ws;
function connect() {
  ws = new WebSocket("ws://localhost:3000/ws-posts");

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === "reply") addMessage(data.msg);
  };
}

let wsImage;
function connectWsImage() {
  wsImage = new WebSocket("ws://localhost:3000/ws-posts-image");

  wsImage.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === "reply") addImage(data.msg);
  };
}

async function addImage(path) {
  const li = document.createElement("li");
  const image = document.createElement("img");
  const pathName = "images/" + path;
  image.src = pathName;
  li.appendChild(image);
  postsList.prepend(li);
}

async function addMessage(content) {
  const message = document.createElement("li");
  message.innerText = content;
  postsList.prepend(message);
}

connect();
connectWsImage();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = document.querySelector("#post-area");
  const myFiles = document.getElementById("my-files").files;
  const postValue = inputText.value.trim();
  if (myFiles) {
    sendFile(myFiles, wsImage);
  }
  if (postValue !== "") {
    ws.send(postValue);
    addMessage(postValue);
    inputText.value = "";
  }
});
