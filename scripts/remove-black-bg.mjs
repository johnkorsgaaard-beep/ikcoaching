import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = resolve(__dirname, "../public/images/coach/coach-cutout.png");
const output = resolve(__dirname, "../public/images/coach/coach-cutout-clean.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const ch = info.channels;
const w = info.width;
const h = info.height;
const buf = Buffer.from(data);

const mask = new Uint8Array(w * h);
const visited = new Uint8Array(w * h);

function isDark(r, g, b) {
  return r < 45 && g < 40 && b < 35;
}

// Flood fill from all edges
const queue = [];
for (let x = 0; x < w; x++) {
  queue.push(x, 0);
  queue.push(x, h - 1);
}
for (let y = 0; y < h; y++) {
  queue.push(0, y);
  queue.push(w - 1, y);
}

let qi = 0;
while (qi < queue.length) {
  const x = queue[qi++];
  const y = queue[qi++];
  if (x < 0 || x >= w || y < 0 || y >= h) continue;
  const idx = y * w + x;
  if (visited[idx]) continue;
  visited[idx] = 1;

  const off = idx * ch;
  if (isDark(buf[off], buf[off + 1], buf[off + 2])) {
    mask[idx] = 1;
    queue.push(x - 1, y, x + 1, y, x, y - 1, x, y + 1);
  }
}

// Feather edges for smooth transition
const featherR = 2;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = y * w + x;
    if (!mask[idx]) continue;

    let nearSubject = false;
    for (let dy = -featherR; dy <= featherR && !nearSubject; dy++) {
      for (let dx = -featherR; dx <= featherR && !nearSubject; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < w && ny >= 0 && ny < h && !mask[ny * w + nx]) {
          nearSubject = true;
        }
      }
    }

    const off = idx * ch;
    if (nearSubject) {
      buf[off + 3] = Math.min(buf[off + 3], 80);
    } else {
      buf[off + 3] = 0;
    }
  }
}

await sharp(buf, { raw: { width: w, height: h, channels: ch } })
  .png()
  .toFile(output);

console.log(`Done: ${output}`);
