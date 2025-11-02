document.getElementById("entrar").addEventListener("click", () => {
  document.getElementById("portada").style.display = "none";
  document.getElementById("experiencia").style.display = "flex";
});

document.getElementById("retrato").addEventListener("click", () => {
  document.getElementById("pregunta").style.display = "none";
  document.getElementById("retrato").style.display = "none";

  const video = document.getElementById("video");
  const canvas = document.getElementById("composicion");
  const ctx = canvas.getContext("2d");
  const imagen = new Image();
  imagen.src = "assets/madame.png";

  video.style.display = "block";
  canvas.style.display = "block";

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      alert("No se pudo acceder a la cámara: " + err);
    });

  imagen.onload = () => {
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
  };
});

function tomarFoto() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("composicion");
  const ctx = canvas.getContext("2d");

  if (video.style.display === "block") {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    document.getElementById("hashtag").style.display = "block";
    video.style.display = "none";
  }
}