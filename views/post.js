const postsList = document.getElementById("posts-list");

const sendFile = (myFile, ws) => {
  const reader = new FileReader();

  reader.readAsDataURL(myFile);

  reader.onload = () => {
    const dataUrl = reader.result;
    ws.send(dataUrl);
    addImage(dataUrl);
    console.log("hello from the client");
  };
};

let ws;
function connect() {
  ws = new WebSocket("ws://localhost:3000/ws-posts");

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === "post") {
      addMessage(data.msg);
    }
    if (type === "image") {
      addImage(data.msg);
    }
  };
}

connect();

function addImage(data) {
  const li = document.createElement("li");
  const image = document.createElement("img");
  image.src = data;
  li.appendChild(image);
  postsList.prepend(li);
}

function addMessage(content) {
  const message = document.createElement("li");
  message.innerText = content;
  postsList.prepend(message);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = document.querySelector("#post-area");
  const inputFile = document.getElementById("my-files");
  const file = inputFile.files[0];
  const postValue = inputText.value.trim();
  if (postValue !== "") {
    ws.send(postValue);
    addMessage(postValue);
    inputText.value = "";
  }
  if (file) {
    sendFile(file, ws);
    inputFile.value = "";
  }
});
