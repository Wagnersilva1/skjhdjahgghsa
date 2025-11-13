require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fetch = require('node-fetch'); // v2 (CJS)

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const REMOTE_OFICIAIS_URL = process.env.API_OFICIAIS_URL || 'https://policia.discloud.app/api/oficiais';

if (!DISCORD_WEBHOOK_URL) {
  console.warn('[WARN] DISCORD_WEBHOOK_URL não configurada. Defina no arquivo .env');
}

// Security headers
app.use(helmet());
app.disable('x-powered-by');

// Body parser com limite
app.use(express.json({ limit: '100kb' }));

// CORS opcional (para quando abrir o front via Go Live ou outra origem)
// Defina CORS_ORIGINS como lista separada por vírgulas
// ex: CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
if (corsOrigins.length) {
  app.use(cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true); // same-origin / curl
      if (corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    }
  }));
}

// Servir arquivos estáticos (mesma origem)
app.use(express.static(path.join(__dirname)));

// Rate limit geral (anti-abuso)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 120,            // 120 req/min por IP
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// ================================
// API: Oficiais (proxy seguro)
// ================================
app.get('/api/oficiais', async (req, res) => {
  try {
    const r = await fetch(REMOTE_OFICIAIS_URL, { timeout: 8000 });
    if (!r.ok) {
      return res.status(502).json({ error: 'Falha ao consultar oficiais' });
    }
    const data = await r.json();

    // Tenta detectar automaticamente o array de oficiais
    const possibleArrays = [
      data?.oficiais,
      data?.data,
      data?.result,
      data?.results,
      data?.lista,
      Array.isArray(data) ? data : null
    ].filter(Array.isArray);

    let arr = possibleArrays[0] || [];

    // Normaliza campos comuns para { id, nome }
    const oficiais = arr
      .map(o => {
        if (!o || typeof o !== 'object') return null;
        const id = o.id ?? o.discordId ?? o.user_id ?? o.uid ?? o.id_oficial;
        const nome = o.nome ?? o.name ?? o.nick ?? o.username ?? o.apelido;
        if ((typeof id === 'string' || typeof id === 'number') && typeof nome === 'string') {
          return { id: String(id), nome: String(nome) };
        }
        return null;
      })
      .filter(Boolean);

    return res.json({ oficiais });
  } catch (err) {
    return res.status(502).json({ error: 'Erro ao buscar oficiais' });
  }
});

// ================================
// API: Webhook (proxy com validação)
// ================================
const webhookLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 10,             // 10 envios/min por IP
  standardHeaders: true,
  legacyHeaders: false
});

app.post('/api/webhook', webhookLimiter, async (req, res) => {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      return res.status(500).json({ error: 'Webhook não configurado no servidor' });
    }

    const body = req.body || {};

    // Whitelist dos campos que vamos aceitar e encaminhar
    const safe = {};

    if (typeof body.username === 'string' && body.username.length <= 80) {
      safe.username = body.username;
    }

    if (typeof body.content === 'string') {
      // limita content ao máximo do Discord
      safe.content = body.content.slice(0, 2000);
    }

    if (Array.isArray(body.embeds)) {
      // limita quantidade e tamanho
      const embeds = body.embeds.slice(0, 5).map(e => {
        const out = {};
        if (typeof e.title === 'string') out.title = e.title.slice(0, 256);
        if (typeof e.description === 'string') out.description = e.description.slice(0, 4096);
        if (typeof e.color === 'number') out.color = e.color >>> 0;
        if (Array.isArray(e.fields)) {
          out.fields = e.fields.slice(0, 25).map(f => ({
            name: typeof f.name === 'string' ? f.name.slice(0, 256) : '—',
            value: typeof f.value === 'string' ? f.value.slice(0, 1024) : '—',
            inline: Boolean(f.inline)
          }));
        }
        if (e.footer && typeof e.footer.text === 'string') {
          out.footer = { text: e.footer.text.slice(0, 2048) };
        }
        if (typeof e.timestamp === 'string') out.timestamp = e.timestamp;
        return out;
      });
      if (embeds.length) safe.embeds = embeds;
    }

    if (!safe.content && !safe.embeds) {
      return res.status(400).json({ error: 'Payload inválido (falta content ou embeds)' });
    }

    const r = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(safe),
      timeout: 8000
    });

    if (!r.ok) {
      const text = await r.text().catch(() => '');
      return res.status(502).json({ error: 'Falha ao enviar ao Discord', detail: text });
    }

    // Discord retorna 204 no sucesso
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao enviar' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
