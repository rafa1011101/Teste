/* Funções compartilhadas entre a home e a página de perfil. */

/* Gera um retrato de modelo estilizado (data-URI SVG) usado como "foto".
   É uma ILUSTRAÇÃO gerada — não é uma pessoa real e não usa fotos reais.
   A figura (pose de estúdio, iluminação, cabelo/pele/roupa variados) é
   derivada do id do anúncio, então cada perfil tem um retrato próprio. */
function _shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function _hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
const _PELE = ["#eab38f", "#d69f7e", "#c68642", "#8d5524", "#f1c9a5", "#b5794f"];
const _CABELO = ["#241812", "#3d2817", "#12100f", "#5a3820", "#0a0a0a", "#734b28"];
const _ROUPA = ["#141419", "#3a1024", "#232331", "#40101f", "#101820"];

function retrato(a) {
  const h = _hash(a.id);
  const pele = _PELE[h % _PELE.length];
  const cab = _CABELO[(h >>> 3) % _CABELO.length];
  const roupa = _ROUPA[(h >>> 6) % _ROUPA.length];
  const cor = a.cor;
  const masc = a.categoria === "homens";
  const estilo = masc ? "curto" : ["longo", "ondulado", "coque", "medio"][(h >>> 2) % 4];
  const skinL = _shade(pele, 24), skinD = _shade(pele, -48), cabL = _shade(cab, 30);

  let hairBack = "";
  if (masc) {
    hairBack = `<path d="M104,128 C104,84 196,84 196,128 C184,108 168,100 150,100 C132,100 116,108 104,128 Z" fill="${cab}"/>`;
  } else if (estilo === "longo" || estilo === "ondulado") {
    const w = estilo === "ondulado" ? 12 : 0;
    hairBack = `<path d="M150,74 C94,74 90,140 95,185 C100,245 ${95 + w},310 90,352 L122,352 C120,305 124,250 122,208 C120,168 122,120 150,110 C178,120 180,168 178,208 C176,250 180,305 178,352 L${210 - w},352 C205,310 200,245 205,185 C210,140 206,74 150,74 Z" fill="${cab}"/>`;
  } else if (estilo === "medio") {
    hairBack = `<path d="M150,76 C100,76 96,140 100,185 C104,230 100,255 98,272 L126,272 C124,245 126,205 124,185 C122,150 126,118 150,110 C174,118 178,150 176,185 C174,205 176,245 174,272 L202,272 C200,255 196,230 200,185 C204,140 200,76 150,76 Z" fill="${cab}"/>`;
  } else {
    hairBack = `<ellipse cx="150" cy="64" rx="27" ry="24" fill="${cab}"/><path d="M108,150 C104,110 118,86 150,86 C182,86 196,110 192,150 C186,130 172,118 150,118 C128,118 114,130 108,150 Z" fill="${cab}"/>`;
  }

  let body;
  if (masc) {
    body = `<path d="M52,400 C52,306 96,262 150,262 C204,262 248,306 248,400 Z" fill="${roupa}"/><path d="M150,262 L134,288 L150,302 L166,288 Z" fill="${_shade(roupa, 16)}"/>`;
  } else {
    body = `<path d="M78,400 C78,312 112,266 150,266 C188,266 222,312 222,400 Z" fill="${roupa}"/><path d="M132,268 C138,286 150,296 150,296 C150,296 162,286 168,268 L162,266 C158,280 150,286 150,286 C150,286 142,280 138,266 Z" fill="${_shade(roupa, -20)}"/><rect x="126" y="250" width="5" height="26" rx="2" fill="${_shade(roupa, 22)}"/><rect x="169" y="250" width="5" height="26" rx="2" fill="${_shade(roupa, 22)}"/>`;
  }

  const neck = `<rect x="134" y="192" width="32" height="46" rx="14" fill="${skinD}"/><ellipse cx="150" cy="196" rx="20" ry="10" fill="${_shade(pele, -75)}" opacity="0.5"/>`;
  const head = `<ellipse cx="150" cy="146" rx="47" ry="60" fill="url(#skin)"/>`;

  const _LABIO = ["#c2415a", "#b83b52", "#a83048", "#d1596e"];
  const labio = _LABIO[(h >>> 9) % _LABIO.length];
  const olhos = `<g><ellipse cx='133' cy='140' rx='8.5' ry='5' fill='#f6efe8'/><ellipse cx='167' cy='140' rx='8.5' ry='5' fill='#f6efe8'/><circle cx='134' cy='141' r='3.4' fill='#2f2016'/><circle cx='166' cy='141' r='3.4' fill='#2f2016'/><path d='M124,139 Q133,133 142,139' stroke='#241812' stroke-width='1.6' fill='none' stroke-linecap='round'/><path d='M158,139 Q167,133 176,139' stroke='#241812' stroke-width='1.6' fill='none' stroke-linecap='round'/></g>`;
  const brows = `<path d='M123,127 Q133,122 143,126' stroke='${_shade(cab, -6)}' stroke-width='2.4' fill='none' stroke-linecap='round'/><path d='M157,126 Q167,122 177,127' stroke='${_shade(cab, -6)}' stroke-width='2.4' fill='none' stroke-linecap='round'/>`;
  const nariz = `<path d='M150,146 L146,164 Q150,167 154,164' stroke='${skinD}' stroke-width='1.6' fill='none' stroke-linecap='round'/>`;
  const boca = masc
    ? `<path d='M140,181 Q150,185 160,181' stroke='${_shade(pele, -42)}' stroke-width='2' fill='none' stroke-linecap='round'/>`
    : `<path d='M139,180 Q150,176 161,180 Q150,188 139,180 Z' fill='${labio}'/>`;
  const blush = masc ? "" : `<ellipse cx='127' cy='168' rx='9' ry='5' fill='${labio}' opacity='0.14'/><ellipse cx='173' cy='168' rx='9' ry='5' fill='${labio}' opacity='0.14'/>`;
  const rosto = brows + olhos + nariz + boca + blush;

  let hairFront;
  if (masc) {
    hairFront = `<path d="M104,148 C100,104 124,84 150,84 C176,84 200,104 196,148 C190,116 176,106 150,106 C124,106 110,116 104,148 Z" fill="url(#cabg)"/>`;
  } else {
    hairFront = `<path d="M104,150 C100,102 122,80 150,80 C178,80 200,102 196,150 C190,120 176,110 150,110 C124,110 110,120 104,150 Z" fill="url(#cabg)"/>`;
  }

  const shading = `<ellipse cx="130" cy="130" rx="24" ry="36" fill="#ffffff" opacity="0.08"/><ellipse cx="173" cy="158" rx="22" ry="36" fill="#000000" opacity="0.13"/>`;

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'>
    <defs>
      <radialGradient id='bg' cx='50%' cy='40%' r='78%'><stop offset='0' stop-color='${cor}'/><stop offset='0.5' stop-color='${_shade(cor, -60)}'/><stop offset='1' stop-color='#0b0b0e'/></radialGradient>
      <radialGradient id='spot' cx='50%' cy='30%' r='42%'><stop offset='0' stop-color='#ffffff' stop-opacity='0.28'/><stop offset='1' stop-color='#ffffff' stop-opacity='0'/></radialGradient>
      <radialGradient id='vig' cx='50%' cy='50%' r='75%'><stop offset='0.55' stop-color='#000' stop-opacity='0'/><stop offset='1' stop-color='#000' stop-opacity='0.55'/></radialGradient>
      <linearGradient id='skin' x1='0' y1='0' x2='1' y2='0.4'><stop offset='0' stop-color='${skinL}'/><stop offset='1' stop-color='${skinD}'/></linearGradient>
      <linearGradient id='cabg' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='${cabL}'/><stop offset='1' stop-color='${cab}'/></linearGradient>
      <filter id='grain'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.05'/></feComponentTransfer></filter>
    </defs>
    <rect width='300' height='400' fill='url(#bg)'/>
    <ellipse cx='150' cy='115' rx='150' ry='120' fill='url(#spot)'/>
    ${hairBack}${body}${neck}${head}${shading}${rosto}${hairFront}
    <rect width='300' height='400' fill='url(#vig)'/>
    <rect width='300' height='400' filter='url(#grain)' opacity='0.45'/>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/* Iniciais do nome, ex.: "Ana Beatriz" -> "AB" */
function iniciais(nome) {
  return nome
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatarValor(v) {
  return "R$ " + v.toLocaleString("pt-BR");
}

const ROTULO_CATEGORIA = {
  mulheres: "Mulheres",
  homens: "Homens",
  trans: "Trans",
};

/* ---------------- Age gate (verificação 18+) ----------------
   Mostra o modal na primeira visita da sessão. Guarda a escolha
   em sessionStorage para não repetir a cada navegação. */
function iniciarAgeGate() {
  const gate = document.getElementById("agegate");
  if (!gate) return;

  if (sessionStorage.getItem("maiorDeIdade") === "sim") {
    gate.classList.add("hidden");
    return;
  }

  document.getElementById("btnEntrar").addEventListener("click", () => {
    sessionStorage.setItem("maiorDeIdade", "sim");
    gate.classList.add("hidden");
  });

  document.getElementById("btnSair").addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}
