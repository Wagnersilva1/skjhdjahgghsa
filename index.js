// ===============================
// CONFIGURAÇÕES
// ===============================
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || "COLOQUE-SEU-TOKEN-AQUI";
const GUILD_ID = process.env.GUILD_ID || "COLOQUE-SEU-GUILD-AQUI";

// cargos que você passou
const ROLE_IDS = [
  "1075201814770757642",
  "909536846638379019",
  "1137579919417811015",
  "1075206178394611822",
  "1361174102890643466"
];

// porta do express
const PORT = process.env.PORT || 3000;

// ===============================
// IMPORTS
// ===============================
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");
const app = express();

// ===============================
// DISCORD CLIENT
// ===============================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.GuildMember]
});

// vamos manter um cache para não ficar indo no discord a cada request
let cacheOficiais = [];
let lastFetch = 0;
const CACHE_TIME_MS = 60 * 1000; // 1 minuto

// função que realmente busca os membros com os cargos
async function fetchOficiaisFromDiscord() {
  const now = Date.now();
  // se ainda tá dentro do tempo de cache, só devolve
  if (now - lastFetch < CACHE_TIME_MS && cacheOficiais.length > 0) {
    return cacheOficiais;
  }

  const guild = await client.guilds.fetch(GUILD_ID);
  // precisamos garantir que temos TODOS os membros
  await guild.members.fetch(); // puxa todos

  const oficiais = [];

  guild.members.cache.forEach(member => {
    // ignorar bots
    if (member.user.bot) return;

    // checa se ele tem ALGUM dos cargos desejados
    const temCargo = ROLE_IDS.some(roleId => member.roles.cache.has(roleId));
    if (temCargo) {
      // pega o melhor nome possível
      const nome = member.nickname || member.user.globalName || member.user.username;
      oficiais.push({
        id: member.id,
        nome: nome
      });
    }
  });

  // ordena por nome pra ficar bonito no front
  oficiais.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  cacheOficiais = oficiais;
  lastFetch = now;
  return oficiais;
}

// ===============================
// EXPRESS API
// ===============================
app.get("/api/oficiais", async (req, res) => {
  try {
    if (!client.isReady()) {
      return res.status(503).json({ error: "Bot ainda não conectou no Discord" });
    }
    const oficiais = await fetchOficiaisFromDiscord();
    return res.json({ oficiais });
  } catch (err) {
    console.error("Erro ao montar /api/oficiais:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
});

// rota só pra ver se tá vivo
app.get("/", (req, res) => {
  res.json({ ok: true, msg: "API do Bot CPX rodando" });
});

// ===============================
// START
// ===============================
async function start() {
  // inicia express
  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
  });

  // loga no discord
  await client.login(DISCORD_TOKEN);
}

client.once("ready", () => {
  console.log(`✅ Bot logado como ${client.user.tag}`);
});

start().catch(console.error);
