/* Funções compartilhadas entre a home e a página de perfil. */

/* Gera um fundo em degradê (data-URI SVG) usado como "foto" placeholder.
   Nenhuma imagem real é usada — é só um retângulo colorido com um vulto. */
function avatarBg(cor) {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='300' height='400'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='${cor}'/>
          <stop offset='1' stop-color='#101014'/>
        </linearGradient>
      </defs>
      <rect width='300' height='400' fill='url(#g)'/>
      <circle cx='150' cy='150' r='60' fill='rgba(255,255,255,0.18)'/>
      <path d='M60 400 C60 300 240 300 240 400 Z' fill='rgba(255,255,255,0.18)'/>
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
