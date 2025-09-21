(function() {
  const params = new URLSearchParams(window.location.search);
  const canal = params.get("channel");
  if (!canal) return;

  fetch("https://raw.githubusercontent.com/hernanmix/play.github.io/main/canales.json")
    .then(res => res.json())
    .then(data => {
      if (!data[canal]) {
        alert("Canal no encontrado");
        return;
      }

      const url = data[canal].url;
      const contenedor = document.createElement("div");
      contenedor.id = "player-container";
      contenedor.style = `
        position:fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        background:#000;
        z-index:99999;
      `;

      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.allowFullscreen = true;
      iframe.style = "width:100%; height:100%; border:none;";

      const cerrar = document.createElement("button");
      cerrar.innerHTML = "✖";
      cerrar.style = `
        position:absolute;
        top:10px;
        right:10px;
        background:#222;
        color:#fff;
        border:none;
        font-size:20px;
        padding:5px 10px;
        cursor:pointer;
        z-index:100000;
      `;
      cerrar.onclick = () => contenedor.remove();

      contenedor.appendChild(iframe);
      contenedor.appendChild(cerrar);
      document.body.appendChild(contenedor);
    });
})();
