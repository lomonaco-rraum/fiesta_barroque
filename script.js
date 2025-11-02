let frameId;

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

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  video.style.display = "block";
  canvas.style.display = "block";

  document.getElementById("experiencia").classList.add("retrato-activa");

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
    ctx.filter = "sepia(0.6) contrast(1.2) saturate(1.3)";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
    frameId = requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

document.getElementById("obturador").addEventListener("click", () => {
  const video = document.getElementById("video");
  const canvas = document.getElementById("composicion");
  const ctx = canvas.getContext("2d");

  if (frameId) {
    cancelAnimationFrame(frameId);
  }

  // Capturar el último frame del video + marco
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = "sepia(0.6) contrast(1.2) saturate(1.3)";
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.filter = "none";

  const marco = new Image();
  marco.src = "assets/madame.png";
  marco.onload = () => {
    ctx.drawImage(marco, 0, 0, canvas.width, canvas.height);

    // Ocultar video y botón de obturador
    video.style.display = "none";
    document.getElementById("obturador").style.display = "none";

    // Mostrar hashtag y botones
    document.getElementById("hashtag").style.display = "block";
    const compartir = document.getElementById("compartir");
    compartir.style.display = "flex";
    setTimeout(() => {
      compartir.style.opacity = 1;
      compartir.style.transform = "translateX(-50%) translateY(0)";
    }, 100);

    // Guardar imagen en galería
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
