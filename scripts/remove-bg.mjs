import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = resolve(__dirname, "../public/images/coach/logo.png");
const output = resolve(__dirname, "../public/images/coach/logo-nobg.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

for (let i = 0; i < width * height; i++) {
  const off = i * channels;
  const r = buf[off];
  const g = buf[off + 1];
  const b = buf[off + 2];

  if (r > 230 && g > 225 && b > 220) {
    const lightness = (r + g + b) / 3;
    const alpha = Math.max(0, Math.round(((255 - lightness) / 25) * 255));
    buf[off + 3] = Math.min(buf[off + 3], alpha);
  }
}

await sharp(buf, { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log(`Saved transparent logo to ${output}`);
