import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destDir = path.resolve(__dirname, '../public/pictures');

// Only download the 10 plants we couldn't generate images for
const images = {
  zz_plant: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80",
  spider_plant: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80",
  rubber_plant: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=600&q=80",
  peace_lily: "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&w=600&q=80",
  parlor_palm: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  bird_of_paradise: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80",
  orchid: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80",
  lavender: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80",
  anthurium: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=600&q=80",
  jasmine: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80"
};

async function download(name, url) {
  const filePath = path.join(destDir, `${name}.jpg`);
  // Skip if a .png version already exists (generated image)
  if (fs.existsSync(path.join(destDir, `${name}.png`))) {
    console.log(`Skipping ${name} — generated .png already exists`);
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP status ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`Downloaded: ${name}.jpg`);
  } catch (err) {
    console.error(`Failed to download ${name}:`, err.message);
  }
}

async function run() {
  console.log("Downloading remaining images...");
  for (const [name, url] of Object.entries(images)) {
    await download(name, url);
  }
  console.log("Finished!");
}

run();
