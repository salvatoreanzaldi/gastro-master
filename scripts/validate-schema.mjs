/**
 * Validates Schema.org / JSON-LD payloads in src/data/blog-posts-generated.ts.
 * Field-existence checks only — no external API calls.
 *
 * Usage: node scripts/validate-schema.mjs
 * Exit code != 0 on validation failure.
 */

import { readFileSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ─── Merchant-Listing-Validation (--merchant) ───────────────────────────────
// Scannt das gebaute dist/-HTML (Prerenderer-Layer) auf Product-/Offer-Regeln,
// die GSC im Merchant-Report prüft. Deckt bewusst NUR die Prerenderer-Ebene ab —
// client-injiziertes Schema (WebseitePage etc.) ist durch direkte Code-Fixes
// abgesichert; ein post-JS-Render-Check (Playwright) ist als Phase 2 geplant.
//
// Kritisch (Exit 1): fehlendes aggregateRating am Product, fehlendes
//   shippingDestination, doesNotShip-Widerspruch, UnitPriceSpecification ohne price.
// Warnung (Exit 0): Product ohne review (empfohlen, kein Rich-Result-Blocker).
// Bewusst NICHT geflaggt: generische PriceSpecification ohne price — das ist der
//   valide Custom-Quote-Tier („Preis nach Projektumfang").
function walkDistHtml(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) walkDistHtml(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      /* malformed JSON-LD is caught by validate-jsonld.mjs — ignore here */
    }
  }
  return blocks;
}

function runMerchantValidation() {
  const distDir = resolve(ROOT, "dist");
  let files;
  try {
    files = walkDistHtml(distDir);
  } catch {
    console.error("❌ dist/ nicht gefunden — erst `vite build` + generate-prerendered-html.mjs laufen lassen.");
    process.exit(1);
  }

  const critical = [];
  const warnings = [];

  const visit = (node, slug) => {
    if (Array.isArray(node)) {
      for (const n of node) visit(n, slug);
      return;
    }
    if (!node || typeof node !== "object") return;
    const t = node["@type"];

    if (t === "Product") {
      const label = node.name || node["@id"] || "(unbenannt)";
      if (!node.aggregateRating) {
        critical.push(`[${slug}] Product "${label}" ohne aggregateRating`);
      }
      const rev = node.review;
      const hasReview = Array.isArray(rev) ? rev.length > 0 : !!rev;
      if (!hasReview) warnings.push(`Product "${label}" ohne review`);
    }

    if (t === "OfferShippingDetails") {
      if (!node.shippingDestination) {
        critical.push(`[${slug}] OfferShippingDetails ohne shippingDestination`);
      }
      if ("doesNotShip" in node) {
        critical.push(`[${slug}] OfferShippingDetails mit doesNotShip (Widerspruch zu shippingRate/deliveryTime)`);
      }
    }

    // Nur UnitPriceSpecification braucht einen konkreten price. Generische
    // PriceSpecification ohne price ist der valide Custom-Quote-Tier.
    if (t === "UnitPriceSpecification") {
      if (node.price === undefined || node.price === null || node.price === "") {
        critical.push(`[${slug}] UnitPriceSpecification ohne price`);
      }
    }

    for (const v of Object.values(node)) {
      if (v && typeof v === "object") visit(v, slug);
    }
  };

  for (const file of files) {
    const slug = file.replace(distDir + "/", "").replace(/\/index\.html$/, "") || "/";
    for (const block of extractJsonLd(readFileSync(file, "utf-8"))) visit(block, slug);
  }

  // Sitewide-Nodes wiederholen sich über hunderte Seiten → deduplizieren.
  const uniqCrit = [...new Set(critical)];
  const uniqWarn = [...new Set(warnings)];

  console.log(`🔎 Merchant-Validation über ${files.length} dist-Seiten (Prerenderer-Layer).`);
  if (uniqWarn.length) {
    console.warn(`⚠️  ${uniqWarn.length} nicht-kritische Warnung(en) (review empfohlen):`);
    for (const w of uniqWarn.slice(0, 20)) console.warn(`   - ${w}`);
    if (uniqWarn.length > 20) console.warn(`   ... und ${uniqWarn.length - 20} weitere`);
  }
  if (uniqCrit.length === 0) {
    console.log("✅ Keine kritischen Merchant-Verstöße (aggregateRating · shippingDestination · doesNotShip · UnitPriceSpecification.price).");
    process.exit(0);
  }
  console.error(`❌ ${uniqCrit.length} kritische(r) Merchant-Verstoß/Verstöße:`);
  for (const e of uniqCrit.slice(0, 50)) console.error(`   - ${e}`);
  if (uniqCrit.length > 50) console.error(`   ... und ${uniqCrit.length - 50} weitere`);
  process.exit(1);
}

if (process.argv.includes("--merchant")) {
  runMerchantValidation();
}

const SAMPLE_SLUGS = [
  "lieferando-bestellung-stornieren",
  "eigene-lieferservice-app",
];

const REQUIRED_ARTICLE_FIELDS = [
  "headline",
  "description",
  "image",
  "datePublished",
  "author",
  "publisher",
  "mainEntityOfPage",
  "inLanguage",
  "wordCount",
];

const CONTENT_TYPES = new Set([
  "Article",
  "BlogPosting",
  "NewsArticle",
  "TechArticle",
  "ScholarlyArticle",
]);

function isContentNode(node) {
  const t = node["@type"];
  if (typeof t !== "string") return false;
  return CONTENT_TYPES.has(t) || t.endsWith("Article");
}

function loadPosts() {
  const source = readFileSync(
    resolve(ROOT, "src/data/blog-posts-generated.ts"),
    "utf-8",
  );
  const posts = [];
  const re =
    /slug:\s*"([^"]+)",[\s\S]*?jsonLd:\s*("(?:[^"\\]|\\[\s\S])*"),[\s\S]*?author:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    posts.push({ slug: m[1], jsonLd: JSON.parse(m[2]), author: m[3] });
  }
  return posts;
}

function validatePost(post) {
  const errors = [];
  const { slug, jsonLd, author } = post;

  if (!jsonLd) {
    errors.push(`[${slug}] empty jsonLd`);
    return errors;
  }

  let obj;
  try {
    obj = JSON.parse(jsonLd);
  } catch (e) {
    errors.push(`[${slug}] jsonLd is not valid JSON: ${e.message}`);
    return errors;
  }

  if (obj["@context"] !== "https://schema.org") {
    errors.push(`[${slug}] @context missing or wrong (expected https://schema.org)`);
  }

  const nodes = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];
  const contentNodes = nodes.filter(isContentNode);

  if (contentNodes.length === 0) {
    errors.push(`[${slug}] no Article/BlogPosting node found`);
    return errors;
  }

  for (const node of contentNodes) {
    const t = node["@type"];

    for (const f of REQUIRED_ARTICLE_FIELDS) {
      if (node[f] === undefined || node[f] === null || node[f] === "") {
        errors.push(`[${slug}] ${t} missing required field "${f}"`);
      }
    }

    if (node.inLanguage !== "de-DE") {
      errors.push(`[${slug}] ${t}.inLanguage = "${node.inLanguage}" (expected "de-DE")`);
    }

    if (typeof node.wordCount !== "number" || node.wordCount <= 0) {
      errors.push(`[${slug}] ${t}.wordCount invalid: ${node.wordCount}`);
    }

    if (typeof node.image === "string" && node.image.includes("/wp-content/")) {
      errors.push(`[${slug}] ${t}.image still references legacy /wp-content/ URL`);
    }
    if (node.image && typeof node.image === "object" && typeof node.image.url === "string"
        && node.image.url.includes("/wp-content/")) {
      errors.push(`[${slug}] ${t}.image.url still references legacy /wp-content/ URL`);
    }

    if (Array.isArray(node.author)) {
      for (const a of node.author) {
        if (a["@type"] !== "Person") errors.push(`[${slug}] author entry missing @type=Person`);
        if (!a.name) errors.push(`[${slug}] author entry missing name`);
        if (!a.url) errors.push(`[${slug}] author entry missing url`);
        if (!a.image) errors.push(`[${slug}] author entry "${a.name}" missing image`);
      }
      if (author === "Salvatore Anzaldi") {
        if (node.author.length !== 1 || node.author[0].name !== "Salvatore Anzaldi") {
          errors.push(`[${slug}] expected author = [Salvatore Anzaldi] for Salvatore-post`);
        }
      } else {
        const names = node.author.map((a) => a.name).sort().join("|");
        if (names !== "René Ebert|Sanjaya Pattiyage") {
          errors.push(`[${slug}] expected authors = [René Ebert, Sanjaya Pattiyage], got: ${names}`);
        }
      }
    } else {
      errors.push(`[${slug}] author is not an array`);
    }

    const pub = node.publisher;
    if (!pub || typeof pub !== "object") {
      errors.push(`[${slug}] publisher missing`);
    } else {
      if (pub["@type"] !== "Organization") errors.push(`[${slug}] publisher.@type != Organization`);
      if (!pub.logo || typeof pub.logo !== "object") {
        errors.push(`[${slug}] publisher.logo missing or not an object`);
      } else {
        if (pub.logo["@type"] !== "ImageObject") errors.push(`[${slug}] publisher.logo.@type != ImageObject`);
        if (!pub.logo.url || pub.logo.url.includes("/wp-content/")) {
          errors.push(`[${slug}] publisher.logo.url invalid: ${pub.logo.url}`);
        }
        if (typeof pub.logo.width !== "number" || typeof pub.logo.height !== "number") {
          errors.push(`[${slug}] publisher.logo missing width/height`);
        }
      }
    }

    const me = node.mainEntityOfPage;
    const meId = typeof me === "string" ? me : me?.["@id"];
    const expectedCanon = `https://gastro-master.de/de/blog/${slug}`;
    if (meId !== expectedCanon) {
      errors.push(`[${slug}] mainEntityOfPage @id = "${meId}" (expected "${expectedCanon}")`);
    }
  }

  return errors;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const posts = loadPosts();
console.log(`Loaded ${posts.length} blog posts.`);

const targets = posts.filter((p) => SAMPLE_SLUGS.includes(p.slug));
if (targets.length === 0) {
  console.error("❌ None of the sample slugs were found.");
  process.exit(1);
}

let allErrors = [];
for (const post of targets) {
  const errs = validatePost(post);
  allErrors = allErrors.concat(errs);
}

// Spot-check ALL posts for the most critical fields (image, inLanguage, wordCount)
for (const post of posts) {
  if (!post.jsonLd || post.jsonLd.trim() === "") {
    allErrors.push(`[${post.slug}] jsonLd is empty — no structured data`);
    continue;
  }
  let obj;
  try {
    obj = JSON.parse(post.jsonLd);
  } catch (e) {
    allErrors.push(`[${post.slug}] jsonLd not parseable: ${e.message}`);
    continue;
  }
  const nodes = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];
  let hasContentNode = false;
  for (const node of nodes) {
    if (!isContentNode(node)) continue;
    hasContentNode = true;
    if (node.inLanguage !== "de-DE") {
      allErrors.push(`[${post.slug}] inLanguage missing or wrong`);
    }
    if (typeof node.wordCount !== "number" || node.wordCount <= 0) {
      allErrors.push(`[${post.slug}] wordCount missing`);
    }
    const imgUrl = typeof node.image === "object" ? node.image?.url : node.image;
    if (typeof imgUrl === "string" && imgUrl.includes("/wp-content/")) {
      allErrors.push(`[${post.slug}] image still uses /wp-content/`);
    }
  }
  if (!hasContentNode) {
    allErrors.push(`[${post.slug}] no Article/BlogPosting node found in jsonLd`);
  }
}

if (allErrors.length === 0) {
  console.log(`✅ All ${targets.length} sample posts valid.`);
  console.log(`✅ All ${posts.length} posts pass critical-field checks.`);
  process.exit(0);
} else {
  console.error(`❌ ${allErrors.length} validation error(s):`);
  for (const e of allErrors.slice(0, 50)) console.error(`   - ${e}`);
  if (allErrors.length > 50) console.error(`   ... and ${allErrors.length - 50} more`);
  process.exit(1);
}
