/**
 * Gastro Master – Wissensbasis-Ingestion
 * Lädt alle Inhalte als Chunks in den Pinecone-Index "antigravity"
 */

import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const EMBEDDING_MODEL = 'gemini-embedding-2-preview';
const INDEX_NAME = 'antigravity';

// ─── Wissensbasis ──────────────────────────────────────────────────────────

const chunks = [

  // ── Überblick ──
  {
    id: 'overview-01',
    text: 'Gastro Master ist eine All-in-One-Plattform für Gastronomen in Deutschland. Das System bietet Online-Bestellsysteme, eigene branded Apps, Kassensysteme, SEO-Management und professionelle Webseiten – alles aus einer Hand, ohne Provisionen auf Umsätze.',
    metadata: { category: 'überblick', topic: 'was-ist-gastro-master' },
  },
  {
    id: 'overview-02',
    text: 'Mit Gastro Master erhalten Gastronomen ihr komplett eigenes Online-Bestellsystem in nur 3 Wochen. Das System ist vollständig anpassbar, trägt das eigene Branding des Restaurants und ist sofort betriebsbereit.',
    metadata: { category: 'überblick', topic: 'setup-zeit' },
  },

  // ── Produkte ──
  {
    id: 'product-online-order-01',
    text: 'Das Online-Bestellsystem von Gastro Master ermöglicht es Restaurants, Imbissen und Lieferdiensten, direkt über ihre eigene Webseite Bestellungen entgegenzunehmen – ohne Drittanbieter wie Lieferando. Kunden bestellen direkt beim Restaurant, ohne dass Provisionen anfallen.',
    metadata: { category: 'produkte', topic: 'online-bestellsystem' },
  },
  {
    id: 'product-app-01',
    text: 'Gastro Master entwickelt eigene Apps (iOS & Android) für Restaurants und Lieferdienste. Diese Apps erscheinen im App Store und Google Play Store unter dem Namen und Branding des jeweiligen Gastronomen – vollständig provisionsfrei. Kunden bestellen direkt über die eigene Restaurant-App.',
    metadata: { category: 'produkte', topic: 'eigene-app' },
  },
  {
    id: 'product-app-02',
    text: 'Die eigene Restaurant-App von Gastro Master ist in 3 Wochen fertig und im App Store verfügbar. Sie unterstützt Push-Benachrichtigungen, Treueprogramme, Menüverwaltung und direkte Zahlungen über Stripe oder PayPal – ohne monatliche Provisionen.',
    metadata: { category: 'produkte', topic: 'eigene-app-features' },
  },
  {
    id: 'product-kasse-01',
    text: 'Das Kassensystem von Gastro Master ist TSE-konform und direkt mit dem Online-Bestellsystem verknüpft. Alle Bestellungen – ob online oder am Tisch – laufen in einem einheitlichen System zusammen. Unterstützt werden Tischbestellungen, Lieferbestellungen und Abholbestellungen.',
    metadata: { category: 'produkte', topic: 'kassensystem' },
  },
  {
    id: 'product-seo-01',
    text: 'Gastro Master bietet SEO-Management speziell für Gastronomen. Das umfasst lokale Suchmaschinenoptimierung, Google My Business Optimierung, und eine erhöhte Sichtbarkeit in der Region – damit mehr Kunden das Restaurant online finden.',
    metadata: { category: 'produkte', topic: 'seo-management' },
  },
  {
    id: 'product-website-01',
    text: 'Gastro Master erstellt professionelle Webseiten für Restaurants und Imbisse. Die Webseiten sind mobiloptimiert, laden schnell und sind direkt mit dem Online-Bestellsystem verbunden. Kunden können nahtlos von der Webseite aus bestellen.',
    metadata: { category: 'produkte', topic: 'webseite' },
  },

  // ── USPs & Vorteile ──
  {
    id: 'usp-provision-01',
    text: 'Gastro Master erhebt 0% Provision auf alle Umsätze. Im Gegensatz zu Plattformen wie Lieferando, die bis zu 30% Provision verlangen, behält das Restaurant bei Gastro Master 100% seiner Einnahmen. Es gibt nur eine monatliche Pauschalgebühr – keine versteckten Kosten.',
    metadata: { category: 'usp', topic: 'keine-provision' },
  },
  {
    id: 'usp-provision-02',
    text: 'Der Vergleich: Lieferando und andere Drittanbieter nehmen bis zu 30% Provision pro Bestellung. Bei einem monatlichen Umsatz von 10.000 € bedeutet das 3.000 € Verlust. Mit Gastro Master bleiben diese 3.000 € beim Restaurant.',
    metadata: { category: 'usp', topic: 'provision-vergleich' },
  },
  {
    id: 'usp-kuendbar-01',
    text: 'Gastro Master ist monatlich kündbar – ohne lange Vertragsbindung. Gastronomen gehen kein Risiko ein und können den Dienst jederzeit beenden, falls er nicht den Erwartungen entspricht.',
    metadata: { category: 'usp', topic: 'monatlich-kuendbar' },
  },
  {
    id: 'usp-setup-01',
    text: 'Das eigene System ist in nur 3 Wochen fertig und betriebsbereit. Gastro Master übernimmt die gesamte technische Einrichtung – von der Webseite über die App bis zum Kassensystem. Der Gastronom muss sich um nichts kümmern.',
    metadata: { category: 'usp', topic: '3-wochen-setup' },
  },
  {
    id: 'usp-zahlung-01',
    text: 'Gastro Master bietet direkte Auszahlung über Stripe und PayPal. Das Geld landet sofort und direkt auf dem Konto des Gastronomen – ohne Umwege über Drittanbieter. Keine Zahlungsverzögerungen, volle Transparenz.',
    metadata: { category: 'usp', topic: 'direkte-auszahlung' },
  },
  {
    id: 'usp-unabhaengigkeit-01',
    text: 'Mit Gastro Master werden Gastronomen unabhängig von Drittplattformen wie Lieferando, Uber Eats oder Just Eat. Das Restaurant besitzt seine eigene Kundendaten, kann direkt mit Kunden kommunizieren und baut eine eigene Marke auf.',
    metadata: { category: 'usp', topic: 'unabhaengigkeit' },
  },

  // ── Zielgruppe ──
  {
    id: 'target-imbiss-01',
    text: 'Gastro Master ist ideal für Imbissbetriebe jeder Größe. Ob Döner-Imbiss, Pizzeria oder Asia-Imbiss – das System ermöglicht einfache Online-Bestellungen, eigene Apps und direkte Auszahlungen ohne Provisionen.',
    metadata: { category: 'zielgruppe', topic: 'imbiss' },
  },
  {
    id: 'target-restaurant-01',
    text: 'Restaurants profitieren besonders von Gastro Master: Tischreservierungen, Online-Bestellsystem, eigene App und ein professioneller Webauftritt – alles verbunden in einem System. Ideal für mittlere und große Restaurants.',
    metadata: { category: 'zielgruppe', topic: 'restaurant' },
  },
  {
    id: 'target-lieferdienst-01',
    text: 'Lieferdienste können mit Gastro Master komplett auf eigenen Kanälen operieren. Eigene App, eigene Webseite, eigenes Bestellsystem – und das ohne die hohen Provisionen von Lieferando & Co. Perfekt für lokale und regionale Lieferdienste.',
    metadata: { category: 'zielgruppe', topic: 'lieferdienst' },
  },
  {
    id: 'target-franchise-01',
    text: 'Für Franchise-Ketten bietet Gastro Master eine skalierbare Lösung: Einheitliches Branding, zentrale Verwaltung mehrerer Standorte, standortübergreifende Berichte und ein konsistentes Kundenerlebnis – bei voller Kontrolle über alle Filialen.',
    metadata: { category: 'zielgruppe', topic: 'franchise' },
  },

  // ── Ablauf & Onboarding ──
  {
    id: 'onboarding-01',
    text: 'Der Start mit Gastro Master ist einfach: 1. Beratungsgespräch buchen. 2. System wird in 3 Wochen eingerichtet. 3. Restaurant geht mit eigenem System online. Das Team von Gastro Master begleitet den gesamten Prozess.',
    metadata: { category: 'onboarding', topic: 'ablauf' },
  },
  {
    id: 'onboarding-02',
    text: 'Gastro Master bietet vollständigen technischen Support. Das Team hilft bei der Einrichtung, dem Design der App und Webseite, der Menüerstellung und der Schulung des Personals. Gastronomen müssen keine technischen Kenntnisse mitbringen.',
    metadata: { category: 'onboarding', topic: 'support' },
  },

  // ── Preise ──
  {
    id: 'pricing-01',
    text: 'Gastro Master arbeitet mit einem monatlichen Pauschalpreis – ohne versteckte Kosten und ohne Umsatzbeteiligung. Die genauen Preise werden im persönlichen Beratungsgespräch besprochen, da sie je nach Leistungsumfang variieren können.',
    metadata: { category: 'preise', topic: 'preismodell' },
  },
  {
    id: 'pricing-02',
    text: 'Es gibt keine Einrichtungsgebühr bei Gastro Master. Das System wird innerhalb von 3 Wochen aufgebaut, und der Gastronom zahlt nur die monatliche Pauschale – keine versteckten Startkosten.',
    metadata: { category: 'preise', topic: 'keine-einrichtungsgebuehr' },
  },

  // ── Kontakt ──
  {
    id: 'contact-01',
    text: 'Gastro Master kann über die Website www.gastro-master.de kontaktiert werden. Interessierte Gastronomen können dort ein kostenloses Beratungsgespräch buchen, um alle Details zu besprechen und ein individuelles Angebot zu erhalten.',
    metadata: { category: 'kontakt', topic: 'kontakt-aufnahme' },
  },
];

// ─── Batch-Upsert mit Embedding ────────────────────────────────────────────

async function ingest() {
  console.log(`\n🚀 Starte Ingestion in Pinecone-Index: "${INDEX_NAME}"`);
  console.log(`   Chunks gesamt  : ${chunks.length}`);
  console.log(`   Embedding-Modell: ${EMBEDDING_MODEL}\n`);

  const index = pinecone.index(INDEX_NAME);
  const BATCH_SIZE = 10; // Gemini erlaubt max. 100 pro Request

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(chunks.length / BATCH_SIZE);

    process.stdout.write(`   Batch ${batchNum}/${totalBatches} – Embedding generieren...`);

    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: batch.map(c => c.text),
      config: { taskType: 'RETRIEVAL_DOCUMENT' },
    });

    const vectors = batch.map((chunk, j) => ({
      id: chunk.id,
      values: response.embeddings[j].values,
      metadata: { text: chunk.text, ...chunk.metadata },
    }));

    await index.upsert(vectors);
    console.log(` ✅ ${batch.length} Vektoren gespeichert`);
  }

  // Statistik
  const stats = await index.describeIndexStats();
  console.log(`\n✅ Ingestion abgeschlossen!`);
  console.log(`   Vektoren im Index: ${stats.totalRecordCount}`);
  console.log(`   Dimensionen      : ${stats.dimension ?? 3072}`);
  console.log(`\n🎉 Die Wissensbasis ist bereit. Du kannst den Chat jetzt testen.\n`);
}

ingest().catch(err => {
  console.error('❌ Fehler:', err.message);
  process.exit(1);
});
