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
    el.className = "card" + (a.destaque ? " destaque" : "");
    el.href = `perfil.html?id=${encodeURIComponent(a.id)}`;

    // Alguns selos (online / vídeo) são derivados do id só para a demo.
    const online = _hash(a.id) % 3 !== 0;
    const video = _hash(a.id) % 2 === 0;

    const badges = [];
    if (a.destaque) badges.push('<span class="badge badge-destaque">★ Destaque</span>');
    if (a.verificado) badges.push('<span class="badge badge-verif">✓ Verificado</span>');
    if (video) badges.push('<span class="badge badge-video">▶ Vídeo</span>');
    if (online) badges.push('<span class="badge badge-online"><span class="dot"></span>Online</span>');

    el.innerHTML = `
      <div class="card-photo">
        <div class="card-bg"></div>
        <div class="card-grad"></div>
        <div class="card-top">
          <div class="badges">${badges.join("")}</div>
          <button class="fav" type="button" aria-label="Favoritar">♡</button>
        </div>
        <div class="card-info">
          <div class="card-nome">${a.nome}, ${a.idade}${a.verificado ? ' <span class="v">✓</span>' : ""}</div>
          <div class="card-cidade">📍 ${a.cidade}, ${a.estado}</div>
          <div class="card-valor">${formatarValor(a.valor)}</div>
        </div>
      </div>`;
    // Retrato de modelo estilizado (ilustração gerada) preenchendo o card.
    el.querySelector(".card-bg").style.backgroundImage = retrato(a);

    const fav = el.querySelector(".fav");
    fav.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      fav.classList.toggle("on");
      fav.textContent = fav.classList.contains("on") ? "♥" : "♡";
    });
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
  fCidade.addEventListener("change", () => {
    estado.cidade = fCidade.value;
    document.getElementById("cidadeAtual").textContent = fCidade.value
      ? fCidade.value.replace("/", ", ")
      : "Brasil";
    render();
  });
  fOrdem.addEventListener("change", () => { estado.ordem = fOrdem.value; render(); });
  fVerificado.addEventListener("change", () => { estado.verificado = fVerificado.checked; render(); });
  document.getElementById("locPill").addEventListener("click", () => {
    fCidade.focus();
    fCidade.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.getElementById("btnEntrarConta").addEventListener("click", () =>
    alert("Entrar: nesta demonstração a área de conta ainda não está implementada.")
  );
  document.getElementById("btnAnunciar").addEventListener("click", () =>
    alert("Cadastro de anúncio: nesta demonstração o formulário ainda não está implementado.")
  );

  /* Patrocinadores locais de Chapecó (exemplos fictícios de demonstração).
     Em um portal real, seriam espaços pagos de estabelecimentos parceiros. */
  const PATROCINADORES = [
    { nome: "Motel Lua de Mel", cat: "Motel", ico: "🏩", cor: "#e11d74", desc: "Suítes temáticas com hidromassagem. Aberto 24h, entrada e saída discretas." },
    { nome: "Motel Status", cat: "Motel", ico: "🏩", cor: "#b5179e", desc: "Luxo e privacidade na saída para o aeroporto. Pacotes pernoite e período." },
    { nome: "Pub The Beer House", cat: "Bar & Pub", ico: "🍺", cor: "#f5b301", desc: "Chopp artesanal, sinuca e música ao vivo no centro de Chapecó." },
    { nome: "Prive Night Club", cat: "Casa noturna", ico: "🎉", cor: "#7209b7", desc: "Shows, pista e ambientes reservados. A melhor noite da região oeste." },
    { nome: "RedHot Sex Shop", cat: "Sex shop", ico: "🔥", cor: "#d62828", desc: "Produtos adultos e lingerie. Loja física e entrega discreta na região." },
    { nome: "Tabacaria Havana", cat: "Tabacaria", ico: "🚬", cor: "#9d6b53", desc: "Charutos, narguilé e destilados premium. Lounge para fumantes." },
    { nome: "Barbearia Don Vito", cat: "Barbearia", ico: "💈", cor: "#023e8a", desc: "Corte, barba e cerveja. Ambiente masculino, atendimento com hora marcada." },
    { nome: "Status Motor Show", cat: "Automotivo", ico: "🏎️", cor: "#3a0ca3", desc: "Som, insulfilm e acessórios. Patrocinador de eventos e encontros masculinos." },
  ];

  function renderPatrocinadores() {
    const c = document.getElementById("patrocGrid");
    if (!c) return;
    PATROCINADORES.forEach((p) => {
      const el = document.createElement("div");
      el.className = "sponsor";
      el.innerHTML = `
        <div class="sponsor-logo" style="background:linear-gradient(135deg, ${p.cor}, ${_shade(p.cor, -55)})">${p.ico}</div>
        <div class="sponsor-body">
          <div class="sponsor-cat">${p.cat}</div>
          <div class="sponsor-nome">${p.nome}</div>
          <div class="sponsor-desc">${p.desc}</div>
        </div>`;
      el.addEventListener("click", () =>
        alert(`${p.nome} — espaço de patrocinador (demonstração). Em um portal real abriria o site/contato do parceiro.`)
      );
      c.appendChild(el);
    });
    const btn = document.getElementById("btnPatrocinar");
    if (btn) btn.addEventListener("click", () =>
      alert("Anúncio de estabelecimento: nesta demonstração o cadastro de patrocinadores ainda não está implementado.")
    );
  }

  /* ---- Início ---- */
  iniciarAgeGate();
  popularCidades();
  renderPatrocinadores();
  render();
})();
