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

      const urlReal = data[canal].url;

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

      const iframe = document.createElement("iframe");
      iframe.src = urlReal;
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("scrolling", "no");
      iframe.style = "width:100%; height:100%; border:none;";

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

      contenedor.appendChild(iframe);
      contenedor.appendChild(closeBtn);
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.appendChild(contenedor);
    });
})();
