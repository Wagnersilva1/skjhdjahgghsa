// ========= CONFIG =========
const WEBHOOK_URL = "https://discord.com/api/webhooks/1433502177162432603/-vMmZyNtdJOurVR-ZoEUv6CIHWuY7gixHLStstKAakdEwYuNLPc-wpzkqG7eLigplLQ7";

// endpoint da API do teu bot (ajusta aqui)
const API_OFICIAIS_URL = "https://policia.discloud.app/api/oficiais";

// ========= BASE DE ARTIGOS =========
const ARTIGOS = [
  {
    grupo: "1.x • Vida",
    id: "vida",
    itens: [
      {cod:"1.1", nome:"Homicídio Doloso Qualificado", pena:80, multa:25000, fianca:0},
      {cod:"1.2", nome:"Homicídio Doloso", pena:60, multa:20000, fianca:0},
      {cod:"1.3", nome:"Tentativa de Homicídio", pena:40, multa:15000, fianca:0},
      {cod:"1.4", nome:"Homicídio Culposo", pena:25, multa:8000, fianca:0},
    ]
  },
  {
    grupo: "2.x • Direitos",
    id: "fund",
    itens: [
      {cod:"2.1", nome:"Lesão Corporal", pena:15, multa:5000, fianca:0},
      {cod:"2.2", nome:"Sequestro", pena:35, multa:12000, fianca:0},
      {cod:"2.3", nome:"Cárcere Privado", pena:30, multa:10000, fianca:0},
    ]
  },
  {
    grupo: "3.x • Patrimônio",
    id: "patrim",
    itens: [
      {cod:"3.1", nome:"Desmanche de Veículos", pena:20, multa:7000, fianca:0},
      {cod:"3.2", nome:"Furto", pena:15, multa:5000, fianca:0},
      {cod:"3.3", nome:"Receptação de Veículos", pena:20, multa:7000, fianca:0},
      {cod:"3.4", nome:"Roubo de Veículos", pena:25, multa:8000, fianca:0},
    ]
  },
  {
    grupo: "5.x • Porte/Tráfico",
    id: "porte",
    itens: [
      {cod:"5.1", nome:"Posse de peças de armas", pena:12, multa:4000, fianca:0},
      {cod:"5.3", nome:"Tráfico de Armas", pena:60, multa:15000, fianca:0},
      {cod:"5.4", nome:"Porte de Arma Pesada", pena:45, multa:14000, fianca:0},
      {cod:"5.5", nome:"Porte de Arma Leve", pena:20, multa:8000, fianca:0},
      {cod:"5.11", nome:"Tráfico de drogas (+100)", pena:25, multa:9000, fianca:0},
    ]
  },
  {
    grupo: "6.x • Ordem pública",
    id: "ordem",
    itens: [
      {cod:"6.1", nome:"Falsidade ideológica", pena:10, multa:3000, fianca:0},
      {cod:"6.21", nome:"Desacato 1", pena:20, multa:4000, fianca:0},
      {cod:"6.23", nome:"Desacato 3", pena:60, multa:12000, fianca:0},
      {cod:"6.24", nome:"Resistência à prisão", pena:15, multa:4000, fianca:0},
    ]
  },
  {
    grupo: "7.x • Trânsito",
    id: "transito",
    itens: [
      {cod:"7.1", nome:"Condução imprudente", pena:5, multa:1500, fianca:0},
      {cod:"7.2", nome:"Dirigir na contra mão", pena:5, multa:1500, fianca:0},
      {cod:"7.3", nome:"Alta velocidade", pena:6, multa:2000, fianca:0},
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
function calc(){
  let pena=0, multa=0, fianca=0;
  selecionados.forEach(item=>{
    pena += item.pena;
    multa += item.multa;
    fianca += item.fianca;
  });
  let red = 0;
  atenuantes.forEach(a=>{ if(a.checked) red += Number(a.dataset.percent); });
  if(red > 50) red = 50;
  const penaFinal = Math.round(pena - pena*(red/100));
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
