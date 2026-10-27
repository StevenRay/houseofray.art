/**
 * Regenerates the WebP derivatives the site actually loads from the PNG masters
 * in src/assets/originals. Run with `npm run images` after replacing a master.
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'src/assets/originals';
const OUTPUT_DIR = 'public/assets';
const FULL_QUALITY = 82;
const SMALL_QUALITY = 80;

await mkdir(OUTPUT_DIR, { recursive: true });

const masters = (await readdir(SOURCE_DIR)).filter((file) => file.endsWith('.png'));

for (const file of masters) {
  const source = path.join(SOURCE_DIR, file);
  const name = path.basename(file, '.png');
  const { width } = await sharp(source).metadata();
  const halfWidth = Math.round(width / 2);

  await sharp(source)
    .webp({ quality: FULL_QUALITY, effort: 6 })
    .toFile(path.join(OUTPUT_DIR, `${name}.webp`));

  await sharp(source)
    .resize({ width: halfWidth })
    .webp({ quality: SMALL_QUALITY, effort: 6 })
    .toFile(path.join(OUTPUT_DIR, `${name}-${halfWidth}w.webp`));

  console.log(`${file} -> ${name}.webp (${width}w), ${name}-${halfWidth}w.webp`);
}
