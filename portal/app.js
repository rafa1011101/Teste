/* Lógica da home: filtros, busca, ordenação e renderização dos cards. */

(function () {
  const grid = document.getElementById("grid");
  const resultado = document.getElementById("resultado");
  const busca = document.getElementById("busca");
  const fCidade = document.getElementById("fCidade");
  const fOrdem = document.getElementById("fOrdem");
  const fVerificado = document.getElementById("fVerificado");
  const tabs = document.getElementById("tabs");

  const estado = { categoria: "todos", texto: "", cidade: "", ordem: "destaque", verificado: false };

  /* Preenche o select de cidades a partir dos dados. */
  function popularCidades() {
    const cidades = [...new Set(ANUNCIOS.map((a) => `${a.cidade}/${a.estado}`))].sort();
    cidades.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      fCidade.appendChild(opt);
    });
  }

  function filtrar() {
    let lista = ANUNCIOS.slice();

    if (estado.categoria !== "todos") {
      lista = lista.filter((a) => a.categoria === estado.categoria);
    }
    if (estado.cidade) {
      lista = lista.filter((a) => `${a.cidade}/${a.estado}` === estado.cidade);
    }
    if (estado.verificado) {
      lista = lista.filter((a) => a.verificado);
    }
    if (estado.texto) {
      const t = estado.texto.toLowerCase();
      lista = lista.filter(
        (a) =>
          a.nome.toLowerCase().includes(t) ||
          a.cidade.toLowerCase().includes(t) ||
          a.estado.toLowerCase().includes(t)
      );
    }

    switch (estado.ordem) {
      case "menor": lista.sort((a, b) => a.valor - b.valor); break;
      case "maior": lista.sort((a, b) => b.valor - a.valor); break;
      case "idade": lista.sort((a, b) => a.idade - b.idade); break;
      default: lista.sort((a, b) => (b.destaque === true) - (a.destaque === true));
    }
    return lista;
  }

  function card(a) {
    const el = document.createElement("a");
    el.className = "card";
    el.href = `perfil.html?id=${encodeURIComponent(a.id)}`;

    const badges = [];
    if (a.destaque) badges.push('<span class="badge badge-destaque">★ Destaque</span>');
    if (a.verificado) badges.push('<span class="badge badge-verificado">✓ Verificado</span>');

    el.innerHTML = `
      <div class="card-img" style="background:${a.cor}">
        <div class="card-badges">${badges.join("")}</div>
        <span>${iniciais(a.nome)}</span>
      </div>
      <div class="card-body">
        <div class="card-nome">${a.nome}, ${a.idade}
          ${a.verificado ? '<span class="v">✓</span>' : ""}
        </div>
        <div class="card-cidade">📍 ${a.cidade}/${a.estado}</div>
        <div class="card-valor">${formatarValor(a.valor)}</div>
        <span class="card-cat">${ROTULO_CATEGORIA[a.categoria]}</span>
      </div>`;
    // Usa o degradê SVG por cima da cor base para dar o "vulto".
    el.querySelector(".card-img").style.backgroundImage = avatarBg(a.cor);
    el.querySelector(".card-img").style.backgroundSize = "cover";
    return el;
  }

  function render() {
    const lista = filtrar();
    grid.innerHTML = "";
    if (lista.length === 0) {
      grid.innerHTML = '<div class="vazio">Nenhum anúncio encontrado com esses filtros. 🔍</div>';
    } else {
      lista.forEach((a) => grid.appendChild(card(a)));
    }
    resultado.textContent = `${lista.length} anúncio${lista.length !== 1 ? "s" : ""}`;
  }

  /* ---- Eventos ---- */
  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("ativo"));
    btn.classList.add("ativo");
    estado.categoria = btn.dataset.cat;
    render();
  });

  busca.addEventListener("input", () => { estado.texto = busca.value.trim(); render(); });
  document.getElementById("btnBuscar").addEventListener("click", () => { estado.texto = busca.value.trim(); render(); });
  fCidade.addEventListener("change", () => { estado.cidade = fCidade.value; render(); });
  fOrdem.addEventListener("change", () => { estado.ordem = fOrdem.value; render(); });
  fVerificado.addEventListener("change", () => { estado.verificado = fVerificado.checked; render(); });
  document.getElementById("btnAnunciar").addEventListener("click", () =>
    alert("Cadastro de anúncio: nesta demonstração o formulário ainda não está implementado.")
  );

  /* ---- Início ---- */
  iniciarAgeGate();
  popularCidades();
  render();
})();
