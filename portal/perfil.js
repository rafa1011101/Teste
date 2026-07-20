/* Renderiza a página de um anúncio a partir do parâmetro ?id= da URL. */

(function () {
  iniciarAgeGate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const anuncio = ANUNCIOS.find((a) => a.id === id);
  const alvo = document.getElementById("perfil");

  if (!anuncio) {
    alvo.innerHTML =
      '<div class="vazio">Anúncio não encontrado. <a href="index.html" style="color:var(--pink-2)">Voltar</a></div>';
    return;
  }

  document.title = `${anuncio.nome} — RedModel 18+`;

  const badges = [];
  if (anuncio.destaque) badges.push('<span class="badge badge-destaque">★ Destaque</span>');
  if (anuncio.verificado) badges.push('<span class="badge badge-verificado">✓ Verificado</span>');

  alvo.innerHTML = `
    <div class="perfil">
      <div>
        <div class="perfil-foto" style="background:${anuncio.cor}">
          <div class="card-badges">${badges.join("")}</div>
          <span>${iniciais(anuncio.nome)}</span>
        </div>
      </div>
      <div>
        <h1>${anuncio.nome}, ${anuncio.idade}
          ${anuncio.verificado ? '<span class="v">✓ Verificado</span>' : ""}
        </h1>
        <div class="local">📍 ${anuncio.cidade}/${anuncio.estado} ·
          ${ROTULO_CATEGORIA[anuncio.categoria]}</div>
        <div class="valor">${formatarValor(anuncio.valor)}
          <span style="font-size:.9rem;color:var(--txt-mut);font-weight:400"> / referência</span>
        </div>
        <div class="tags">
          ${anuncio.servicos.map((s) => `<span>${s}</span>`).join("")}
        </div>
        <p class="desc">${anuncio.descricao}</p>
        <div class="contato">
          <button class="btn-wpp" id="btnWpp">💬 WhatsApp</button>
          <button class="btn-tel" id="btnTel">📞 Ver telefone</button>
        </div>
        <div class="disclaimer">
          ⚠️ Este é um anúncio fictício de demonstração. Nenhum contato real está
          associado a ele. Em um portal real, o anunciante deve comprovar ser maior
          de 18 anos e é responsável pelo conteúdo publicado.
        </div>
      </div>
    </div>`;

  // Fundo em degradê por cima da cor base.
  const foto = alvo.querySelector(".perfil-foto");
  foto.style.backgroundImage = avatarBg(anuncio.cor);
  foto.style.backgroundSize = "cover";

  document.getElementById("btnWpp").addEventListener("click", () =>
    alert("Demonstração: em um portal real, abriria a conversa no WhatsApp do anunciante.")
  );
  document.getElementById("btnTel").addEventListener("click", () =>
    alert("Demonstração: telefone fictício (49) 90000-0000.")
  );
})();
