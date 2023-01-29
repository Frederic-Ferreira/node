const form = document.getElementById("form-upload");

const sendFile = async () => {
  const myFiles = document.getElementById("my-files");

  const formData = new FormData();

  Object.keys(myFiles).forEach((key) => {
    formData.append(myFiles.item(key).name, myFiles.item(key));
  });

  await fetch("http://localhost:3000/image", {
    method: "POST",
    body: formData,
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendFile();
});
