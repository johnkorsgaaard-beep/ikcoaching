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

  const brightness = (r + g + b) / 3;

  if (brightness > 200) {
    const fade = Math.max(0, (brightness - 200) / 55);
    buf[off + 3] = Math.round((1 - fade) * 255);
  }
}

await sharp(buf, { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log("Done");
