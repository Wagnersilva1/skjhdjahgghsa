// =====================================
// CONFIGURAÇÕES (sem segredos no front)
// =====================================
// Agora o front chama apenas endpoints do backend.
// Se você abrir via outro servidor (ex: Go Live 5500),
// ele usa automaticamente http://localhost:3000 para a API.
let API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') && location.port !== '3000'
  ? 'http://localhost:3000'
  : '';
if (location.hostname.endsWith('github.io')) {
  API_BASE = 'https://policia.discloud.app';
}
const WEBHOOK_ENDPOINT = `${API_BASE}/api/webhook`;
const API_OFICIAIS_URL = `${API_BASE}/api/oficiais`;

// =====================================
// BASE DE ARTIGOS
// =====================================
const ARTIGOS = [
  {
    grupo: "1.x • Crimes Contra a Vida",
    id: "vida",
    itens: [
      { cod: "1.1", nome: "Homicídio Doloso Qualificado", pena: 35, multa: 150000, fianca: 0 },
      { cod: "1.2", nome: "Homicídio Doloso", pena: 30, multa: 125000, fianca: 0 },
      { cod: "1.3", nome: "Tentativa de Homicídio", pena: 30, multa: 900000, fianca: 0 },
      { cod: "1.4", nome: "Homicídio Culposo", pena: 20, multa: 100000, fianca: 0 },
    ]
  },
  {
    grupo: "2.x • Crimes Contra Direitos Fundamentais",
    id: "fund",
    itens: [
      { cod: "2.1", nome: "Lesão Corporal", pena: 10, multa: 15000, fianca: 0 },
      { cod: "2.2", nome: "Sequestro", pena: 50, multa: 100000, fianca: 0 },
      { cod: "2.3", nome: "Cárcere Privado", pena: 15, multa: 50000, fianca: 0 },
    ]
  },
  {
    grupo: "3.x • Crimes Contra o Patrimônio",
    id: "patrim",
    itens: [
      { cod: "3.1", nome: "Desmanche de Veículos", pena: 35, multa: 70000, fianca: 0 },
      { cod: "3.2", nome: "Furto", pena: 20, multa: 60000, fianca: 0 },
      { cod: "3.3", nome: "Receptação de Veículos", pena: 15, multa: 50000, fianca: 0 },
      { cod: "3.4", nome: "Roubo de Veículos", pena: 25, multa: 70000, fianca: 0 },
      { cod: "3.5", nome: "Furto de Veículos", pena: 25, multa: 40000, fianca: 0 },
    ]
  },
  {
    grupo: "4.x • Crimes de Roubos, Furtos e seus Variantes",
    id: "roubos",
    itens: [
      { cod: "4.1", nome: "Roubo", pena: 10, multa: 100000, fianca: 0 },
      { cod: "4.2", nome: "Furto a Caixa Eletrônico", pena: 15, multa: 55000, fianca: 0 },
      { cod: "4.3", nome: "Extorsão", pena: 25, multa: 45000, fianca: 0 },
    ]
  },
  {
    grupo: "5.x • Crimes de Porte, Posse e Tráfico",
    id: "porte",
    itens: [
      { cod: "5.1", nome: "Posse de Peças de Armas", pena: 10, multa: 120000, fianca: 0 },
      { cod: "5.2", nome: "Posse de Capsulas", pena: 35, multa: 120000, fianca: 0 },
      { cod: "5.3", nome: "Tráfico de Armas", pena: 60, multa: 200000, fianca: 0 },
      { cod: "5.4", nome: "Porte de Arma Pesada", pena: 20, multa: 150000, fianca: 0 },
      { cod: "5.5", nome: "Porte de Arma Leve", pena: 15, multa: 100000, fianca: 0 },
      { cod: "5.6", nome: "Disparo de Arma de Fogo", pena: 5, multa: 50000, fianca: 0 },
      { cod: "5.7", nome: "Tráfico de Munições (+100)", pena: 60, multa: 150000, fianca: 0 },
      { cod: "5.8", nome: "Posse de Munição (-100)", pena: 15, multa: 50000, fianca: 0 },
      { cod: "5.9", nome: "Posse de Colete", pena: 20, multa: 60000, fianca: 0 },
      { cod: "5.10", nome: "Porte de Arma Branca", pena: 0, multa: 12500, fianca: 0 },
      { cod: "5.11", nome: "Tráfico de Drogas (+100)", pena: 35, multa: 150000, fianca: 0 },
      { cod: "5.12", nome: "Aviãozinho (6 a 100)", pena: 20, multa: 75000, fianca: 0 },
      { cod: "5.13", nome: "Posse de Componentes Narcóticos", pena: 10, multa: 30000, fianca: 0 },
      { cod: "5.14", nome: "Posse de Drogas (1 a 5)", pena: 0, multa: 6000, fianca: 0 },
      { cod: "5.15", nome: "Dinheiro Sujo", pena: 25, multa: 500, fianca: 0 },
      { cod: "5.16", nome: "Contrabando", pena: 30, multa: 200000, fianca: 0 },
      { cod: "5.17", nome: "Descaminho", pena: 15, multa: 100000, fianca: 0 },
    ]
  },
  {
    grupo: "5.y • Quebra de Regras",
    id: "quebra",
    itens: [
      { cod: "CL", nome: "CL - Combat Logging", pena: 180, multa: 100000, fianca: 0 },
    ]
  },
  {
    grupo: "6.x • Crimes Contra a Ordem Pública",
    id: "ordem",
    itens: [
      { cod: "6.1", nome: "Falsidade Ideológica", pena: 25, multa: 125000, fianca: 0 },
      { cod: "6.2", nome: "Formação de quadrilha", pena: 20, multa: 150000, fianca: 0 },
      { cod: "6.3", nome: "Apologia ao Crime", pena: 10, multa: 100000, fianca: 0 },
      { cod: "6.4", nome: "Posse de Arma em Público", pena: 10, multa: 15000, fianca: 0 },
      { cod: "6.5", nome: "Suborno", pena: 20, multa: 30000, fianca: 0 },
      { cod: "6.6", nome: "Ameaça", pena: 5, multa: 15000, fianca: 0 },
      { cod: "6.7", nome: "Falsa Comunicação de Crime", pena: 10, multa: 50000, fianca: 0 },
      { cod: "6.8", nome: "Uso indevido de 190/192", pena: 10, multa: 30000, fianca: 0 },
      { cod: "6.10", nome: "Posse de itens ilegais", pena: 10, multa: 10000, fianca: 0 },
      { cod: "6.11", nome: "Assédio Moral", pena: 10, multa: 15000, fianca: 0 },
      { cod: "6.12", nome: "Atentado ao Pudor", pena: 10, multa: 15000, fianca: 0 },
      { cod: "6.13", nome: "Vandalismo", pena: 10, multa: 16000, fianca: 0 },
      { cod: "6.14", nome: "Dano ao Patrimonio Público", pena: 15, multa: 100000, fianca: 0 },
      { cod: "6.15", nome: "Invasão de Propriedade", pena: 15, multa: 20000, fianca: 0 },
      { cod: "6.16", nome: "Abuso de Autoridade", pena: 20, multa: 50000, fianca: 0 },
      { cod: "6.17", nome: "Uso de Máscara", pena: 10, multa: 50000, fianca: 0 },
      { cod: "6.18", nome: "Uso de Equipamentos Restritos", pena: 10, multa: 20000, fianca: 0 },
      { cod: "6.19", nome: "Omissão de Socorro", pena: 15, multa: 30000, fianca: 0 },
      { cod: "6.20", nome: "Tentativa de Fuga", pena: 15, multa: 50000, fianca: 0 },
      { cod: "6.21", nome: "Desacato 01", pena: 20, multa: 70000, fianca: 0 },
      { cod: "6.22", nome: "Desacato 02", pena: 20, multa: 70000, fianca: 0 },
      { cod: "6.23", nome: "Desacato 03", pena: 20, multa: 70000, fianca: 0 },
      { cod: "6.24", nome: "Resistência a Prisão", pena: 10, multa: 50000, fianca: 0 },
      { cod: "6.25", nome: "Réu Reincidente", pena: 5, multa: 50000, fianca: 0 },
      { cod: "6.26", nome: "Cúmplice", pena: 0, multa: 10000, fianca: 0 },
      { cod: "6.27", nome: "Obstrução de Justiça", pena: 20, multa: 50000, fianca: 0 },
      { cod: "6.28", nome: "Ocultação de Provas", pena: 10, multa: 50000, fianca: 0 },
      { cod: "6.29", nome: "Zaralho em recrutamento policial", pena: 100, multa: 100000, fianca: 0 },
      { cod: "6.30", nome: "Prisão Militar", pena: 35, multa: 100000, fianca: 0 },
      { cod: "6.31", nome: "Prevaricação", pena: 35, multa: 100000, fianca: 0 },
      { cod: "6.32", nome: "Invasão de Departamento Policial", pena: 100, multa: 100000, fianca: 0 },
      { cod: "6.33", nome: "Vadiagem", pena: 10, multa: 50000, fianca: 0 },
      { cod: "6.34", nome: "Desobediência", pena: 20, multa: 50000, fianca: 0 },
    ]
  },
  {
    grupo: "7.x • Crimes de Trânsito",
    id: "transito",
    itens: [
      { cod: "7.1", nome: "Condução Imprudente", pena: 10, multa: 30000, fianca: 0 },
      { cod: "7.2", nome: "Dirigir na Contra Mão", pena: 0, multa: 30000, fianca: 0 },
      { cod: "7.3", nome: "Alta Velocidade", pena: 0, multa: 50000, fianca: 0 },
      { cod: "7.4", nome: "Poluição Sonora", pena: 0, multa: 50000, fianca: 0 },
      { cod: "7.5", nome: "Corridas Ilegais", pena: 0, multa: 50000, fianca: 0 },
      { cod: "7.6", nome: "Uso Excessivo de Insufilm", pena: 0, multa: 25000, fianca: 0 },
      { cod: "7.7", nome: "Veículo Muito Danificado", pena: 0, multa: 25000, fianca: 0 },
      { cod: "7.8", nome: "Veículo Ilegalmente Estacionado", pena: 0, multa: 30000, fianca: 0 },
      { cod: "7.11", nome: "Impedir o Fluxo do Tráfego", pena: 0, multa: 25000, fianca: 0 },
      { cod: "7.12", nome: "Colisão Proposital em viatura policial", pena: 15, multa: 20000, fianca: 0 },
    ]
  }
];

// =====================================
// ELEMENTOS DO DOM
// =====================================
const tabs = document.getElementById("tabs");
const crimeList = document.getElementById("crime-list");
const selectedBox = document.getElementById("selected");
const atenuantes = document.querySelectorAll(".atenuante");
const btnExportar = document.getElementById("btn-exportar");
const btnLimpar = document.getElementById("btn-limpar");
const btnTestar = document.getElementById("btn-testar");
const btnAtualizarOficiais = document.getElementById("btn-atualizar-oficiais");
const statusEnvio = document.getElementById("status-envio");

let tabAtiva = ARTIGOS[0].id;
let selecionados = new Map();
let oficiaisCache = []; // vem da API e tem { id, nome }

// =====================================
// MONTAR TABS
// =====================================
ARTIGOS.forEach((g, idx) => {
  const btn = document.createElement("button");
  btn.className = "tab" + (idx === 0 ? " active" : "");
  btn.textContent = g.grupo;
  btn.dataset.id = g.id;
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    tabAtiva = g.id;
    renderCrimes(document.getElementById("busca-artigo").value);
  });
  tabs.appendChild(btn);
});

// =====================================
// RENDER CRIMES
// =====================================
function renderCrimes(filtro = "") {
  crimeList.innerHTML = "";
  const grupo = ARTIGOS.find(g => g.id === tabAtiva);
  if (!grupo) return;

  grupo.itens
    .filter(item => {
      if (!filtro) return true;
      const t = filtro.toLowerCase();
      return item.cod.toLowerCase().includes(t) || item.nome.toLowerCase().includes(t);
    })
    .forEach(item => {
      const div = document.createElement("div");
      div.className = "crime-item";
      if (selecionados.has(item.cod)) {
        div.style.background = "rgba(56,189,248,0.15)";
        div.style.borderColor = "rgba(56,189,248,0.25)";
      }
      div.innerHTML = `
        <strong>Art. ${item.cod}</strong>
        ${item.nome}
        <div class="crime-meta">${item.pena}m • $${item.multa.toLocaleString('pt-BR')} ${item.fianca ? "• Fiança $" + item.fianca.toLocaleString('pt-BR') : ""}</div>
      `;
      div.addEventListener("click", () => {
        if (selecionados.has(item.cod)) {
          selecionados.delete(item.cod);
        } else {
          selecionados.set(item.cod, item);
        }
        renderSelecionados();
        calc();
        renderCrimes(document.getElementById("busca-artigo").value);
      });
      crimeList.appendChild(div);
    });
}

// =====================================
// RENDER SELECIONADOS
// =====================================
function renderSelecionados() {
  selectedBox.innerHTML = "";
  selecionados.forEach(item => {
    const b = document.createElement("div");
    b.className = "badge";
    b.innerHTML = `Art. ${item.cod} <button data-cod="${item.cod}">×</button>`;
    b.querySelector("button").addEventListener("click", () => {
      selecionados.delete(item.cod);
      renderSelecionados();
      calc();
      renderCrimes(document.getElementById("busca-artigo").value);
    });
    selectedBox.appendChild(b);
  });
  const cont = document.getElementById("cont-crimes");
  if (cont) cont.textContent = selecionados.size;
}

// =====================================
// CÁLCULO
// =====================================
function calc() {
  let pena = 0, multa = 0, fianca = 0;

  selecionados.forEach(item => {
    pena += item.pena;
    multa += item.multa;
    fianca += item.fianca;
  });

  // atenuantes
  let red = 0;
  atenuantes.forEach(a => {
    if (a.checked) red += Number(a.dataset.percent);
  });
  if (red > 50) red = 50;

  let penaFinal = Math.round(pena - pena * (red / 100));

  if (penaFinal > 180) {
    penaFinal = 180;
  }

  const penaTotalEl   = document.getElementById("pena-total");
  const multaTotalEl  = document.getElementById("multa-total");
  const fiancaTotalEl = document.getElementById("fianca-total");
  const penaMiniEl    = document.getElementById("pena-mini");

  if (penaTotalEl)   penaTotalEl.textContent   = penaFinal;
  if (multaTotalEl)  multaTotalEl.textContent  = multa.toLocaleString('pt-BR');
  if (fiancaTotalEl) fiancaTotalEl.textContent = fianca.toLocaleString('pt-BR');
  if (penaMiniEl)    penaMiniEl.textContent    = penaFinal + "m";
}

// =====================================
// BUSCA DE ARTIGOS
// =====================================
const buscaArtigo = document.getElementById("busca-artigo");
if (buscaArtigo) {
  buscaArtigo.addEventListener("input", e => {
    renderCrimes(e.target.value);
  });
}
atenuantes.forEach(a => a.addEventListener("change", calc));

// =====================================
// LIMPAR TUDO (painel esquerdo)
// =====================================
function limparTudo() {
  // limpa mapa de crimes
  selecionados.clear();

  // campos de texto
  const det = document.getElementById("detento_nome");
  const detId = document.getElementById("detento_id");
  const adv = document.getElementById("advogado");
  const itens = document.getElementById("itens");
  const dinheiro = document.getElementById("dinheiro");
  const obs = document.getElementById("observacoes");

  if (det) det.value = "";
  if (detId) detId.value = "";
  if (adv) adv.value = "";
  if (itens) itens.value = "";
  if (dinheiro) dinheiro.value = "";
  if (obs) obs.value = "";

  // selects de oficiais
  document.querySelectorAll(".oficial-select").forEach(sel => { sel.value = ""; });

  // atenuantes
  atenuantes.forEach(a => a.checked = false);

  // limpa UI
  renderSelecionados();
  calc();
  renderCrimes(document.getElementById("busca-artigo") ? document.getElementById("busca-artigo").value : "");
}

if (btnLimpar) {
  btnLimpar.addEventListener("click", limparTudo);
}

// =====================================
// MONTAR EMBED
// =====================================
function montarEmbed() {
  const detento = (document.getElementById("detento_nome")?.value) || "Não informado";
  const detentoId = (document.getElementById("detento_id")?.value) || "—";
  const adv = (document.getElementById("advogado")?.value) || "Sem advogado";
  const itens = (document.getElementById("itens")?.value) || "Nenhum item";
  const dinheiro = (document.getElementById("dinheiro")?.value) || "0";
  const obs = (document.getElementById("observacoes")?.value) || "Sem observações.";

  // oficiais selecionados
  const oficiaisSel = [];
  document.querySelectorAll(".oficial-select").forEach(sel => {
    const valorSelecionado = sel.value;
    if (valorSelecionado) {
      const match = oficiaisCache.find(o => o.nome === valorSelecionado);
      if (match) {
        oficiaisSel.push(`<@${match.id}>`);
      } else {
        oficiaisSel.push(valorSelecionado);
      }
    }
  });
  const oficiaisStr = oficiaisSel.length ? oficiaisSel.join(", ") : "Não informado";

  // crimes
  const crimesLines = [];
  selecionados.forEach(item => {
    crimesLines.push(
      `• **Art. ${item.cod}** – ${item.nome} \`${item.pena}m\` $${item.multa.toLocaleString('pt-BR')}${item.fianca ? " / fiança $" + item.fianca.toLocaleString('pt-BR') : ""}`
    );
  });

  return {
    username: "CPX - Calculadora Penal",
    embeds: [
      {
        title: "📑 Novo relatório de ocorrência",
        description: obs,
        color: 0x26a8f5,
        fields: [
          {
            name: "👤 Detento",
            value: `**Nome:** ${detento}\n**ID:** ${detentoId}\n**Adv.:** ${adv}`,
            inline: false
          },
          {
            name: "👮 Oficiais presentes",
            value: oficiaisStr,
            inline: false
          },
          {
            name: "📦 Itens / Dinheiro",
            value: `**Itens:** ${itens}\n**Dinheiro sujo:** $${Number(dinheiro).toLocaleString('pt-BR')}`,
            inline: false
          },
          {
            name: `⚖️ Crimes (${crimesLines.length})`,
            value: crimesLines.length ? crimesLines.join("\n") : "Nenhum crime selecionado.",
            inline: false
          },
          {
            name: "📊 Totais",
            value: `**Pena:** ${document.getElementById("pena-total").textContent} meses\n**Multa:** $${document.getElementById("multa-total").textContent}\n**Fiança:** $${document.getElementById("fianca-total").textContent}`,
            inline: false
          }
        ],
        footer: {
          text: "Complexo RJ • painel penal"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };
}

// =====================================
// ENVIAR PARA DISCORD (com validação e limpeza)
// =====================================
if (btnExportar) {
  btnExportar.addEventListener("click", async () => {
    const detentoNome = document.getElementById("detento_nome")?.value.trim();
    const detentoId   = document.getElementById("detento_id")?.value.trim();

    // 🔒 validação 1: nome e id do detento
    if (!detentoNome || !detentoId) {
      statusEnvio.style.display = "inline-flex";
      statusEnvio.textContent = "⚠ Preencha o nome do detento e o ID antes de enviar.";
      statusEnvio.style.background = "rgba(248, 113, 113, .12)";
      statusEnvio.style.borderColor = "rgba(248, 113, 113, .4)";
      statusEnvio.style.color = "#fee2e2";
      setTimeout(() => { statusEnvio.style.display = "none"; }, 4000);
      return;
    }

    // 🔒 validação 2: pelo menos 1 oficial selecionado
    const temOficialSelecionado = Array.from(document.querySelectorAll(".oficial-select"))
      .some(sel => (sel.value || "").trim() !== "");

    if (!temOficialSelecionado) {
      statusEnvio.style.display = "inline-flex";
      statusEnvio.textContent = "⚠ Selecione ao menos 1 oficial antes de enviar.";
      statusEnvio.style.background = "rgba(248, 113, 113, .12)";
      statusEnvio.style.borderColor = "rgba(248, 113, 113, .4)";
      statusEnvio.style.color = "#fee2e2";
      setTimeout(() => { statusEnvio.style.display = "none"; }, 4000);
      return;
    }

    const payload = montarEmbed();

    // status inicial
    statusEnvio.style.display = "inline-flex";
    statusEnvio.textContent = "⏳ enviando...";
    statusEnvio.style.background = "rgba(59,130,246,.12)";
    statusEnvio.style.borderColor = "rgba(59,130,246,.4)";
    statusEnvio.style.color = "#dbeafe";

    try {
      const res = await fetch(WEBHOOK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        statusEnvio.textContent = "✔ enviado com sucesso";
        statusEnvio.style.background = "rgba(34,197,94,.12)";
        statusEnvio.style.borderColor = "rgba(34,197,94,.4)";
        statusEnvio.style.color = "#bbf7d0";
        limparTudo(); // 🧹 limpa tudo depois do envio
      } else {
        console.error(await res.text());
        statusEnvio.textContent = "⚠ erro ao enviar";
        statusEnvio.style.background = "rgba(248,113,113,.12)";
        statusEnvio.style.borderColor = "rgba(248,113,113,.4)";
        statusEnvio.style.color = "#fee2e2";
      }
    } catch (err) {
      console.error(err);
      statusEnvio.textContent = "⚠ erro de conexão";
      statusEnvio.style.background = "rgba(248,113,113,.12)";
      statusEnvio.style.borderColor = "rgba(248,113,113,.4)";
      statusEnvio.style.color = "#fee2e2";
    }

    setTimeout(() => {
      statusEnvio.style.display = "none";
    }, 5000);
  });
}


// =====================================
// DATA NO TOPO
// =====================================
const hoje = new Date();
const hojeEl = document.getElementById("hoje");
if (hojeEl) {
  hojeEl.textContent = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// =====================================
// SELECT COM PESQUISA
// =====================================
function makeSelectSearchable(selectEl) {
  const options = Array.from(selectEl.options);

  const wrapper = document.createElement('div');
  wrapper.className = 'searchable-select';

  const display = document.createElement('div');
  display.className = 'searchable-display';
  const displayText = document.createElement('span');
  displayText.textContent = selectEl.value
    ? selectEl.selectedOptions[0].textContent
    : (options[0] ? options[0].textContent : 'Selecione...');
  const arrow = document.createElement('span');
  arrow.className = 'searchable-arrow';
  arrow.textContent = '▾';
  display.appendChild(displayText);
  display.appendChild(arrow);

  const dropdown = document.createElement('div');
  dropdown.className = 'searchable-dropdown';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'searchable-input';
  input.placeholder = 'Digite para filtrar...';

  const list = document.createElement('div');
  list.className = 'searchable-options';

  options.forEach(opt => {
    const item = document.createElement('div');
    item.className = 'searchable-option';
    item.textContent = opt.textContent;
    item.dataset.value = opt.value;

    item.addEventListener('click', () => {
      displayText.textContent = opt.textContent;
      selectEl.value = opt.value;
      dropdown.classList.remove('open');
    });

    list.appendChild(item);
  });

  dropdown.appendChild(input);
  dropdown.appendChild(list);

  wrapper.appendChild(display);
  wrapper.appendChild(dropdown);

  selectEl.parentNode.insertBefore(wrapper, selectEl);

  display.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    input.value = '';
    list.querySelectorAll('.searchable-option').forEach(it => it.classList.remove('hidden'));
    input.focus();
  });

  input.addEventListener('input', () => {
    const term = input.value.toLowerCase();
    list.querySelectorAll('.searchable-option').forEach(it => {
      const text = it.textContent.toLowerCase();
      if (text.includes(term) || it.dataset.value === '') {
        it.classList.remove('hidden');
      } else {
        it.classList.add('hidden');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  selectEl.style.display = 'none';
}

// =====================================
// BUSCAR OFICIAIS DA API
// =====================================
async function carregarOficiais() {
  try {
    const res = await fetch(API_OFICIAIS_URL);
    if (!res.ok) {
      console.warn("API de oficiais não respondeu:", res.status);
      return;
    }
    const data = await res.json();
    if (!data || !Array.isArray(data.oficiais)) {
      console.warn("Formato da API de oficiais diferente do esperado.");
      return;
    }
    oficiaisCache = data.oficiais;
    preencherSelectsOficiais();
  } catch (e) {
    console.warn("Erro ao buscar oficiais:", e);
  }
}

function preencherSelectsOficiais() {
  const selects = document.querySelectorAll(".oficial-select");

  selects.forEach(sel => {
    const prev = sel.previousElementSibling;
    if (prev && prev.classList && prev.classList.contains('searchable-select')) {
      prev.remove();
    }

    const current = sel.value;
    sel.innerHTML = `<option value="">Selecione...</option>`;

    oficiaisCache.forEach(o => {
      const opt = document.createElement("option");
      opt.value = o.nome;
      opt.textContent = o.nome;
      sel.appendChild(opt);
    });

    if (current) sel.value = current;

    makeSelectSearchable(sel);
  });
}

if (btnAtualizarOficiais) {
  btnAtualizarOficiais.addEventListener("click", carregarOficiais);
}

// =====================================
// INIT
// =====================================
renderCrimes();
calc();
carregarOficiais();

if (btnTestar) {
  btnTestar.addEventListener("click", () => {
    const payload = montarEmbed();
    console.log("PAYLOAD QUE VAI PRO DISCORD:", payload);
    alert("Veja o console do navegador (F12) para ver o payload.");
  });
}

// =====================================
// (sem fallback para hospedagem estatica; requer backend)
