// Deploy-Sicherheit: Builds nur aus sauberem Git-Tree. Bei 134 uncommitteten
// Dateien war nicht mehr nachvollziehbar, welcher Quellstand ausgeliefert
// wurde (BlogPostDetailPage-Vorfall 2026-08). Dieser Check bricht den Build
// ab, bevor Arbeit in ein nicht reproduzierbares dist fließt.
//
// Bewusstes Override für lokale Experimente: ALLOW_DIRTY_BUILD=1 npm run build
// (der Build-Stempel markiert solche Builds trotzdem als "-dirty").
import { execSync } from 'child_process';

if (process.env.ALLOW_DIRTY_BUILD === '1') {
  console.warn('⚠️  Preflight übersprungen (ALLOW_DIRTY_BUILD=1) — dist wird als "-dirty" gestempelt.');
  process.exit(0);
}

let status = '';
try {
  status = execSync('git status --porcelain').toString().trim();
} catch {
  console.warn('⚠️  Preflight: kein Git-Repo erkannt — Check übersprungen.');
  process.exit(0);
}

if (status) {
  const lines = status.split('\n');
  console.error('❌ Preflight: Working Tree ist nicht sauber — Build abgebrochen.\n');
  console.error(lines.slice(0, 15).join('\n'));
  if (lines.length > 15) console.error(`   … und ${lines.length - 15} weitere`);
  console.error('\n→ Änderungen committen oder stashen. Bewusst dreckig bauen: ALLOW_DIRTY_BUILD=1 npm run build');
  process.exit(1);
}

console.log('✅ Preflight: Working Tree sauber — Build ist reproduzierbar.');
