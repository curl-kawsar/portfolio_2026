// One-shot favicon generator. Renders a brutalist "K" mark that matches
// the site palette (paper / ink / signal orange) and writes:
//   - app/favicon.ico  (multi-res 16/32/48, replaces the old one)
//   - app/icon.png     (180x180, picked up by Next.js as the app icon)
//   - public/favicon-32.png  (32x32, shareable)
//
// Run with:  node scripts/make-favicon.mjs
//
// Design:
//   - 16x16 grid for crisp 1:1 pixel alignment at small sizes
//   - K is built from a 4u vertical stem, 2u waist joint, and two
//     diagonal legs that meet cleanly at the joint — no anti-aliased
//     fuzz at 16x16.
//   - Orange wedge in the top-right corner bleeds off the edge for
//     visual tension (matches the hero's signal-orange accent).
//   - 1u ink frame around the whole tile for definition on light/dark
//     browser chrome.

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Brand tokens (mirrors app/globals.css)
const PAPER = "#f5f1e8";
const INK = "#0a0a0a";
const ACCENT = "#ff5b1f";

// Build the K as a single SVG path so the strokes stay sharp at every
// size. Path is authored on a 16x16 grid in user units.
function svgFor(size) {
  // Stem: 4u wide vertical bar on the left.
  // Two diagonal legs that meet at a 2u x 4u waist joint on the stem.
  // Coordinates chosen so the legs have 2u of thickness and the joint
  // sits centered vertically (y=6..10).
  const kPath = `
    M 3 2 H 7 V 7
    L 11 2 H 14
    L 9 8
    L 14 14 H 11
    L 7 9 V 14 H 3 Z
  `.trim();

  // Top-right orange wedge; bleeds off the corner on purpose.
  const accent = "<polygon points='11,0 16,0 16,5' fill='" + ACCENT + "'/>";

  // 1u ink frame, inset by 0.5u so the stroke sits on a pixel.
  const frame =
    "<rect x='0.5' y='0.5' width='15' height='15' fill='none' stroke='" +
    INK + "' stroke-width='1' shape-rendering='crispEdges'/>";

  return (
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' " +
    "width='" + size + "' height='" + size + "' shape-rendering='crispEdges'>" +
      "<rect width='16' height='16' fill='" + PAPER + "'/>" +
      accent +
      // Fill the K with ink, even-odd to hollow out the negative space
      // between the stem and the legs (gives the K its characteristic
      // two-triangle negative space).
      "<path d='" + kPath + "' fill='" + INK + "' fill-rule='evenodd'/>" +
      frame +
    "</svg>"
  );
}

// (No app/favicon.ico — sharp 0.34 has no ICO encoder and the
//  hand-rolled one Next.js' strict image decoder rejected. Modern
//  browsers and the meta-image spec all use app/icon.png for the
//  app icon, so we rely on that and a 32x32 PNG shareable copy.)

async function main() {
  const sizes = [32, 64, 128, 180, 256];
  const bySize = {};
  for (const s of sizes) {
    bySize[s] = await sharp(Buffer.from(svgFor(s)))
      .png()
      .toBuffer();
  }

  // app/icon.png — 180x180, picked up by Next.js as the app icon
  // (used for browser tab, Apple touch icon, Android home screen).
  await writeFile(resolve(root, "app/icon.png"), bySize[180]);
  console.log("wrote app/icon.png (180)");

  // public/favicon-32.png — 32x32 shareable copy.
  await writeFile(resolve(root, "public/favicon-32.png"), bySize[32]);
  console.log("wrote public/favicon-32.png (32)");

  // public/favicon.png — 64x64, modern fallback.
  await writeFile(resolve(root, "public/favicon.png"), bySize[64]);
  console.log("wrote public/favicon.png (64)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
