let frameId;

document.getElementById("entrar").addEventListener("click", () => {
  document.getElementById("portada").style.display = "none";
  document.getElementById("experiencia").style.display = "flex";
  document.getElementById("musica").play();
  document.getElementById("experiencia").style.backgroundImage = "url('assets/salon.jpg')";
});

document.getElementById("retrato").addEventListener("click", () => {
  document.getElementById("pregunta").style.display = "none";
  document.getElementById("retrato").style.display = "none";

  const estado = document.getElementById("estado").value;
  const video = document.getElementById("video");
  const canvas = document.getElementById("composicion");
  const imagen = new Image();
  imagen.src = `assets/${estado}.png`;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  video.style.display = "block";
  canvas.style.display = "block";

  document.getElementById("experiencia").style.backgroundImage = `url('assets/${estado}.png')`;

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
    document.getElementById("obturador").style.display = "inline-block";
  };
});

function iniciarRenderizado(video, canvas, imagen) {
  const ctx = canvas.getContext("2d");

  function renderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight;
    if (videoRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = videoRatio * drawHeight;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / videoRatio;
    }

    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;

    ctx.filter = "sepia(0.6) contrast(1.2) saturate(1.3)";
    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
    ctx.filter = "none";
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);

    frameId = requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

document.getElementById("obturador").addEventListener("click", () => {
  const estado = document.getElementById("estado").value;
  const video = document.getElementById("video");
  const canvas = document.getElementById("composicion");
  const ctx = canvas.getContext("2d");

  if (frameId) {
    cancelAnimationFrame(frameId);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const videoRatio = video.videoWidth / video.videoHeight;
  const canvasRatio = canvas.width / canvas.height;

  let drawWidth, drawHeight;
  if (videoRatio > canvasRatio) {
    drawHeight = canvas.height;
    drawWidth = videoRatio * drawHeight;
  } else {
    drawWidth = canvas.width;
    drawHeight = drawWidth / videoRatio;
  }

  const offsetX = (canvas.width - drawWidth) / 2;
  const offsetY = (canvas.height - drawHeight) / 2;

  ctx.filter = "sepia(0.6) contrast(1.2) saturate(1.3)";
  ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
  ctx.filter = "none";

  const marco = new Image();
  marco.src = `assets/${estado}.png`;
  marco.onload = () => {
    ctx.drawImage(marco, 0, 0, canvas.width, canvas.height);

    video.style.display = "none";
    document.getElementById("obturador").style.display = "none";
    document.getElementById("hashtag").style.display = "block";

    const compartir = document.getElementById("compartir");
    compartir.style.display = "flex";
    setTimeout(() => {
      compartir.style.opacity = 1;
      compartir.style.transform = "translateX(-50%) translateY(0)";
    }, 100);

    document.getElementById("volver").style.display = "inline-block";
    agregarAGaleria(canvas);
  };
});

function agregarAGaleria(canvas) {
  const galeria = document.getElementById("galeria");
  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  img.className = "miniatura";
  galeria.appendChild(img);
}

document.getElementById("ver-galeria").addEventListener("click", () => {
  const galeria = document.getElementById("galeria");
  galeria.style.display = galeria.style.display === "none" ? "flex" : "none";
});

document.getElementById("volver").addEventListener("click", () => {
  const video = document.getElementById("video");
  const canvas = document.getElementById("composicion");

  if (frameId) {
    cancelAnimationFrame(frameId);
  }

  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }

  video.style.display = "none";
  canvas.style.display = "none";
  document.getElementById("obturador").style.display = "none";
  document.getElementById("hashtag").style.display = "none";
  document.getElementById("compartir").style.display = "none";
  document.getElementById("galeria").style.display = "none";
  document.getElementById("volver").style.display = "none";

  document.getElementById("pregunta").style.display = "block";
  document.getElementById("retrato").style.display = "block";

  // Restaurar fondo del salón
  document.getElementById("experiencia").style.backgroundImage = "url('assets/salon.jpg')";
});
