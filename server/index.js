import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Init clients
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-2-preview';
const CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || 'gemini-2.0-flash';
const INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'antigravity';

// ─── Health / connection check ─────────────────────────────────────────────

app.get('/api/health', async (req, res) => {
  try {
    const indexes = await pinecone.listIndexes();
    const index = indexes.indexes?.find(i => i.name === INDEX_NAME);
    if (!index) return res.status(404).json({ ok: false, error: `Index "${INDEX_NAME}" not found` });

    res.json({
      ok: true,
      pinecone: {
        connected: true,
        index: index.name,
        host: index.host,
        dimension: index.dimension,
        status: index.status,
      },
      gemini: {
        connected: true,
        embeddingModel: EMBEDDING_MODEL,
        chatModel: CHAT_MODEL,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── Generate embeddings ───────────────────────────────────────────────────

app.post('/api/embed', async (req, res) => {
  try {
    const { texts } = req.body; // string or string[]
    const contents = Array.isArray(texts) ? texts : [texts];

    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents,
      config: { taskType: 'RETRIEVAL_DOCUMENT' },
    });

    res.json({ embeddings: response.embeddings.map(e => e.values) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Upsert content into Pinecone ─────────────────────────────────────────

app.post('/api/upsert', async (req, res) => {
  try {
    const { chunks } = req.body;
    // chunks: [{ id, text, metadata }]

    const texts = chunks.map(c => c.text);
    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: texts,
      config: { taskType: 'RETRIEVAL_DOCUMENT' },
    });

    const vectors = chunks.map((chunk, i) => ({
      id: chunk.id,
      values: response.embeddings[i].values,
      metadata: { text: chunk.text, ...chunk.metadata },
    }));

    const index = pinecone.index(INDEX_NAME);
    await index.upsert(vectors);

    res.json({ ok: true, upserted: vectors.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Query Pinecone ────────────────────────────────────────────────────────

app.post('/api/query', async (req, res) => {
  try {
    const { query, topK = 5 } = req.body;

    const embedResponse = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: [query],
      config: { taskType: 'RETRIEVAL_QUERY' },
    });

    const queryVector = embedResponse.embeddings[0].values;
    const index = pinecone.index(INDEX_NAME);

    const results = await index.query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });

    res.json({ matches: results.matches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Full RAG Chat ─────────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  try {
    const { message, topK = 5 } = req.body;

    // 1. Embed the user query
    const embedResponse = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: [message],
      config: { taskType: 'RETRIEVAL_QUERY' },
    });
    const queryVector = embedResponse.embeddings[0].values;

    // 2. Retrieve relevant chunks from Pinecone
    const index = pinecone.index(INDEX_NAME);
    const results = await index.query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });

    const context = results.matches
      .map(m => m.metadata?.text || '')
      .filter(Boolean)
      .join('\n\n---\n\n');

    // 3. Generate answer with Gemini
    const systemPrompt = `Du bist ein hilfreicher Assistent für Gastro Master, eine moderne Bestellmanagement-Plattform für die Gastronomie.
Beantworte Fragen ausschließlich basierend auf dem bereitgestellten Kontext.
Wenn der Kontext keine relevanten Informationen enthält, sage das ehrlich.
Antworte auf Deutsch, es sei denn, der Nutzer schreibt in einer anderen Sprache.

Kontext:
${context}`;

    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nFrage: ' + message }] },
      ],
    });

    const answer = response.candidates?.[0]?.content?.parts?.[0]?.text || 'Keine Antwort verfügbar.';

    res.json({
      answer,
      sources: results.matches.map(m => ({
        score: m.score,
        text: m.metadata?.text?.substring(0, 200) + '...',
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start ─────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Gastro Master RAG Server running on http://localhost:${PORT}`);
  console.log(`   Pinecone index : ${INDEX_NAME}`);
  console.log(`   Embedding model: ${EMBEDDING_MODEL}`);
  console.log(`   Chat model     : ${CHAT_MODEL}\n`);
});
