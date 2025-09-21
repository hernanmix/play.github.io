(function() {
  const params = new URLSearchParams(window.location.search);
  const canal = params.get("channel");

  if (canal) {
    // Construir URL real del stream
    const urlReal = "https://raw.githubusercontent.com/hernanmix/play.github.io/main/canales.json" + canal;

    // Codificar en Base64
    const base64 = btoa(urlReal);

    // Crear contenedor flotante fullscreen
    const contenedor = document.createElement("div");
    contenedor.id = "player-container";
    contenedor.style = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:99999;
      background:#000;
      display:flex;
      justify-content:center;
      align-items:center;
    `;

    // Crear iframe del reproductor
    const iframe = document.createElement("iframe");
    iframe.src = urlReal;
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("scrolling", "no");
    iframe.style = `
      width:100%;
      height:100%;
      border:none;
    `;

    // Botón de cierre flotante
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✖";
    closeBtn.style = `
      position:absolute;
      top:10px;
      right:15px;
      z-index:100000;
      background:rgba(0,0,0,0.6);
      color:#fff;
      border:none;
      font-size:24px;
      cursor:pointer;
      padding:5px 10px;
      border-radius:6px;
    `;
    closeBtn.onclick = () => {
      contenedor.remove();
      document.body.style.overflow = "";
    };

    // Agregar elementos al contenedor
    contenedor.appendChild(iframe);
    contenedor.appendChild(closeBtn);

    // Insertar al DOM
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.appendChild(contenedor);

    // Actualizar la URL visible con ?r=base64
    const nuevaURL = window.location.origin + window.location.pathname + "?r=" + base64;
    window.history.replaceState({}, "", nuevaURL);
  }
})();
