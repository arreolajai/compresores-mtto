import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
mkdirSync('public/icons', { recursive: true });
const glyph = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#0E4F52"/><g transform="translate(256 256) scale(${pad}) translate(-256 -256)"><circle cx="256" cy="256" r="136" fill="none" stroke="#F2F4F1" stroke-width="40"/><path d="M256 256 L344 168" stroke="#E5A300" stroke-width="40" stroke-linecap="round"/><circle cx="256" cy="256" r="28" fill="#F2F4F1"/></g></svg>`;
const out = [['icon-192', 192, 1], ['icon-512', 512, 1], ['icon-maskable-512', 512, 0.72]];
for (const [name, size, pad] of out) {
  await sharp(Buffer.from(glyph(pad))).resize(size, size).png().toFile(`public/icons/${name}.png`);
}
console.log('Iconos generados');
