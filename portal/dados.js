/*
  Dados fictícios de exemplo para o portal (demonstração de layout).
  Nenhuma pessoa real. Todos os anúncios são inventados apenas para
  demonstrar a estrutura de um portal de classificados.

  Para adicionar/editar um anúncio, basta copiar um objeto abaixo.
  Campos:
    id       -> identificador único (usado na URL do perfil)
    nome     -> nome de exibição
    idade    -> idade (sempre >= 18)
    cidade   -> cidade do anúncio
    estado   -> UF
    categoria-> "mulheres" | "homens" | "trans"
    valor    -> valor de referência (número, em R$)
    destaque -> true para aparecer com selo "Destaque"
    verificado-> true para o selo de "Verificado"
    descricao-> texto livre do anúncio
    servicos -> lista de tags exibidas no perfil
    cor      -> cor base usada no avatar gerado (hex)
*/
window.ANUNCIOS = [
  {
    id: "ana-chapeco",
    nome: "Ana Beatriz",
    idade: 24,
    cidade: "Chapecó",
    estado: "SC",
    categoria: "mulheres",
    valor: 250,
    destaque: true,
    verificado: true,
    descricao:
      "Acompanhante independente na região oeste de SC. Atendimento com hora marcada, ambiente próprio, discreto e climatizado.",
    servicos: ["Local próprio", "Hora marcada", "Aceita cartão", "Discreta"],
    cor: "#e11d74",
  },
  {
    id: "marina-floripa",
    nome: "Marina Souza",
    idade: 27,
    cidade: "Florianópolis",
    estado: "SC",
    categoria: "mulheres",
    valor: 400,
    destaque: true,
    verificado: true,
    descricao:
      "Atendimento premium na ilha. Jantares, eventos e acompanhamento para viagens. Agende com antecedência.",
    servicos: ["Viagens", "Eventos", "Jantar", "Aceita cartão"],
    cor: "#b5179e",
  },
  {
    id: "julia-poa",
    nome: "Júlia Martins",
    idade: 22,
    cidade: "Porto Alegre",
    estado: "RS",
    categoria: "mulheres",
    valor: 200,
    destaque: false,
    verificado: false,
    descricao:
      "Novata na cidade, atendimento carinhoso e sem pressa. Local próprio no centro.",
    servicos: ["Local próprio", "Novata", "Sem pressa"],
    cor: "#7209b7",
  },
  {
    id: "carla-curitiba",
    nome: "Carla Ribeiro",
    idade: 31,
    cidade: "Curitiba",
    estado: "PR",
    categoria: "mulheres",
    valor: 300,
    destaque: false,
    verificado: true,
    descricao:
      "Loira, atendimento exclusivo com hora marcada. Ambiente reservado e higienizado.",
    servicos: ["Hora marcada", "Discreta", "Aceita Pix"],
    cor: "#f72585",
  },
  {
    id: "rafael-sp",
    nome: "Rafael Torres",
    idade: 29,
    cidade: "São Paulo",
    estado: "SP",
    categoria: "homens",
    valor: 350,
    destaque: true,
    verificado: true,
    descricao:
      "Acompanhante masculino para público feminino e casais. Discrição total e bom papo.",
    servicos: ["Casais", "Eventos", "Discreto", "Aceita cartão"],
    cor: "#3a0ca3",
  },
  {
    id: "bruno-poa",
    nome: "Bruno Almeida",
    idade: 26,
    cidade: "Porto Alegre",
    estado: "RS",
    categoria: "homens",
    valor: 220,
    destaque: false,
    verificado: false,
    descricao:
      "Atendimento personalizado, academia em dia. Atendo em local próprio ou motel.",
    servicos: ["Local próprio", "Motel", "Sem pressa"],
    cor: "#4361ee",
  },
  {
    id: "isabela-sp",
    nome: "Isabela Nunes",
    idade: 25,
    cidade: "São Paulo",
    estado: "SP",
    categoria: "trans",
    valor: 320,
    destaque: true,
    verificado: true,
    descricao:
      "Trans, atendimento completo e sem preconceito. Local próprio na zona sul, fácil acesso.",
    servicos: ["Local próprio", "Discreta", "Aceita cartão", "Verificada"],
    cor: "#f77f00",
  },
  {
    id: "leticia-floripa",
    nome: "Letícia Prado",
    idade: 23,
    cidade: "Florianópolis",
    estado: "SC",
    categoria: "trans",
    valor: 280,
    destaque: false,
    verificado: true,
    descricao:
      "Trans morena, atendimento carinhoso e discreto. Hora marcada, sem pressa.",
    servicos: ["Hora marcada", "Sem pressa", "Discreta"],
    cor: "#d62828",
  },
  {
    id: "fernanda-chapeco",
    nome: "Fernanda Lopes",
    idade: 28,
    cidade: "Chapecó",
    estado: "SC",
    categoria: "mulheres",
    valor: 180,
    destaque: false,
    verificado: false,
    descricao:
      "Atendimento simples e acolhedor no oeste catarinense. Local próprio, ambiente familiar e discreto.",
    servicos: ["Local próprio", "Discreta"],
    cor: "#e11d74",
  },
  {
    id: "amanda-curitiba",
    nome: "Amanda Rocha",
    idade: 30,
    cidade: "Curitiba",
    estado: "PR",
    categoria: "mulheres",
    valor: 450,
    destaque: true,
    verificado: true,
    descricao:
      "Modelo, atendimento de luxo para clientes exigentes. Somente com agendamento e referência.",
    servicos: ["Luxo", "Viagens", "Eventos", "Aceita cartão"],
    cor: "#9d0208",
  },
  {
    id: "diego-sp",
    nome: "Diego Fernandes",
    idade: 33,
    cidade: "São Paulo",
    estado: "SP",
    categoria: "homens",
    valor: 400,
    destaque: false,
    verificado: true,
    descricao:
      "Acompanhante para eventos sociais, jantares e viagens. Elegante e discreto.",
    servicos: ["Eventos", "Jantar", "Viagens", "Discreto"],
    cor: "#023e8a",
  },
  {
    id: "sabrina-poa",
    nome: "Sabrina Dias",
    idade: 21,
    cidade: "Porto Alegre",
    estado: "RS",
    categoria: "trans",
    valor: 240,
    destaque: false,
    verificado: false,
    descricao:
      "Trans jovem, atendimento animado e sem pressa. Local próprio no centro.",
    servicos: ["Local próprio", "Novata", "Sem pressa"],
    cor: "#c9184a",
  },
];
