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
const mask = new Uint8Array(width * height);
const visited = new Uint8Array(width * height);

function isBackground(r, g, b) {
  return r > 210 && g > 205 && b > 195;
}

// Flood fill from all edges
const queue = [];
for (let x = 0; x < width; x++) {
  queue.push(x, 0);
  queue.push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  queue.push(0, y);
  queue.push(width - 1, y);
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
  if (isBackground(buf[off], buf[off + 1], buf[off + 2])) {
    mask[idx] = 1;
    queue.push(x - 1, y, x + 1, y, x, y - 1, x, y + 1);
  }
}

// Apply with feathering
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    if (!mask[idx]) continue;

    let nearEdge = false;
    for (let dy = -1; dy <= 1 && !nearEdge; dy++) {
      for (let dx = -1; dx <= 1 && !nearEdge; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !mask[ny * width + nx]) {
          nearEdge = true;
        }
      }
    }

    const off = idx * channels;
    buf[off + 3] = nearEdge ? 60 : 0;
  }
}

await sharp(buf, { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log(`Done: ${width}x${height}`);
