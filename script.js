document.body.addEventListener('click', () => {
  const musica = document.getElementById('musica');
  if (musica) musica.muted = false;
});

function acceder() {
  document.getElementById('portada').style.display = 'none';
  document.getElementById('experiencia').style.display = 'block';

  const video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      alert("No se pudo acceder a la cámara: " + err);
    });
}

function detectarHuecoTransparente(imagen, callback) {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  tempCanvas.width = imagen.width;
  tempCanvas.height = imagen.height;
  tempCtx.drawImage(imagen, 0, 0);

  const imgData = tempCtx.getImageData(0, 0, imagen.width, imagen.height);
  const data = imgData.data;

  let minX = imagen.width, minY = imagen.height;
  let maxX = 0, maxY = 0;

  for (let y = 0; y < imagen.height; y++) {
    for (let x = 0; x < imagen.width; x++) {
      const i = (y * imagen.width + x) * 4;
      const alpha = data[i + 3];
      if (alpha < 10) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const hueco = {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };

  callback(hueco);
}

function iniciarRetrato() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('composicion');
  const ctx = canvas.getContext('2d');
  const imagen = new Image();
  imagen.src = 'assets/madame.png';

  video.style.display = 'none';
  canvas.style.display = 'block';
  document.getElementById('pregunta').style.display = 'none';

  imagen.onload = () => {
    detectarHuecoTransparente(imagen, (hueco) => {
      const centroHuecoX = hueco.x + hueco.width / 2;
      const centroHuecoY = hueco.y + hueco.height / 2;

      const rostroW = hueco.width;
      const rostroH = hueco.height;

      const rostroX = centroHuecoX - rostroW / 2;
      const rostroY = centroHuecoY - rostroH / 2;

      ctx.drawImage(video, rostroX, rostroY, rostroW, rostroH);
      ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);

      document.getElementById('compartir').style.display = 'inline-block';
    });
  };
}

function compartir() {
  const texto = "Estoy en #soymadamepompadour en #fiestabarroque";
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(texto)}&u=https://lomonaco-rraum.github.io/fiesta_barroque/`;
  window.open(url, '_blank');
}