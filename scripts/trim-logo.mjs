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

// Make all light pixels transparent
for (let i = 0; i < width * height; i++) {
  const off = i * channels;
  const r = buf[off];
  const g = buf[off + 1];
  const b = buf[off + 2];
  const brightness = (r + g + b) / 3;

  if (brightness > 190) {
    const fade = Math.min(1, (brightness - 190) / 40);
    buf[off + 3] = Math.round((1 - fade) * 255);
  }
}

// Find bounding box of non-transparent pixels
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const alpha = buf[(y * width + x) * channels + 3];
    if (alpha > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 4;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

await sharp(buf, { raw: { width, height, channels } })
  .png()
  .extract({ left: minX, top: minY, width: cropW, height: cropH })
  .toFile(output);

console.log(`Trimmed: ${width}x${height} → ${cropW}x${cropH}`);
