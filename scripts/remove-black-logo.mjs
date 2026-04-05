import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = resolve(__dirname, "assets/logo-black-bg.png");
const output = resolve(__dirname, "../public/images/coach/logo-nobg.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

// Remove all dark/black pixels via flood fill from edges
const mask = new Uint8Array(width * height);
const visited = new Uint8Array(width * height);

function isDark(r, g, b) {
  return r < 30 && g < 30 && b < 30;
}

const queue = [];
for (let x = 0; x < width; x++) {
  queue.push(x, 0, x, height - 1);
}
for (let y = 0; y < height; y++) {
  queue.push(0, y, width - 1, y);
}

let qi = 0;
while (qi < queue.length) {
  const x = queue[qi++];
  const y = queue[qi++];
  if (x < 0 || x >= width || y < 0 || y >= height) continue;
  const idx = y * width + x;
  if (visited[idx]) continue;
  visited[idx] = 1;
  const off = idx * channels;
  if (isDark(buf[off], buf[off + 1], buf[off + 2])) {
    mask[idx] = 1;
    queue.push(x - 1, y, x + 1, y, x, y - 1, x, y + 1);
  }
}

for (let i = 0; i < width * height; i++) {
  if (mask[i]) {
    buf[i * channels + 3] = 0;
  }
}

// Trim to bounding box
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (buf[(y * width + x) * channels + 3] > 10) {
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

await sharp(buf, { raw: { width, height, channels } })
  .png()
  .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .toFile(output);

console.log(`Done: ${maxX - minX + 1}x${maxY - minY + 1}`);
