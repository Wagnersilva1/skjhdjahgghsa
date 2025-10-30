// ========= CONFIG =========
const WEBHOOK_URL = "https://discord.com/api/webhooks/1433568277623210014/rPLafa5ZkMvp0mvRTWk0qzv5JHa0r8YgxkVL7GJGjmcxfisoeVFWxNsU8TPoiB9EdJMw";

// endpoint da API do teu bot (ajusta aqui)
const API_OFICIAIS_URL = "https://policia.discloud.app/api/oficiais";

// ========= BASE DE ARTIGOS =========
const ARTIGOS = [
  {
    grupo: "1.x • Crimes Contra a Vida",
    id: "vida",
    itens: [
      {cod:"1.1", nome:"Homicídio Doloso Qualificado", pena:0, multa:0, fianca:0},
      {cod:"1.2", nome:"Homicídio Doloso", pena:0, multa:0, fianca:0},
      {cod:"1.3", nome:"Tentativa de Homicídio", pena:0, multa:0, fianca:0},
      {cod:"1.4", nome:"Homicídio Culposo", pena:0, multa:0, fianca:0},
    ]
  },
  {
    grupo: "2.x • Crimes Contra Direitos Fundamentais",
    id: "direitos",
    itens: [
      {cod:"2.1", nome:"Lesão Corporal", pena:0, multa:0, fianca:0},
      {cod:"2.2", nome:"Sequestro", pena:0, multa:0, fianca:0},
      {cod:"2.3", nome:"Cárcere Privado", pena:0, multa:0, fianca:0},
    ]
  },
  {
    grupo: "3.x • Crimes Contra o Patrimônio",
    id: "patrimonio",
    itens: [
      {cod:"3.1", nome:"Desmanche de Veículos", pena:0, multa:0, fianca:0},
      {cod:"3.2", nome:"Furto", pena:0, multa:0, fianca:0},
      {cod:"3.3", nome:"Receptação de Veículos", pena:0, multa:0, fianca:0},
      {cod:"3.4", nome:"Roubo de Veículos", pena:0, multa:0, fianca:0},
      {cod:"3.5", nome:"Furto de Veículos", pena:0, multa:0, fianca:0},
    ]
  },
  {
    grupo: "4.x • Crimes de Roubos, Furtos e seus Variantes",
    id: "roubos",
    itens: [
      {cod:"4.1", nome:"Roubo", pena:0, multa:0, fianca:0},
      {cod:"4.2", nome:"Furto a caixa eletrônico", pena:0, multa:0, fianca:0},
      {cod:"4.3", nome:"Extorsão", pena:0, multa:0, fianca:0},
    ]
  },
  {
    grupo: "5.x • Crimes de Porte, Posse e Tráfico",
    id: "porte",
    itens: [
      {cod:"5.1", nome:"Posse de peças de armas", pena:0, multa:0, fianca:0},
      {cod:"5.2", nome:"Posse de Cápsula", pena:0, multa:0, fianca:0},
      {cod:"5.3", nome:"Tráfico de Armas", pena:0, multa:0, fianca:0},
      {cod:"5.4", nome:"Porte de Arma Pesada", pena:0, multa:0, fianca:0},
      {cod:"5.5", nome:"Porte de Arma Leve", pena:0, multa:0, fianca:0},
      {cod:"5.6", nome:"Disparo de Arma", pena:0, multa:0, fianca:0},
      {cod:"5.7", nome:"Tráfico de Munições (+100)", pena:0, multa:0, fianca:0},
      {cod:"5.8", nome:"Porte de Munição (-100)", pena:0, multa:0, fianca:0},
      {cod:"5.9", nome:"Posse de Colete", pena:0, multa:0, fianca:0},
      {cod:"5.10", nome:"Posse de Arma Branca", pena:0, multa:0, fianca:0},
      {cod:"5.11", nome:"Tráfico de drogas (+100)", pena:0, multa:0, fianca:0},
      {cod:"5.12", nome:"Aviãozinho (6 a 100)", pena:0, multa:0, fianca:0},
      {cod:"5.13", nome:"Posse de Componentes Narcóticos", pena:0, multa:0, fianca:0},
      {cod:"5.14", nome:"Posse de drogas (1 a 5)", pena:0, multa:0, fianca:0},
      {cod:"5.15", nome:"Dinheiro sujo", pena:0, multa:0, fianca:0},
      {cod:"5.16", nome:"Contrabando", pena:0, multa:0, fianca:0},
      {cod:"5.17", nome:"Descaminho", pena:0, multa:0, fianca:0},
    ]
  },
  {
    grupo: "6.x • Crimes Contra a Ordem Pública",
    id: "ordem",
    itens: [
      {cod:"6.1", nome:"Falsidade ideológica", pena:0, multa:0, fianca:0},
      {cod:"6.2", nome:"Formação de quadrilha", pena:0, multa:0, fianca:0},
      {cod:"6.3", nome:"Apologia ao crime", pena:0, multa:0, fianca:0},
      {cod:"6.4", nome:"Posse de arma em público", pena:0, multa:0, fianca:0},
      {cod:"6.5", nome:"Suborno", pena:0, multa:0, fianca:0},
      {cod:"6.6", nome:"Ameaça", pena:0, multa:0, fianca:0},
      {cod:"6.7", nome:"Falsa comunicação de crime", pena:0, multa:0, fianca:0},
      {cod:"6.8", nome:"Uso indevido de 190/192", pena:0, multa:0, fianca:0},
      {cod:"6.10", nome:"Posse de itens ilegais", pena:0, multa:0, fianca:0},
      {cod:"6.11", nome:"Assédio moral", pena:0, multa:0, fianca:0},
      {cod:"6.12", nome:"Atentado ao pudor", pena:0, multa:0, fianca:0},
      {cod:"6.13", nome:"Vandalismo", pena:0, multa:0, fianca:0},
      {cod:"6.14", nome:"Dano ao Patrimônio Público", pena:0, multa:0, fianca:0},
      {cod:"6.15", nome:"Invasão de propriedade", pena:0, multa:0, fianca:0},
      {cod:"6.16", nome:"Abuso de autoridade", pena:0, multa:0, fianca:0},
      {cod:"6.17", nome:"Uso de máscara", pena:0, multa:0, fianca:0},
      {cod:"6.18", nome:"Uso de equipamentos restritos", pena:0, multa:0, fianca:0},
      {cod:"6.19", nome:"Omissão de socorro", pena:0, multa:0, fianca:0},
      {cod:"6.20", nome:"Tentativa de fuga", pena:0, multa:0, fianca:0},
      {cod:"6.21", nome:"Desacato 1", pena:0, multa:0, fianca:0},
      {cod:"6.22", nome:"Desacato 2", pena:0, multa:0, fianca:0},
      {cod:"6.23", nome:"Desacato 3", pena:0, multa:0, fianca:0},
      {cod:"6.24", nome:"Resistência à prisão", pena:0, multa:0, fianca:0},
      {cod:"6.25", nome:"Réu Reincidente", pena:0, multa:0, fianca:0},
      {cod:"6.26", nome:"Cúmplice", pena:0, multa:0, fianca:0},
      {cod:"6.27", nome:"Obstrução à Justiça", pena:0, multa:0, fianca:0},
      {cod:"6.28", nome:"Ocultação de Provas", pena:0, multa:0, fianca:0},
      {cod:"6.29", nome:"Zaralho em recrutamento policial", pena:0, multa:0, fianca:0},
      {cod:"6.30", nome:"Prisão Militar", pena:0, multa:0, fianca:0},
      {cod:"6.31", nome:"Prevaricação", pena:0, multa:0, fianca:0},
      {cod:"6.32", nome:"Invasão de Departamento Policial", pena:0, multa:0, fianca:0},
      {cod:"6.33", nome:"Vadiagem", pena:0, multa:0, fianca:0},
      {cod:"6.34", nome:"Desobediência", pena:0, multa:0, fianca:0},
    ]
  },
  {
    grupo: "7.x • Crimes de Trânsito",
    id: "transito",
    itens: [
      {cod:"7.1", nome:"Condução imprudente", pena:0, multa:0, fianca:0},
      {cod:"7.2", nome:"Dirigir na contra mão", pena:0, multa:0, fianca:0},
      {cod:"7.3", nome:"Alta velocidade", pena:0, multa:0, fianca:0},
      {cod:"7.4", nome:"Poluição sonora", pena:0, multa:0, fianca:0},
      {cod:"7.5", nome:"Corridas Ilegais", pena:0, multa:0, fianca:0},
      {cod:"7.6", nome:"Uso excessivo de insulfilm", pena:0, multa:0, fianca:0},
      {cod:"7.7", nome:"Veículo muito danificado", pena:0, multa:0, fianca:0},
      {cod:"7.8", nome:"Veículo Ilegalmente estacionado", pena:0, multa:0, fianca:0},
      {cod:"7.11", nome:"Impedir o fluxo do tráfego", pena:0, multa:0, fianca:0},
      {cod:"7.12", nome:"Colisão Proposital em viatura policial", pena:0, multa:0, fianca:0},
    ]
  }
];


// ========= ELEMENTOS =========
const tabs = document.getElementById("tabs");
const crimeList = document.getElementById("crime-list");
const selectedBox = document.getElementById("selected");
const atenuantes = document.querySelectorAll(".atenuante");
const btnExportar = document.getElementById("btn-exportar");
const btnLimpar = document.getElementById("btn-limpar");
const btnTestar = document.getElementById("btn-testar");
const btnAtualizarOficiais = document.getElementById("btn-atualizar-oficiais");

let tabAtiva = ARTIGOS[0].id;
let selecionados = new Map();
let oficiaisCache = [];

// montar tabs
ARTIGOS.forEach((g,idx)=>{
  const btn = document.createElement("button");
  btn.className = "tab" + (idx===0 ? " active":"");
  btn.textContent = g.grupo;
  btn.dataset.id = g.id;
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    btn.classList.add("active");
    tabAtiva = g.id;
    renderCrimes(document.getElementById("busca-artigo").value);
  });
  tabs.appendChild(btn);
});

// render crimes
function renderCrimes(filtro=""){
  crimeList.innerHTML = "";
  const grupo = ARTIGOS.find(g=>g.id===tabAtiva);
  if(!grupo) return;
  grupo.itens
    .filter(item=>{
      if(!filtro) return true;
      const t = filtro.toLowerCase();
      return item.cod.toLowerCase().includes(t) || item.nome.toLowerCase().includes(t);
    })
    .forEach(item=>{
      const div = document.createElement("div");
      div.className = "crime-item";
      if(selecionados.has(item.cod)){
        div.style.background = "rgba(56, 189, 248, 0.15)";
        div.style.borderColor = "rgba(56, 189, 248, 0.25)";
      }
      div.innerHTML = `
        <strong>Art. ${item.cod}</strong>
        ${item.nome}
        <div class="crime-meta">${item.pena}m • $${item.multa.toLocaleString('pt-BR')} ${item.fianca ? "• Fiança $" + item.fianca.toLocaleString('pt-BR') : ""}</div>
      `;
      div.addEventListener("click",()=>{
        if(selecionados.has(item.cod)){
          selecionados.delete(item.cod);
        } else {
          selecionados.set(item.cod,item);
        }
        renderSelecionados();
        calc();
        renderCrimes(document.getElementById("busca-artigo").value);
      });
      crimeList.appendChild(div);
    });
}

// render selecionados
function renderSelecionados(){
  selectedBox.innerHTML = "";
  selecionados.forEach(item=>{
    const b = document.createElement("div");
    b.className = "badge";
    b.innerHTML = `Art. ${item.cod} <button data-cod="${item.cod}">×</button>`;
    b.querySelector("button").addEventListener("click",()=>{
      selecionados.delete(item.cod);
      renderSelecionados();
      calc();
      renderCrimes(document.getElementById("busca-artigo").value);
    });
    selectedBox.appendChild(b);
  });
  document.getElementById("cont-crimes").textContent = selecionados.size;
}

// cálculo
// cálculo
function calc(){
  let pena = 0, multa = 0, fianca = 0;

  // soma normal
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

  // aplica redução.
  let penaFinal = Math.round(pena - pena * (red / 100));

  // 👇 LIMITE DE 180 MESES
  if (penaFinal > 180) {
    penaFinal = 180;
  }

  // atualiza na tela
  document.getElementById("pena-total").textContent = penaFinal;
  document.getElementById("multa-total").textContent = multa.toLocaleString('pt-BR');
  document.getElementById("fianca-total").textContent = fianca.toLocaleString('pt-BR');
  document.getElementById("pena-mini").textContent = penaFinal + "m";
}

// busca
document.getElementById("busca-artigo").addEventListener("input", e=>{
  renderCrimes(e.target.value);
});
atenuantes.forEach(a=>a.addEventListener("change",calc));

// limpar
function limparTudo(){
  selecionados.clear();
  document.getElementById("detento_nome").value = "";
  document.getElementById("detento_id").value = "";
  document.getElementById("advogado").value = "";
  document.getElementById("itens").value = "";
  document.getElementById("dinheiro").value = "";
  document.getElementById("observacoes").value = "";
  document.querySelectorAll(".oficial-select").forEach(sel=>sel.value="");
  atenuantes.forEach(a=>a.checked = false);
  renderSelecionados();
  calc();
  renderCrimes(document.getElementById("busca-artigo").value);
}
btnLimpar.addEventListener("click",limparTudo);

// montar embed
function montarEmbed(){
  const detento = document.getElementById("detento_nome").value || "Não informado";
  const detentoId = document.getElementById("detento_id").value || "—";
  const adv = document.getElementById("advogado").value || "Sem advogado";
  const itens = document.getElementById("itens").value || "Nenhum item";
  const dinheiro = document.getElementById("dinheiro").value || "0";
  const obs = document.getElementById("observacoes").value || "Sem observações.";

  // oficiais
  const oficiaisSel = [];
  document.querySelectorAll(".oficial-select").forEach(sel=>{
    if(sel.value) oficiaisSel.push(sel.value);
  });
  const oficiaisStr = oficiaisSel.length ? oficiaisSel.join(", ") : "Não informado";

  // crimes
  const crimesLines = [];
  selecionados.forEach(item=>{
    crimesLines.push(`• **Art. ${item.cod}** – ${item.nome} \`${item.pena}m\` $${item.multa.toLocaleString('pt-BR')}${item.fianca ? " / fiança $" + item.fianca.toLocaleString('pt-BR') : ""}`);
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

// enviar
btnExportar.addEventListener("click", async ()=>{
  const payload = montarEmbed();
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
    if(res.ok){
      alert("Relatório enviado para o Discord ✅");
    } else {
      console.error(await res.text());
      alert("Erro ao enviar para o Discord (veja console).");
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão (se for arquivo local, pode ser CORS).");
  }
});

// testar
btnTestar.addEventListener("click", ()=>{
  console.log("PAYLOAD:", JSON.stringify(montarEmbed(), null, 2));
  alert("Veja o console (F12) para ver o JSON.");
});

// carregar oficiais da API
async function carregarOficiais(){
  try {
    const res = await fetch(API_OFICIAIS_URL);
    if(!res.ok){
      console.warn("API de oficiais não respondeu:", res.status);
      return;
    }
    const data = await res.json();
    if(!data || !Array.isArray(data.oficiais)){
      console.warn("Formato da API de oficiais diferente do esperado.");
      return;
    }
    oficiaisCache = data.oficiais;
    preencherSelectsOficiais();
  } catch (e) {
    console.warn("Erro ao buscar oficiais:", e);
  }
}
function preencherSelectsOficiais(){
  const selects = document.querySelectorAll(".oficial-select");
  selects.forEach(sel=>{
    const current = sel.value;
    sel.innerHTML = `<option value="">Selecione...</option>`;
    oficiaisCache.forEach(o=>{
      const opt = document.createElement("option");
      opt.value = o.nome;
      opt.textContent = o.nome;
      sel.appendChild(opt);
    });
    if(current) sel.value = current;
  });
}
btnAtualizarOficiais.addEventListener("click", carregarOficiais);

// data
const hoje = new Date();
document.getElementById("hoje").textContent = hoje.toLocaleDateString("pt-BR", {
  day: "2-digit", month: "2-digit", year: "numeric"
});

// init
renderCrimes();
calc();
carregarOficiais();
