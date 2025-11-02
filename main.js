function acceder() {
  document.getElementById('portada').style.display = 'none';
  document.getElementById('experiencia').style.display = 'block';
}

function iniciarRetrato() {
  const canvas = document.getElementById('composicion');
  const ctx = canvas.getContext('2d');
  const imagen = new Image();
  imagen.src = 'assets/madame.png';

  imagen.onload = () => {
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
    document.getElementById('compartir').style.display = 'inline-block';
  };
}

function compartir() {
  const texto = "Estoy en #soymadamepompadour en #fiestabarroque";
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(texto)}&u=https://tuusuario.github.io/una-fiesta-barroque/`;
  window.open(url, '_blank');
}