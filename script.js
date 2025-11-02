let renderLoop;

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
      video.play();
    })
    .catch(err => {
      alert("No se pudo acceder a la cámara: " + err);
    });

  imagen.onload = () => {
    iniciarRenderizado(video, canvas, imagen);
  };
});

function iniciarRenderizado(video, canvas, imagen) {
  const ctx = canvas.getContext("2d");

  renderLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "sepia(0.6) contrast(1.2) saturate(1.3)";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(renderLoop);
  };

  renderLoop();
}

function tomarFoto() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("composicion");
  const ctx = canvas.getContext("2d");
  const imagen = new Image();
  imagen.src = "assets/madame.png";

  if (video.style.display === "block") {
    cancelAnimationFrame(renderLoop);

    imagen.onload = () => {
      ctx.filter = "sepia(0.6) contrast(1.2) saturate(1.3)";
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
      ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);

      document.getElementById("hashtag").style.display = "block";
      document.getElementById("compartir").style.display = "block";
      video.style.display = "none";

      const enlace = document.createElement("a");
      enlace.download = "retrato_barroque.png";
      enlace.href = canvas.toDataURL("image/png");
      enlace.click();
    };
  }
}
