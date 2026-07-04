/**
 * Vendor VAYU campaign assets into public/assets/.
 *
 * Downloads every file listed in scripts/asset-manifest.json that is not
 * already present. Run locally (`node scripts/fetch-assets.mjs`) or in CI —
 * the deploy workflow runs it and commits the results so the site never
 * depends on the generation CDN at runtime.
 */
import { createWriteStream, existsSync, mkdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, 'public', 'assets');
const manifest = JSON.parse(readFileSync(path.join(root, 'scripts', 'asset-manifest.json'), 'utf8'));

mkdirSync(outDir, { recursive: true });

let ok = 0;
let skipped = 0;
let failed = 0;

for (const [filename, url] of Object.entries(manifest)) {
  const dest = path.join(outDir, filename);
  if (existsSync(dest) && statSync(dest).size > 0) {
    skipped += 1;
    continue;
  }
  try {
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
    await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
    console.log(`fetched ${filename}`);
    ok += 1;
  } catch (err) {
    if (existsSync(dest)) unlinkSync(dest);
    console.error(`FAILED ${filename}: ${err.message}`);
    failed += 1;
  }
}

console.log(`assets: ${ok} fetched, ${skipped} already present, ${failed} failed`);
// Missing files degrade gracefully in the UI; don't fail the build.
