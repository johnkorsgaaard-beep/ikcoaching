import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = resolve(__dirname, "../public/images/coach/coach-photo.png");
const output = resolve(__dirname, "../public/images/coach/coach-cutout.png");

const image = sharp(input);
const { width, height } = await image.metadata();

const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const ch = info.channels;
const buf = Buffer.from(data);
const w = info.width;
const h = info.height;

const corners = [
  [0, 0],
  [w - 1, 0],
  [0, h - 1],
  [w - 1, h - 1],
  [Math.floor(w * 0.1), 0],
  [Math.floor(w * 0.9), 0],
  [0, Math.floor(h * 0.1)],
  [w - 1, Math.floor(h * 0.1)],
  [0, Math.floor(h * 0.5)],
  [w - 1, Math.floor(h * 0.5)],
];

const bgSamples = corners.map(([x, y]) => {
  const off = (y * w + x) * ch;
  return [buf[off], buf[off + 1], buf[off + 2]];
});

function matchesBg(r, g, b) {
  for (const [br, bg2, bb] of bgSamples) {
    const dr = r - br;
    const dg = g - bg2;
    const db = b - bb;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist < 55) return true;
  }
  return false;
}

const mask = new Uint8Array(w * h);

// Flood fill from edges
const queue = [];
const visited = new Uint8Array(w * h);

for (let x = 0; x < w; x++) {
  queue.push(x);
  queue.push(0);
  queue.push(x);
  queue.push(h - 1);
}
for (let y = 0; y < h; y++) {
  queue.push(0);
  queue.push(y);
  queue.push(w - 1);
  queue.push(y);
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
  const r = buf[off];
  const g = buf[off + 1];
  const b = buf[off + 2];

  if (matchesBg(r, g, b)) {
    mask[idx] = 1;
    queue.push(x - 1, y);
    queue.push(x + 1, y);
    queue.push(x, y - 1);
    queue.push(x, y + 1);
  }
}

// Feather the edges
const featherRadius = 3;
const feathered = new Float32Array(w * h);

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = y * w + x;
    if (mask[idx] === 0) continue;

    let nearSubject = false;
    for (let dy = -featherRadius; dy <= featherRadius && !nearSubject; dy++) {
      for (let dx = -featherRadius; dx <= featherRadius && !nearSubject; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          if (mask[ny * w + nx] === 0) {
            nearSubject = true;
          }
        }
      }
    }
    if (nearSubject) {
      feathered[idx] = 0.5;
    } else {
      feathered[idx] = 1.0;
    }
  }
}

// Apply mask
for (let i = 0; i < w * h; i++) {
  if (mask[i]) {
    const alpha = Math.round((1 - feathered[i]) * 255);
    buf[i * ch + 3] = Math.min(buf[i * ch + 3], alpha);
  }
}

await sharp(buf, { raw: { width: w, height: h, channels: ch } })
  .png()
  .toFile(output);

console.log(`Saved cutout to ${output} (${w}x${h})`);
