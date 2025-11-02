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

function iniciarRetrato() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('composicion');
  const ctx = canvas.getContext('2d');
  const imagen = new Image();
  imagen.src = 'assets/madame.png';

  // Ocultar elementos previos
  video.style.display = 'none';
  canvas.style.display = 'block';
  document.getElementById('pregunta').style.display = 'none';

  // Dibujar rostro desde cámara
  ctx.drawImage(video, 200, 200, 200, 200); // Ajustá según el hueco

  // Superponer imagen PNG centrada
  imagen.onload = () => {
    const imgW = imagen.width;
    const imgH = imagen.height;
    const x = (canvas.width - imgW) / 2;
    const y = (canvas.height - imgH) / 2;
    ctx.drawImage(imagen, x, y, imgW, imgH);
    document.getElementById('compartir').style.display = 'inline-block';
  };
}

function compartir() {
  const texto = "Estoy en #soymadamepompadour en #fiestabarroque";
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(texto)}&u=https://lomonaco-rraum.github.io/fiesta_barroque/`;
  window.open(url, '_blank');
}